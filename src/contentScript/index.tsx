import browser from 'webextension-polyfill'

import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import ReactDOM from "react-dom";

import { PopupCard } from "../PopupCard"
import { Tooltip } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { StyleSheetManager } from 'styled-components';


import { useUserInfoContext } from '../lib/userInfo'

import { fetchcurrentLanguage } from '../lib/lang';
import { CurrentLanguageContext } from '../lib/locale'
import { useCurrentLanguage } from '../lib/locale'

import { UserInfoContext } from '../lib/userInfo'
import { LetterCaseLowercaseIcon } from '@radix-ui/react-icons';

// import { Button, message } from 'antd';
import {
  CustomerServiceOutlined
} from '@ant-design/icons';

import { getUserInfo, playTextToSpeech } from '../util'
import { userInfoType } from '../types'

import { languageCodes } from "../lib/lang"

import { cardStyle } from '../util'

import { popupCardStyle } from '../PopupCard/style'

import LOGO from '../assets/icon128.png'

import styled, { css } from 'styled-components';

// import './assets/tailwind.css';


// 页面载入后会注入次脚本，或 background 可能会在一些情况下注入此脚本
// console.log('before browser.runtime.onMessage.addListener');

declare var InstallTrigger: any;
const isFirefox = typeof InstallTrigger !== 'undefined';


// 记录当前窗口是否 Pin 住
let isPin = false
// 设置当前窗口是否允许关闭
let donotClosePopupCard = false

// 初始化主容器，主容器用来挂在全局样式，包括第三方组件的样式
let MyBox: HTMLElement | null = document.getElementById('__jiang-scouter');
// console.log(MyBox);

// container 承载 UI 组件
let container = document.createElement('div')
container.className = 'container'
// 使用 shadow 来隔离样式
let shadowRoot: any = undefined

if (MyBox === null || MyBox === undefined) {
  // 如果不存在容器
  // 创建主容器
  MyBox = document.createElement('div')
  MyBox.id = '__jiang-scouter'
  document.getElementsByTagName('html')[0].appendChild(MyBox);
  MyBox.style.display = 'none' //默认隐藏

  shadowRoot = MyBox?.attachShadow({ mode: 'open' });

  shadowRoot?.appendChild(container)

  // Ant 组件样式
  // const antStylesheet = document.createElement('link');
  // antStylesheet.rel = 'stylesheet';
  // antStylesheet.href = 'https://cdn.bootcdn.net/ajax/libs/antd/4.17.1/antd.min.css';
  // shadowRoot.appendChild(antStylesheet);


  // Tailwind
  const tailwindStylesheet = document.createElement('link');
  tailwindStylesheet.rel = 'stylesheet';
  tailwindStylesheet.href = 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css';
  shadowRoot.appendChild(tailwindStylesheet);


  // 在 Shadow DOM 中添加样式：
  const style = document.createElement('style');
  style.textContent = popupCardStyle
  shadowRoot?.appendChild(style);

}


let USER_INFO: userInfoType = { userId: 'unknow', verified: false }
let ANKI_INFO: any

const thisGetUserInfo = async () => {
  // 获取用户信息
  USER_INFO = await getUserInfo()

  // 获取 Anki 牌组信息
  browser.runtime.sendMessage({ 'type': 'setModel', 'messages': {}, }).then((result) => {

    ANKI_INFO = result.data

    // 更新 Anki style
    try {


      for (let i = 0; i < ANKI_INFO.length; i++) {

        const p = {
          "model": {
            "name": ANKI_INFO[i]['modelName'],
            "css": cardStyle
          }
        }

        // 获取 Anki 牌组信息
        browser.runtime.sendMessage({ 'type': 'ankiAction', 'messages': { 'anki_action_type': 'updateModelStyling', 'anki_arguments': p }, }).then((result) => {

          // console.log(result);

        })

      }


    } catch (error) {

    }

  })

}

thisGetUserInfo()

let port = browser.runtime.connect({
  name: 'fromContentScript'
})

// 接收 background 消息（目前是通过浏览器的右键菜单触发）
browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  // console.log('content script onMessage:');
  // console.log(msg);
  if (msg.type === 'open-scouter') {


    // 处理窗口

    if (MyBox !== null && MyBox !== undefined) {
      // 如果已存在容器

      if (MyBox.shadowRoot?.querySelector('.container') === null) {
        // 如果不存在 PopupCard
        container = document.createElement('div')
        container.className = 'container'
        shadowRoot?.appendChild(container)
      }

      // 停止旧的对话
      try {
        port.postMessage({ 'type': 'StopTheConversation', 'messages': '' })
      } catch (error) {
        // 重新链接
        port = browser.runtime.connect({
          name: 'fromContentScript'
        })
        port.postMessage({ 'type': 'StopTheConversation', 'messages': '' })
      }



      MyBox.style.display = 'block'

      // 移除旧内容，避免 2 次渲染混杂在一起
      // container.parentNode?.removeChild(container);

    } else {
      // console.log('不存在 Box 容器');
      container = document.createElement('div')
      container.className = 'container'
      shadowRoot?.appendChild(container)
    }

    // const selection = window.getSelection();

    const selection = getSelection()

    // 显示窗口
    if (selection && selection.keyWord !== '') {
      showPopupCard({ 'keyWord': selection?.keyWord, 'Sentence': selection.sentence }, window.getSelection(), container, shadowRoot, isPin, msg.runPrompt)
    }

    document.addEventListener('selectionchange', handleSelectionchange);
    document.addEventListener('mouseup', handleMouseup);

    // 监听页面点击事件
    document.onmousedown = function (event) {

      if (MyBox !== undefined && MyBox !== null && !isPin && !donotClosePopupCard) {
        // 如果点击的不是插件窗口及其子元素，则关闭窗口
        if (MyBox !== event.target && !MyBox.contains(event.target as Node)) {

          // 隐藏窗口
          container.parentNode?.removeChild(container);

          document.removeEventListener('selectionchange', handleSelectionchange);
          document.removeEventListener('mouseup', handleMouseup);

          port.postMessage({ 'type': 'StopTheConversation', 'messages': '' })

        }
      }
    }

    container.onmousedown = (event) => {
      // 隐藏 setAnkiSpaceButton
      const contextBox = container.getElementsByClassName('contextBox2')[0]

      if (contextBox) {
        // 点击的不是 setAnkiSpaceButton 时才隐藏
        if (contextBox !== event.target && !contextBox.contains(event.target as Node)) {
          contextBox.parentNode?.removeChild(contextBox)
        }

      }

    }


  }

});

// 显示应用窗口
async function showPopupCard(data: { keyWord: string, Sentence: string }, msg: any, MyBox: any, shadowRoot: any, isPin: boolean, runPrompt: boolean) {

  let lang = await fetchcurrentLanguage()

  ReactDOM.render(

    <React.StrictMode>

      <CurrentLanguageContext.Provider value={lang}>
        <UserInfoContext.Provider value={{ user: USER_INFO, anki: ANKI_INFO }}>
          <StyleProvider container={shadowRoot}>
            <StyleSheetManager target={shadowRoot}>
              <PopupCard data={data} selection={msg} runPrompt={runPrompt} isPin={isPin} />
            </StyleSheetManager>
          </StyleProvider>
        </UserInfoContext.Provider>
      </CurrentLanguageContext.Provider>

      {/* <PopupCardContext data={data} selection={msg} runPrompt={runPrompt} /> */}

    </React.StrictMode >,

    MyBox
  );

}

// interface PopupCardContextProps {
//   data: any;
//   selection: any;
//   runPrompt: boolean;
// }

// function PopupCardContext(props: PopupCardContextProps) {

//   const [userInfo, setUserInfo] = useState<userInfoType | null>(null);
//   const [lang, setLang] = useState<any>(null);


//   useEffect(() => {
//     async function fetchUserInfo() {
//       const info = await getUserInfo();
//       const lang = await fetchcurrentLanguage()
//       setLang(lang)
//       setUserInfo(info);

//     }

//     fetchUserInfo();
//   }, []);  // 跑一次，不依赖任何外部变量


//   return (
//     <CurrentLanguageContext.Provider value={lang}>
//       <UserInfoContext.Provider value={USER_INFO}>
//         <StyleProvider container={shadowRoot}>
//           <StyleSheetManager target={shadowRoot}>
//             <PopupCard data={props.data} selection={props.selection} runPrompt={props.runPrompt} isPin={isPin} />
//           </StyleSheetManager>
//         </StyleProvider>
//       </UserInfoContext.Provider>
//     </CurrentLanguageContext.Provider>
//   )

// }


export const pinPopupCard = (value: boolean) => {
  isPin = value
}

export const setDonotClosePopupCard = (value: boolean) => {
  donotClosePopupCard = value
}

let isTextSelected = false;

const handleSelectionchange = () => {

  // let selection = window.getSelection();
  // if (selection) {
  //   console.log('selection.toString():');
  //   console.log(selection.toString());

  //   isTextSelected = selection.toString().length > 0;
  // }
}

const handleMouseup = (event: any) => {

  // console.log('handleMouseup');
  // console.log(isTextSelected);
  // console.log(donotClosePopupCard);

  // 获取用户在宿主网页上选中的内容
  const selection = getSelection()

  if (selection) {
    isTextSelected = selection.selection.toString().length > 0;
  }


  if (isTextSelected && !donotClosePopupCard) {

    // console.log('isTextSelected && !donotClosePopupCard');


    if (MyBox !== event.target && !MyBox?.contains(event.target as Node)) {

      // 在 PopupCard 范围外触发

      isTextSelected = false;

      // 停止旧的对话
      port.postMessage({ 'type': 'StopTheConversation', 'messages': '' })

      // 显示窗口
      if (selection && selection?.keyWord.length > 0 && selection.selection.anchorNode?.nodeName === '#text') {
        showPopupCard({ 'keyWord': selection?.keyWord, 'Sentence': selection.sentence }, window.getSelection(), container, shadowRoot, isPin, true)
      }

    } else {

      // 在 PopupCard 范围内触发

      let selectedText

      // 显示完形填空操作按钮

      if (isFirefox) {
        selectedText = window.getSelection()
      } else {
        selectedText = shadowRoot.getSelection()
      }

      const selectedTextString = selectedText.toString()
      const sentence = ''

      const PopupCardContainer = container.getElementsByClassName('container')[0]
      const messagesBox = container.getElementsByClassName('messages')[0]

      // console.log(selectedText);
      // console.log(messagesBox?.contains(selectedText.baseNode.parentNode as Node));

      let isInMessages = false
      if (selectedText.baseNode) {
        if (messagesBox === selectedText.baseNode.parentNode || messagesBox?.contains(selectedText.baseNode.parentNode as Node)) {
          //在 messages 容器内操作，则显示操作按钮
          isInMessages = true
        }
      }



      if (PopupCardContainer && selectedText.type === 'Range' && !container.querySelector('.contextBox2')) {

        let contextBox2 = document.createElement('div');
        contextBox2.className = 'contextBox2'
        contextBox2.style.position = 'relative'

        PopupCardContainer.appendChild(contextBox2)

        let range = selectedText.getRangeAt(0);

        ReactDOM.render(
          <UserInfoContext.Provider value={{ user: USER_INFO, anki: ANKI_INFO }}>
            <StyleSheetManager target={shadowRoot}>
              <ToolBar selectedText={selectedText.getRangeAt(0).getBoundingClientRect()} selectedTextString={selectedTextString} range={range} />
            </StyleSheetManager></UserInfoContext.Provider >, contextBox2);


      }



      // 


    }

  }
}

const getSelection = (isInShadow?: boolean) => {
  let selection;

  if (isInShadow) {
    selection = shadowRoot.getSelection();
  } else {
    selection = window.getSelection();
  }

  if (selection !== null && selection.rangeCount > 0) {
    // 当前选中的文字
    let keyWord = selection.toString().trim();

    let sentence = ''
    let parentNode = selection.focusNode.parentNode;

    // 如果选中的是一个更小的元素（如<em>），我们需要向上寻找
    while (!isBlockLevel(parentNode.tagName.toLowerCase()) && parentNode.tagName.toLowerCase() !== 'body') {
      parentNode = parentNode.parentNode;
    }

    let sentences = splitIntoSentences(parentNode);


    // // 获取选中范围对象
    // let range = selection.getRangeAt(0);
    // let expandedRange = range.cloneRange(); // 复制当前选中的范围对象
    // // expandRange的范围前后各移动3个字符（如果可以的话）
    // expandedRange.setStart(range.startContainer, Math.max(range.startOffset - 0, 0));
    // expandedRange.setEnd(range.endContainer, Math.min(range.endOffset + 4, range.endContainer.textContent.length - 1));
    // // 获取包括关键词前后字符的字符串
    // let expandedSelectedText = expandedRange.toString();


    let range = selection.getRangeAt(0);
    let startOffsetShift = 3;
    let endOffsetShift = 3;

    if (range.startOffset >= 1) {
      const charBefore = range.startContainer.textContent[range.startOffset - 1];
      startOffsetShift = /[。.！!]/.test(charBefore) ? 0 : 3;
    }

    if (range.endOffset < range.endContainer.textContent.length) {
      const charAfter = range.endContainer.textContent[range.endOffset];
      endOffsetShift = /[。.！!]/.test(charAfter) ? 0 : 3;
    }

    let expandedRange = range.cloneRange(); // 复制当前选中的范围对象
    // expandRange的范围前后各移动3个字符（如果可以的话）
    expandedRange.setStart(range.startContainer, Math.max(range.startOffset - startOffsetShift, 0));
    expandedRange.setEnd(range.endContainer, Math.min(range.endOffset + endOffsetShift, range.endContainer.textContent.length - 1));
    // 获取包括关键词前后字符的字符串
    let expandedSelectedText = expandedRange.toString();




    // console.log('expandedSelectedText:');
    // console.log(expandedSelectedText);

    for (let s of sentences) {
      if (s.includes(expandedSelectedText)) {
        sentence = s
        break;
      }
    }

    if (sentence === '') {
      sentence = selection.anchorNode.data
    }

    // console.log({ 'selection': selection, 'keyWord': keyWord, 'sentence': sentence });
    return { 'selection': selection, 'keyWord': keyWord, 'sentence': sentence }

  } else {

    return null

  }

  // 拆分文本为句子的函数
  function splitIntoSentences(node: HTMLElement) {
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = node.innerHTML;
    let plainText = tempDiv.innerText;

    // 对英文和日语的处理
    let sentences = plainText.split(/[。.！!]/);

    // 删除空句子
    sentences = sentences.filter((sentence) => sentence.trim() !== "");

    return sentences;
  }

  function isBlockLevel(tagName: string) {
    const blockLevelElements = [
      'address', 'article', 'aside', 'blockquote', 'canvas', 'dd', 'div', 'dl',
      'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2',
      'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'li', 'main', 'nav', 'noscript',
      'ol', 'output', 'p', 'pre', 'section', 'table', 'thead', 'tr', 'ul'
    ];

    return blockLevelElements.includes(tagName.toLowerCase());
  }



}


const setAnkiSpace = (range: Range, selectedText: string, event: Event, isAddNew: boolean) => {


  let span = document.createElement('span');
  const ankiSpace = container.getElementsByClassName('ankiSpace')

  // 获取当前最大的 index
  let maxIndex = 0
  for (let i = 0; i < ankiSpace.length; i++) {
    const thisIndex = Number(ankiSpace[i].getAttribute('data-index'))
    if (thisIndex > maxIndex) {
      maxIndex = thisIndex
    }
  }

  let number = maxIndex === 0 ? 1 : maxIndex

  if (isAddNew) {
    number = maxIndex + 1
  }

  span.textContent = '{{c' + number + '::' + selectedText + '}}';
  span.className = 'ankiSpace'
  span.setAttribute('data-index', number.toString())

  span.onclick = function () {

    // 恢复为默认样式
    // span.innerText
    if (span.textContent) {

      // let oldText = span.textContent
      // oldText = oldText.replace('{{c1::', '')
      // oldText = oldText.replace('}}', '')

      var textNode = document.createTextNode(selectedText);
      span.parentNode?.replaceChild(textNode, span);
    }

  };

  range?.deleteContents();
  range?.insertNode(span);

}

interface ToolBarProps {
  selectedText: any;
  range: any;
  selectedTextString: string;
}


const StyledButton = styled.button<{ $disable?: boolean }>`
    
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: default;
    padding: 2px;
    

    &:hover {
      background-color: rgba(0,0,59,0.051);
      border-radius: 2px;
    }

    ${props => props.$disable && css`
      opacity: 0.5;
      cursor: help;
    `}

    // ${props => !props.$disable && css`
    //   cursor: default;
    // `}


`;

const IconButton = styled.button`
    
    width: 16px;
    height: 16px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: default;

    &:hover {
      opacity: 0.8;
    }
`;

function ToolBar(props: ToolBarProps) {

  const [showMenu, setShowMenu] = useState(true)
  const ContextBox = useRef<HTMLDivElement>(null);

  const userInfo: { user: userInfoType, anki: any } | null = useUserInfoContext()

  // let portFromMenu: any

  useEffect(() => {

    const contextBox = ContextBox.current
    const popupCard = container.querySelector('#LearningEnglish2023')
    const PopupCardContainer = container.getElementsByClassName('container')[0]
    const messagesBox = container.querySelector('.messages')

    //设置按钮的位置
    const selectedTextX = props.selectedText.x
    const selectedTextY = props.selectedText.y

    const selectedTextWidth = props.selectedText.width
    const selectedTextHeight = props.selectedText.height

    const buttonX = contextBox?.getBoundingClientRect().x || 0
    const buttonY = contextBox?.getBoundingClientRect().y || 0


    // 最大 X 值
    const maxX = (popupCard?.getBoundingClientRect().width || 0) - contextBox!.getBoundingClientRect().width - 20

    const messageBoxHeight = messagesBox?.getBoundingClientRect().height!
    const containerBoxHeight = PopupCardContainer?.getBoundingClientRect().height!
    const height = messageBoxHeight > containerBoxHeight ? messageBoxHeight + 60 : containerBoxHeight

    const minY = 0 - height

    let left = selectedTextX - buttonX + selectedTextWidth - 60
    // left = left > maxX ? maxX : left
    left = Math.max(10, Math.min(maxX, left));

    let top = selectedTextY - buttonY - 40
    // top = top < minY ? minY : top
    top = Math.max(minY, Math.min(60, top));



    // contextBox2!.style.position = 'relative'
    // contextBox!.style.position = 'absolute'

    contextBox!.style.left = left.toString() + 'px'
    contextBox!.style.top = top.toString() + 'px'

    setShowMenu(true)

  }, [])


  const handleSetAnkiSpaceButtonClick = (event: any, isAddNew: boolean) => {
    setAnkiSpace(props.range, props.selectedTextString, event, isAddNew)


    // ContextBox.current!.parentNode?.removeChild(ContextBox.current!)
    setShowMenu(false)
  }

  const handleFollowUpMenuClick = (event: any) => {

    const PopupCardContainer = container.getElementsByClassName('container')[0]
    const messagesBox = container.querySelector('.messages')

    const sentence = getSelection(true)

    const selectedTextX = props.selectedText.x
    const selectedTextY = props.selectedText.y

    const selectedTextWidth = props.selectedText.width
    const selectedTextHeight = props.selectedText.height

    const followUpMenuBoxX = messagesBox?.getBoundingClientRect().x || 0
    const followUpMenuBoxY = (messagesBox?.getBoundingClientRect().y || 0) + (messagesBox?.getBoundingClientRect().height || 0)
    const followUpMenuBoxWidth = 140
    // const followUpMenuBoxHeight = followUpMenuBox?.getBoundingClientRect().height || 0

    const maxX = (PopupCardContainer?.getBoundingClientRect().width || 0) - followUpMenuBoxWidth - 10
    // console.log(maxX);
    // console.log((messagesBox?.getBoundingClientRect().height || 0));
    // console.log(messagesBox?.getBoundingClientRect());
    // console.log(container.getElementsByClassName('followUpMenu')[0].getBoundingClientRect())
    const maxY = ((PopupCardContainer?.getBoundingClientRect().y || 0) + (PopupCardContainer?.getBoundingClientRect().height || 0)) - ((messagesBox?.getBoundingClientRect().y || 0) + (messagesBox?.getBoundingClientRect().height || 0)) - 230

    const messageBoxHeight = messagesBox?.getBoundingClientRect().height!
    const containerBoxHeight = PopupCardContainer?.getBoundingClientRect().height!
    const height = messageBoxHeight > containerBoxHeight ? messageBoxHeight + 180 : containerBoxHeight

    const minY = 0 - height + 130

    let left = (selectedTextX - followUpMenuBoxX + selectedTextWidth - 40)
    let top = (selectedTextY - followUpMenuBoxY - selectedTextHeight)



    // X 坐标的最大最小值
    left = Math.max(10, Math.min(maxX, left));

    // Y 坐标的最大值
    top = Math.max(minY, Math.min(maxY, top));

    setShowMenu(false)

    // 取消文字选中，避免意外弹出菜单栏
    window.getSelection()?.removeAllRanges();


    try {

      browser.runtime.sendMessage({
        type: 'UPDATE_POPUP_CARD', payload: {
          style: {
            left: left,
            top: top,
          }, followUpData: { keyWord: props.selectedTextString, sentence: sentence?.sentence }
        }
      });

    } catch (error) {

      // console.log(error);

    }





  }

  return (
    <>

      {showMenu && <div ref={ContextBox}
        className='contextBox' style={{
          position: 'absolute'
        }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          marginRight: "8px",
          borderRight: "1px solid rgba(5, 5, 5, .12)",
          paddingRight: "18px"
        }}>

          <Tooltip placement="bottom"
            title={'Cloze deletion(same card)'}
            arrow={false}
          >
            <StyledButton style={{ marginRight: '10px' }} onClick={() => handleSetAnkiSpaceButtonClick(event, false)}>
              [...]
            </StyledButton>
          </Tooltip>

          <Tooltip placement="bottom"
            title={'Cloze deletion(new card)'}
            arrow={false}
          >
            <StyledButton onClick={() => handleSetAnkiSpaceButtonClick(event, true)}>
              [...]+
            </StyledButton>
          </Tooltip>

        </div>

        <div>

          <Tooltip placement="bottom"
            title={'Pronunciation(⚡Pro)'}
            arrow={false}
          >
            <StyledButton $disable={userInfo?.user.verified ? false : true} style={{
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '10px'
            }}

              onClick={async () => {

                let lang = await fetchcurrentLanguage()
                if (userInfo?.user.verified) {
                  if (lang) {

                    const targetLanguage = lang['target']['id']
                    playTextToSpeech(props.selectedTextString, languageCodes[targetLanguage as keyof typeof languageCodes], targetLanguage)
                    setShowMenu(false)

                  }
                } else {
                  // alert(' You are not Pro')
                }



              }}
            >
              <CustomerServiceOutlined />
            </StyledButton>
          </Tooltip>

        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Tooltip placement="bottom"
            title={'Invoke Prompt(⚡Pro)'}
            arrow={false}
          >
            <IconButton
              className='lookUpButton' style={{
                backgroundImage: `url(${LOGO})`,
              }}
              onClick={handleFollowUpMenuClick}
            ></IconButton>
          </Tooltip>
        </div>
      </div >
      }
    </>

  )
}


