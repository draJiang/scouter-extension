import browser from 'webextension-polyfill'

import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import ReactDOM from "react-dom";

import { PopupCard } from "./PopupCard"
import { StyleProvider } from '@ant-design/cssinjs';
import { StyleSheetManager } from 'styled-components';

import { dictionaryPrompt } from './PopupCard/util'

import { fetchcurrentLanguage } from '../lib/lang';
import { CurrentLanguageContext } from '../lib/locale'


import { UserInfoContext } from '../lib/userInfo'
import { ToolBar } from './ToolBar';

// import { Button, message } from 'antd';

import { userInfoType, AnkiInfoType } from '../types'


import { thisGetUserInfo, setAnkiInfo } from './util'

import { popupCardStyle } from './PopupCard/style'
import { ShortcutButton } from './ShortcutButton'
import { YouTubeButton } from './youtube/YouTubeButton'

// import './assets/tailwind.css';

// 页面载入后会注入次脚本，或 background 可能会在一些情况下注入此脚本
// console.log('before browser.runtime.onMessage.addListener');

declare var InstallTrigger: any;
const isFirefox = typeof InstallTrigger !== 'undefined';

// 容器类目
export const CONTAINER_CLASSNAME = 'container'
const SHORTCUT_BUTTON_CLASSNAME = 'ShortcutButtonContainer'

// 记录当前窗口是否 Pin 住
let isPin = false
// 设置当前窗口是否允许关闭
let donotClosePopupCard = false

// 初始化主容器，主容器用来挂在全局样式，包括第三方组件的样式
let MyBox: HTMLElement | null = document.getElementById('__jiang-scouter');
// console.log(MyBox);

// container 承载主窗口的 UI 组件
let container = document.createElement('div')
container.className = CONTAINER_CLASSNAME
// 使用 shadow 来隔离样式
let shadowRoot: any = undefined

if (MyBox === null || MyBox === undefined) {
  // 如果不存在容器
  // 创建主容器
  MyBox = document.createElement('div')
  MyBox.id = '__jiang-scouter'
  document.getElementsByTagName('html')[0].appendChild(MyBox);
  // MyBox.style.display = 'none' //默认隐藏
  MyBox.style.display = 'block'

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

// 与 background 链接
let port = browser.runtime.connect({
  name: 'fromContentScript'
})

// 用户付费状态等信息、用户的 Anki 信息
let USER_INFO: userInfoType = { userId: 'unknow', verified: false, contextMenu: false, showYoutubeButton: true }
let ANKI_INFO: AnkiInfoType = { defaultDeckName: '', decks: [], models: [] }
let executedPromptHistoryInToolBar = [dictionaryPrompt]
let showYoutubeButton = true

export const openScouter = (msg?: any, isYoutube?: boolean, youtubeData?: { keyWord: string, sencence: string, image: string }) => {
  // 处理窗口
  if (msg === undefined) {
    msg = {
      runPrompt: false
    }
  }


  if (MyBox !== null && MyBox !== undefined) {
    // 如果已存在容器

    if (MyBox.shadowRoot?.querySelector('.' + CONTAINER_CLASSNAME) === null) {
      // 如果不存在 PopupCard
      container = document.createElement('div')
      container.className = CONTAINER_CLASSNAME
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



    // MyBox.style.display = 'block'

    // 移除旧内容，避免 2 次渲染混杂在一起
    // container.parentNode?.removeChild(container);

  } else {
    // console.log('不存在 Box 容器');
    container = document.createElement('div')
    container.className = CONTAINER_CLASSNAME
    shadowRoot?.appendChild(container)
  }

  // const selection = window.getSelection();

  const selection = getSelection()

  // 显示窗口
  if (isYoutube && youtubeData) {
    showPopupCard(
      { 'keyWord': youtubeData.keyWord, 'Sentence': youtubeData.sencence },
      window.getSelection(), container, shadowRoot,
      {
        isPin: isPin,
        runPrompt: msg.runPrompt,
        isYoutube: isYoutube,
        youtubeData
      },

    )
  } else {

    if (selection && selection.keyWord !== '') {
      showPopupCard({
        'keyWord': selection?.keyWord,
        'Sentence': selection.sentence
      },
        window.getSelection(),
        container,
        shadowRoot,
        {
          isPin: isPin,
          runPrompt: msg.runPrompt,
          isYoutube: false
        }
      )
    }

  }



}

// 显示应用窗口
async function showPopupCard(
  data: { keyWord: string, Sentence: string },
  selection: any,
  MyBox: any,
  shadowRoot: any,
  options: {
    isPin: boolean,
    runPrompt: boolean,
    isYoutube: boolean,
    youtubeData?: { keyWord: string, sencence: string, image: string }
  }

) {

  let lang = await fetchcurrentLanguage()
  let thisOptions = options
  if (options === undefined) {
    thisOptions = {
      isPin: false,
      runPrompt: true,
      isYoutube: false,
    }
  }

  ReactDOM.render(

    <React.StrictMode>

      <CurrentLanguageContext.Provider value={lang}>
        <UserInfoContext.Provider value={{ user: USER_INFO, anki: ANKI_INFO }}>
          <StyleProvider container={shadowRoot}>
            <StyleSheetManager target={shadowRoot}>
              <PopupCard
                data={data}
                selection={selection}
                options={thisOptions}
              />
            </StyleSheetManager>
          </StyleProvider>
        </UserInfoContext.Provider>
      </CurrentLanguageContext.Provider>

      {/* <PopupCardContext data={data} selection={msg} runPrompt={runPrompt} /> */}

    </React.StrictMode >,

    MyBox
  );

}


export const pinPopupCard = (value: boolean) => {
  isPin = value
}

export const setDonotClosePopupCard = (value: boolean) => {
  donotClosePopupCard = value
}

let isTextSelected = false;
let lastSelection = {
  anchorNode: null,
  anchorOffset: 0,
  focusNode: null,
  focusOffset: 0,
};

const checkIsClickedInsideShortcutButton = (event: any): boolean => {
  const path = event.composedPath();
  const isClickedInsideShortcutButton = path.some((element: EventTarget & Element) => {
    return element.classList && (element.classList.contains('ShortcutButton') || element.id === '__ScouterYouTubeButtonContainer');
  });

  return isClickedInsideShortcutButton
}

const handleMouseup = async (event: any) => {

  // 是否在窗口中触发
  const isInShadow = MyBox === event.target || MyBox?.contains(event.target as Node)
  // 是否在快捷按钮上触发
  const path = event.composedPath();
  const isClickedInsideShortcutButton = checkIsClickedInsideShortcutButton(event)

  // 获取用户在宿主网页上选中的内容
  const selection = getSelection(isInShadow)

  const range = selection?.selection.getRangeAt(0);

  lastSelection = {
    // 保存各个属性的引用和值
    anchorNode: selection?.selection.anchorNode,
    anchorOffset: selection?.selection.anchorOffset,
    focusNode: selection?.selection.focusNode,
    focusOffset: selection?.selection.focusOffset,
  };

  if (selection) {
    isTextSelected = selection.selection.toString().length > 0;
  }

  // 有选中文字且未开启 Prompt 设置界面（如果开启 Prompt 设置界面而仍然执行查询任务时，会导致不必要的任务执行）
  if (isTextSelected && !donotClosePopupCard) {

    if (!isInShadow || isClickedInsideShortcutButton) {
      // 在 PopupCard 范围外触发

      // isTextSelected = false;

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


      // 显示窗口/更新窗口信息
      if (selection && selection?.keyWord.length > 0 && isPin && selection.selection.anchorNode?.nodeName === '#text') {
        showPopupCard(
          {
            'keyWord': selection?.keyWord,
            'Sentence': selection.sentence
          },
          window.getSelection(),
          container,
          shadowRoot,
          {
            isPin: isPin,
            runPrompt: true,
            isYoutube: false
          }

        )
      }

    } else {

      // 在 PopupCard 范围内触发

      if (selection) {

        // 显示完形填空操作按钮
        const selectedTextString = selection.keyWord.toString()
        // const sentence = ''

        const PopupCardContainer = container.getElementsByClassName(CONTAINER_CLASSNAME)[0]



        if (PopupCardContainer && selection?.selection.type === 'Range' && !container.querySelector('.contextBox2')) {

          let contextBox2 = document.createElement('div');
          contextBox2.className = 'contextBox2'
          contextBox2.style.position = 'relative'

          PopupCardContainer.appendChild(contextBox2)

          let range = selection?.selection.getRangeAt(0);
          // console.log(selection);
          let lang = await fetchcurrentLanguage()

          ReactDOM.render(
            <CurrentLanguageContext.Provider value={lang}>
              <UserInfoContext.Provider value={{ user: USER_INFO, anki: ANKI_INFO }}>
                <StyleSheetManager target={shadowRoot}>
                  <ToolBar
                    selectedText={selection?.selection.getRangeAt(0).getBoundingClientRect()}
                    selectedTextString={selectedTextString}
                    selectedSentence={selection?.sentence}
                    executedPromptHistoryInToolBar={executedPromptHistoryInToolBar}
                    range={range} />
                </StyleSheetManager></UserInfoContext.Provider>
            </CurrentLanguageContext.Provider>, contextBox2);
        }

      }



      // 


    }

  }

  if (!isTextSelected || !selection) {

    // 没有选中任何文字
    // 移除快捷按钮
    setTimeout(() => {
      const ShortcutButtonContainer = shadowRoot.querySelector('.' + SHORTCUT_BUTTON_CLASSNAME);
      if (ShortcutButtonContainer) {
        ShortcutButtonContainer.parentNode?.removeChild(ShortcutButtonContainer);
      }

    }, 10);


  } else {
    // 有选中文字

    // 显示快捷按钮
    if (MyBox?.shadowRoot?.querySelector('.' + SHORTCUT_BUTTON_CLASSNAME) === null && USER_INFO.contextMenu && !isInShadow && !isPin) {
      // 记录最近选中的文字



      // 如果不存在按钮
      let ShortcutButtonContainer = document.createElement('div')
      ShortcutButtonContainer.className = SHORTCUT_BUTTON_CLASSNAME
      shadowRoot?.appendChild(ShortcutButtonContainer)

      ReactDOM.render(

        <React.StrictMode>
          <StyleSheetManager target={shadowRoot}>
            <ShortcutButton
              position={{
                x: event.pageX + 10,
                y: event.pageY + 10
              }}
              handleShortcutButtonClick={(runPrompt: boolean) => {

                // event.stopPropagation(); // 阻止事件冒泡
                if (selection) {

                  if (MyBox?.shadowRoot?.querySelector('.' + CONTAINER_CLASSNAME) === null) {
                    // 如果不存在 PopupCard
                    container = document.createElement('div')
                    container.className = CONTAINER_CLASSNAME
                    shadowRoot?.appendChild(container)
                  }

                  // const newSelection = window.getSelection();
                  const selection = getSelection(isInShadow)
                  const newSelection = selection?.selection

                  // 重新选中划词区域
                  if (lastSelection) {

                    // console.log('===============');

                    // 创建一个范围对象
                    const newRange = document.createRange();
                    const anchorNode = lastSelection.anchorNode;
                    const focusNode = lastSelection.focusNode;

                    // console.log(lastSelection)

                    if (anchorNode && focusNode) {
                      // 使用保存的 selected Range 恢复
                      newRange.setStart(anchorNode, lastSelection?.anchorOffset);
                      newRange.setEnd(focusNode, lastSelection?.focusOffset);
                      // 获取 Selection 对象

                      // 移除所有现有的选择
                      newSelection!.removeAllRanges();
                      // 添加新的选区
                      newSelection!.addRange(range);
                    }

                  }

                  // 移除快捷按钮
                  const ShortcutButtonContainer = shadowRoot.querySelector('.' + SHORTCUT_BUTTON_CLASSNAME);
                  if (ShortcutButtonContainer) {
                    ShortcutButtonContainer.parentNode?.removeChild(ShortcutButtonContainer);
                  }

                  // 显示窗口
                  showPopupCard({ 'keyWord': selection?.keyWord, 'Sentence': selection!.sentence }, newSelection, container, shadowRoot,
                    {
                      isPin: isPin,
                      runPrompt: runPrompt,
                      isYoutube: false
                    }
                  )

                }
              }} />
          </StyleSheetManager>
        </React.StrictMode >,
        ShortcutButtonContainer
      );

    }
  }

}

export const getSelection = (isInShadow?: boolean) => {
  let selection;

  if (isInShadow) {
    selection = shadowRoot.getSelection();
  } else {
    selection = window.getSelection();
  }

  if (selection !== null && selection.rangeCount > 0) {
    // 当前选中的文字
    let keyWord = selection.toString().trim();
    if (!keyWord) {
      return null
    }

    let sentence = ''
    let parentNode = selection.focusNode.parentNode;

    // 如果选中的是一个更小的元素（如<em>），我们需要向上寻找
    while (parentNode.tagName && (!isBlockLevel((parentNode.tagName || undefined).toLowerCase()) && (parentNode.tagName || undefined).toLowerCase() !== 'body')) {
      parentNode = parentNode.parentNode;
    }

    let sentences = splitIntoSentences(parentNode);

    let range = selection.getRangeAt(0);
    let startOffsetShift = 3;
    let endOffsetShift = 3;

    if (range.startOffset >= 1) {
      const charBefore = range.startContainer.textContent[range.startOffset - 1];
      startOffsetShift = /[。.！!?？]/.test(charBefore) ? 0 : 3;
    }

    if (range.endOffset < range.endContainer.textContent.length - 1) {
      const charAfter = range.endContainer.textContent[range.endOffset];
      endOffsetShift = /[。.！!?？]/.test(charAfter) ? 0 : 3;
    }

    if (range.endOffset === 0 || isInShadow) {
      endOffsetShift = 0
    }

    let expandedRange = range.cloneRange(); // 复制当前选中的范围对象
    // expandRange的范围前后各移动3个字符（如果可以的话）
    try {
      expandedRange.setStart(range.startContainer, Math.max(range.startOffset - startOffsetShift, 0));
      expandedRange.setEnd(range.endContainer, Math.min(range.endOffset + endOffsetShift, range.endContainer.textContent.length - 1));
    } catch (error) {
      console.log(error);
    }

    // 获取包括关键词前后字符的字符串
    let expandedSelectedText = expandedRange.toString();

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
    let sentences = plainText.split(/[。.！!?？]/);

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


const setYoutubeButton = () => {
  // 如果是 YouTube 则显示操作按钮
  const scouterYouTubeButtonContainer = document.querySelector('#__ScouterYouTubeButtonContainer');
  
  if (window.location.hostname === "www.youtube.com" && showYoutubeButton && !scouterYouTubeButtonContainer) {
    const ytpChromeControls: HTMLElement | null = document.querySelector('.ytp-chrome-controls');
    console.log(ytpChromeControls);

    if (ytpChromeControls) {

      const YouTubeButtonContainerDiv = document.createElement('div')
      YouTubeButtonContainerDiv.id = '__ScouterYouTubeButtonContainer'
      YouTubeButtonContainerDiv.style.display = 'flex'
      YouTubeButtonContainerDiv.style.alignItems = 'center'
      YouTubeButtonContainerDiv.style.width = '48px'

      ytpChromeControls.insertBefore(YouTubeButtonContainerDiv, ytpChromeControls.lastChild);
      const thisShadowRoot = YouTubeButtonContainerDiv?.attachShadow({ mode: 'open' });

      // console.log('USER_INFO:');
      // console.log(USER_INFO);


      ReactDOM.render(
        <React.StrictMode>
          <StyleSheetManager target={thisShadowRoot}>
            <YouTubeButton
              container={container}
              shadowRoot={shadowRoot}
              userInfo={USER_INFO}
            />
          </StyleSheetManager>
        </React.StrictMode >,
        thisShadowRoot
      );

      const style = document.createElement('style');
      style.textContent = `
  
            .scouterCaptionButton {
                opacity: 0.9;
            }
  
            .scouterCaptionButton:hover {
                opacity: 1;
            }
  
          `;
      thisShadowRoot.appendChild(style);

    }

  }
}

async function initialize() {

  // 获取用户信息
  const userInfo = await thisGetUserInfo();
  USER_INFO = userInfo?.userInfo
  executedPromptHistoryInToolBar = userInfo?.executedPromptHistoryInToolBar
  showYoutubeButton = userInfo?.showYoutubeButton

  // 接收 background 消息（目前是通过浏览器的右键菜单、快捷键触发）
  browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.type === 'open-scouter') {
      openScouter(msg)
    }

    if (msg.type === 'tabOnUpdated') {
      if (msg.data.locateInYouTube) { setYoutubeButton() }
    }
  });

  // 处理 Youtube 逻辑
  setYoutubeButton()

  // 获取 Anki 信息
  ANKI_INFO = await setAnkiInfo()


}




/////////////////////////////////////////////////////////////////////////////////////




// 初始化用户信息
initialize()

// 监听页面鼠标抬起事件
document.addEventListener('mouseup', handleMouseup);
// 监听页面鼠标按下事件
document.onmousedown = function (event) {
  const element = event.composedPath()[0]
  const isClickedInsideShortcutButton = checkIsClickedInsideShortcutButton(event)
  if (element instanceof HTMLElement && !isClickedInsideShortcutButton && MyBox !== undefined && MyBox !== null && !isPin && !donotClosePopupCard) {
    // 如果点击的不是快捷按钮、插件窗口及其子元素，则关闭窗口
    if (MyBox !== event.target && !MyBox.contains(event.target as Node)) {

      // 隐藏窗口
      // console.log('隐藏窗口')
      container.parentNode?.removeChild(container);
      // document.removeEventListener('selectionchange', handleSelectionchange);
      // document.removeEventListener('mouseup', handleMouseup);

      port.postMessage({ 'type': 'StopTheConversation', 'messages': '' })

    }
  }

  const contextBox = container.getElementsByClassName('contextBox2')[0]
  // 点击插件窗口且不是 ToolBar
  const isInShadow = MyBox === event.target || MyBox?.contains(event.target as Node)
  const isInToolBar = contextBox === event.composedPath()[0] || contextBox?.contains(event.composedPath()[0] as Node)
  if (isInShadow && !isInToolBar) {
    // 隐藏 ToolBar

    if (contextBox) {
      // 点击的不是 setAnkiSpaceButton 时才隐藏
      if (contextBox !== event.target && !contextBox.contains(event.target as Node)) {
        contextBox.parentNode?.removeChild(contextBox)
      }

    }
  }

}


