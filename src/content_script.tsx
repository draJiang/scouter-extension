import browser from 'webextension-polyfill'

import React, { useEffect, useState, createContext, useContext } from "react";
import ReactDOM from "react-dom";

import { PopupCard } from "./PopupCard"

import { StyleProvider } from '@ant-design/cssinjs';

import { fetchcurrentLanguage } from './lib/lang';
import { CurrentLanguageContext } from './lib/locale'
import { LetterCaseLowercaseIcon } from '@radix-ui/react-icons';

// import './assets/tailwind.css';


// 页面载入后会注入次脚本，或 background 可能会在一些情况下注入此脚本
// console.log('before browser.runtime.onMessage.addListener');

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
  style.textContent = `
  .slick-arrow::before{
    content:"" !important;
  }

  .ant-carousel .slick-prev,
  .ant-carousel .slick-next,
  .ant-carousel .slick-prev:hover,
  .ant-carousel .slick-next:hover {
    font-size: inherit;
    color: currentColor;
  }

  .ant-carousel .slick-prev,
  .ant-carousel .slick-prev:hover {
    left: 10px;
    z-index: 2;
    color: white;
  }

  .ant-carousel .slick-next,
  .ant-carousel .slick-next:hover {
    right: 10px;
    z-index: 2;
    color: white;
  }

  .images img {
    object-fit: cover;
    border-radius: 2px;
  }


  @font-face {
  font-family: 'OPPOSans-R';
  src: url('../public/font/OPPOSans-R.ttf') format('truetype');
  }

  #LearningEnglish2023 h1,#LearningEnglish2023 h2,#LearningEnglish2023 h3{
    font-weight: bold;
  }

  #LearningEnglish2023 h1{
    font-size:20px;
  }
  #LearningEnglish2023 h2{
    font-size:17px;
  }

  #LearningEnglish2023 {
  font-family: sans-serif;
  width: 390px;
  height: 560px;
  color: rgb(0 0 0 / 80%);
  position: fixed;
  display: flex;
  flex-direction: column;
  font-size: 13.2px;
  background-color: #fff;
  z-index: 9999;
  overflow: hidden;
  box-shadow: 0px 8px 28px rgba(0,0,0,.16);
  border-radius: 6px;
  border:1px solid rgba(5, 5, 5, .06)
  }

  #LearningEnglish2023 .container::-webkit-scrollbar  {
    width:0px;
  }

  #LearningEnglish2023 .container::-webkit-scrollbar-track  {
    background: #fff; /* 设置滚动条轨道背景色 */
  }

  // #LearningEnglish2023 .container::-webkit-scrollbar-thumb {
  //   background: #888; /* 设置滚动条滑块背景色 */
  // }

  #LearningEnglish2023 .DropdownMenuItem:hover {
    
    background-color:#F6F6F6;
  }

  #LearningEnglish2023 .DropdownMenuItem:focus-visible {
    outline: none;
  }

  #LearningEnglish2023 h1,#LearningEnglish2023 h2,#LearningEnglish2023 h3 {

    color: rgba(0, 0, 0);

  }

  #LearningEnglish2023 #ScouterNav,#LearningEnglish2023 .images,#LearningEnglish2023 #ScouterSelection, #LearningEnglish2023 .messages>div  {
    padding-left:18px;
    padding-right:18px;
  }

  #LearningEnglish2023 .openAIAnswer {
  line-height: 30px;
  }

  #LearningEnglish2023 .userInput {
  margin: 10px 0;
  }

  #LearningEnglish2023 .contentBox {
  overflow: scroll;
  }

  #LearningEnglish2023 .messages > * > * {
    margin: 0.7em 0;
  }

  #LearningEnglish2023 #ScouterNav {
  display: flex;
  justify-content: start;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(5, 5, 5, .06);
  user-select: none;
  }

  #LearningEnglish2023 #ScouterNav img {
  width: auto;
  height: 24px;
  margin-right: 6px;
  }

  .messages ul{
    list-style:disc;
    padding-left: 20px;
  }

  .messages ol{
    list-style:auto;
    padding-left: 20px;
  }
  
  #LearningEnglish2023 .isPin path{
    fill: #F08A24;
  }

  #LearningEnglish2023 .rightBtnBox button {

    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  #LearningEnglish2023 .rightBtnBox button span:last-of-type{
    
  }

  table tr {
    border: 1px solid #ddd;
    padding: 5px;
  }
  table th, table td {
    padding: 10px;
    text-align: left;
  }
  table th {
    // font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  // /* 滚动条以及滚动条轨道的宽度 */
  // ::-webkit-scrollbar {
  //     width: 10px;
  // }
  
  // /* 滚动条轨道的样式*/
  // ::-webkit-scrollbar-track {
      
  // }
  
  // /* 滚动条的样式 */
  // ::-webkit-scrollbar-thumb {
  //     background: #888; 
  // }
  
  // /* 当你鼠标悬停在滚动条上时的样式 */
  // ::-webkit-scrollbar-thumb:hover {
  //     background: #555; 
  // }

  /* 滚动条 */
::-webkit-scrollbar-thumb:horizontal { /*水平滚动条的样式*/
    width: 4px;
    background-color: #CCCCCC;
    -webkit-border-radius: 6px;
}
::-webkit-scrollbar-track-piece {
    background-color: #fff; /*滚动条的背景颜色*/
    -webkit-border-radius: 0; /*滚动条的圆角宽度*/
}
::-webkit-scrollbar {
    width: 10px; /*滚动条的宽度*/
    height: 8px; /*滚动条的高度*/
}
::-webkit-scrollbar-thumb:vertical { /*垂直滚动条的样式*/
    height: 50px;
    background-color: #999;
    -webkit-border-radius: 4px;
    outline: 2px solid #fff;
    outline-offset: -2px;
    border: 2px solid #fff;
}
::-webkit-scrollbar-thumb:hover { /*滚动条的hover样式*/
    height: 50px;
    background-color: #9f9f9f;
    -webkit-border-radius: 4px;
}

pre {
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 15px;
  border: 1px solid #ddd;
  color: #333;
  font-family: Courier, monospace;
  line-height: 1.2;
  overflow-x: auto;
  white-space: pre;
}

blockquote {
  padding: 10px 20px;
  margin: 0 0 20px;
  border-left: 5px solid #f1f1f1;
  color: #666;
  background-color: #f9f9f9;
}

  `
  shadowRoot?.appendChild(style);

}


let port = browser.runtime.connect({
  name: 'fromContentScript'
})

// 接收 background 消息（目前是通过浏览器的右键菜单触发）
browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  // console.log('content script onMessage:');
  // console.log(msg);
  if (msg.type === 'open-souter') {


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
    if (selection) {
      showPopupCard({ 'keyWord': selection?.keyWord, 'Sentence': selection.sentence }, window.getSelection(), container, shadowRoot, isPin, msg.runPrompt)
    }

    // if (selection !== null) {
    //   // 当前选中的文字
    //   let keyWord = selection.toString().trim()

    //   // 选中文字所在的段落
    //   let sentence = selection.anchorNode?.textContent ?? ''

    //   if (sentence === undefined) {
    //     sentence = ''
    //   } else {
    //     sentence = sentence.length <= keyWord.length ? (selection.anchorNode?.parentNode?.parentNode as HTMLElement)?.innerText ?? '' : sentence
    //   }

    //   // 显示窗口
    //   showPopupCard({ 'keyWord': keyWord, 'Sentence': sentence }, window.getSelection(), container, shadowRoot, isPin, msg.runPrompt)

    // }


    document.addEventListener('selectionchange', handleSelectionchange);
    document.addEventListener('mouseup', handleMouseup);

    // 监听页面点击事件
    document.onmousedown = function (event) {

      if (MyBox !== undefined && MyBox !== null && !isPin && !donotClosePopupCard) {
        // 如果点击的不是插件窗口及其子元素，则关闭窗口
        if (MyBox !== event.target && !MyBox.contains(event.target as Node)) {

          port.postMessage({ 'type': 'StopTheConversation', 'messages': '' })

          // 隐藏窗口
          container.parentNode?.removeChild(container);

          document.removeEventListener('selectionchange', handleSelectionchange);
          document.removeEventListener('mouseup', handleMouseup);

        }
      }
    }


  }

});

// 显示应用窗口
async function showPopupCard(data: { keyWord: string, Sentence: string }, msg: any, MyBox: any, shadowRoot: any, isPin: boolean, runPrompt: boolean) {
  // let a = await fetchcurrentLanguage()
  // console.log(a);
  const lang = await fetchcurrentLanguage()

  ReactDOM.render(
    <React.StrictMode>
      <CurrentLanguageContext.Provider value={lang}>
        <StyleProvider container={shadowRoot}>
          <PopupCard data={data} selection={msg} runPrompt={runPrompt} isPin={isPin} />
        </StyleProvider>
      </CurrentLanguageContext.Provider>
    </React.StrictMode>,
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

const handleSelectionchange = () => {
  console.log('===');

  console.log('handleSelectionchange');

  // let selection = window.getSelection();
  // if (selection) {
  //   console.log('selection.toString():');
  //   console.log(selection.toString());

  //   isTextSelected = selection.toString().length > 0;
  // }
}

const handleMouseup = (event: any) => {

  console.log('handleMouseup');
  console.log(isTextSelected);
  console.log(donotClosePopupCard);

  const selection = getSelection()

  if (selection) {
    isTextSelected = selection.selection.toString().length > 0;
  }


  if (isTextSelected && !donotClosePopupCard) {

    console.log('isTextSelected && !donotClosePopupCard');

    if (MyBox !== event.target && !MyBox?.contains(event.target as Node)) {

      isTextSelected = false;


      console.log('(MyBox !== event.target && !MyBox?.contains(event.target as Node)');


      // 停止旧的对话
      port.postMessage({ 'type': 'StopTheConversation', 'messages': '' })

      // 显示窗口
      if (selection && selection?.keyWord.length > 0) {
        showPopupCard({ 'keyWord': selection?.keyWord, 'Sentence': selection.sentence }, window.getSelection(), container, shadowRoot, isPin, true)
      }

    }




  }
}

const getSelection = () => {

  const selection = window.getSelection();

  if (selection !== null) {
    // 当前选中的文字
    let keyWord = selection.toString().trim()

    // 选中文字所在的段落
    let sentence = selection.anchorNode?.textContent ?? ''

    if (sentence === undefined) {
      sentence = ''
    } else {
      sentence = sentence.length <= keyWord.length ? (selection.anchorNode?.parentNode?.parentNode as HTMLElement)?.innerText ?? '' : sentence
    }

    return { 'selection': selection, 'keyWord': keyWord, 'sentence': sentence }

  } else {
    return null
  }

}