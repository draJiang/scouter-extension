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



let isPin = false

// 初始化主容器，主容器用来挂在全局样式，包括第三方组件的样式
let MyBox: HTMLElement | null = document.getElementById('__jiang-souter');
// container 承载 UI 组件
let container = document.createElement('div')
// 使用 shadow 来隔离样式
let shadowRoot: any = undefined

if (MyBox !== null && MyBox !== undefined) {
  // 如果已存在容器
  // console.log('已存在 Box 容器');
  // 移除旧容器，避免出现 2 个主容器会导致 UI 渲染错误
  // MyBox.parentNode?.removeChild(MyBox);

}

// 创建主容器
MyBox = document.createElement('div')
MyBox.id = '__jiang-souter'
document.getElementsByTagName('html')[0].appendChild(MyBox);
MyBox.style.display = 'none' //默认隐藏

shadowRoot = MyBox?.attachShadow({ mode: 'open' });
container.className = 'container'
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

  #LearningEnglish2023 {
  font-family: sans-serif;
  width: 390px;
  height: 560px;
  color: rgb(0 0 0 / 80%);
  position: fixed;
  display: flex;
  flex-direction: column;
  font-size: 13px;
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

  `
shadowRoot?.appendChild(style);


// 接收 background 消息（目前是通过浏览器的右键菜单触发）
browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  // console.log('content script onMessage:');
  // console.log(msg);
  if (msg.type === 'open-souter') {

    let port = browser.runtime.connect({
      name: 'popup-name'
    })



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
      port.postMessage({ 'type': 'StopTheConversation', 'messages': '' })

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




    // 监听页面点击事件
    document.onmousedown = function (event) {

      if (MyBox !== undefined && MyBox !== null && !isPin) {
        // 如果点击的不是插件窗口及其子元素，则关闭窗口
        if (MyBox !== event.target && !MyBox.contains(event.target as Node)) {
          // 隐藏窗口
          container.parentNode?.removeChild(container);

          document.removeEventListener('selectionchange', handleSelectionchange);
          document.removeEventListener('mouseup', handleMouseup);

        }
      }
    }

    let isTextSelected = false;

    document.addEventListener('selectionchange', handleSelectionchange);
    document.addEventListener('mouseup', handleMouseup);

  }

});

// 显示应用窗口
async function showPopupCard(data: { keyWord: string, Sentence: string }, msg: any, MyBox: any, shadowRoot: any, isPin: boolean, runPrompt: boolean) {
  console.log('showPopupCard:');
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

let isTextSelected = false;

const handleSelectionchange = () => {
  let selection = window.getSelection();
  if (selection) {
    isTextSelected = selection.toString().length > 0;
  }
}

const handleMouseup = (event: any) => {
  if (isTextSelected) {


    if (MyBox !== event.target && !MyBox?.contains(event.target as Node)) {

      isTextSelected = false;

      const selection = getSelection()

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

    return { 'keyWord': keyWord, 'sentence': sentence }

  } else {
    return null
  }

}