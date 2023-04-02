import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { PopupCard } from "./PopupCard"

import { StyleProvider } from '@ant-design/cssinjs';

// 页面载入后会注入次脚本，或 background 可能会在一些情况下注入此脚本
// console.log('before browser.runtime.onMessage.addListener');

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
  MyBox.parentNode?.removeChild(MyBox);

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
const antStylesheet = document.createElement('link');
antStylesheet.rel = 'stylesheet';
antStylesheet.href = 'https://cdn.bootcdn.net/ajax/libs/antd/4.17.1/antd.min.css';
shadowRoot.appendChild(antStylesheet);

// 在 Shadow DOM 中添加样式：
const style = document.createElement('style');
style.textContent = `
  @font-face {
  font-family: 'OPPOSans-R';
  src: url('../public/font/OPPOSans-R.ttf') format('truetype');
  }

  #LearningEnglish2023 {
  font-family: sans-serif;
  width: 380px;
  height: 500px;
  color: #333;
  position: fixed;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  background-color: #fff;
  z-index: 9999;
  overflow: hidden;
  box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.1), -1px 10px 10px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  }

  #LearningEnglish2023,#LearningEnglish2023 textarea {

  }

  #LearningEnglish2023 .openAIAnswer {
  line-height: 30px;
  }

  #LearningEnglish2023 .userInput {
  margin: 10px 0;
  }

  #LearningEnglish2023 .contentBox {
  padding: 20px;
  overflow: scroll;
  }

  #LearningEnglish2023 #ScouterNav {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px 19px;
  border-bottom: 1px solid rgba(5, 5, 5, .06);
  user-select: none;
  }

  #LearningEnglish2023 #ScouterNav img {
  width: auto;
  height: 24px;
  margin-right: 6px;
  }

  #LearningEnglish2023 #ScouterSelection span {
  background-color: rgba(0, 0, 0, .04);
  /* border: 1px solid #d9d9d9; */
  padding: 4px 8px;
  border-radius: 2px;
  }

  #LearningEnglish2023 #ScouterSelection {
  margin-bottom: 14px;
  }
  `
shadowRoot?.appendChild(style);


// 接收 background 消息（目前是通过浏览器的右键菜单触发）
browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  // console.log('content script onMessage:');
  // console.log(msg);
  if (msg.type === 'open-souter') {

    // 处理窗口

    if (MyBox !== null && MyBox !== undefined) {
      // 如果已存在容器

      // console.log('已存在 Box 容器');
      MyBox.style.display = 'block'
      // 移除旧内容，避免 2 次渲染混杂在一起
      container.parentNode?.removeChild(container);

    } else {
      // console.log('不存在 Box 容器');
    }


    container = document.createElement('div')
    container.className = 'container'
    shadowRoot?.appendChild(container)

    // 显示窗口
    showPopupCard(window.getSelection(), container, shadowRoot)

    // 监听页面点击事件
    document.onmousedown = function (event) {

      if (MyBox !== undefined && MyBox !== null) {
        // 如果点击的不是插件窗口，则关闭窗口
        if (MyBox !== event.target && !MyBox.contains(event.target as Node)) {
          // console.log('点击窗口外区域');
          // 隐藏窗口
          // MyBox.style.display = 'none'
          // MyBox.parentNode?.removeChild(MyBox);
          container.parentNode?.removeChild(container);

        }
      }
    }

  }

});

// 显示应用窗口
function showPopupCard(msg: any, MyBox: any, shadowRoot: any) {
  // console.log('showPopupCard:');
  // console.log(msg);

  ReactDOM.render(
    <React.StrictMode>
      <StyleProvider container={shadowRoot}>
        <PopupCard selection={msg} />
      </StyleProvider>
    </React.StrictMode>,
    MyBox
  );

}