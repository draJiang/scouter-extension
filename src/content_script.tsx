import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { PopupCard } from "./PopupCard"




// 接收消息
// require('webextension-polyfill').then(async (browser: any) => {
//   const port = await browser.runtime.connect({ name: 'background-fetch' })

//   port.onMessage.addListener(
//     (msg: { error: { message: string; name: string }; status: number; response: string }) => {
//       if (msg.error) {
//         const error = new Error()
//         error.message = msg.error.message
//         error.name = msg.error.name
//         // reject(error)
//         return
//       }
//       if (msg.status !== 200) {
//         // onError(msg)
//         console.log(200);

//       } else {
//         // onMessage(msg.response)
//       }
//     }
//   )
// })



browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {


  console.log('content script onMessage:');
  console.log(msg);

  // sendResponse('Hello Background, I am content_script')

  // 用户选中的文字
  if (window.getSelection() !== null) {

    console.log(window.getSelection()?.toString());

  }

  let MyBox: HTMLElement | null = document.getElementById('__jiang-souter');
  let shadowBox = document.createElement('div')

  

  if (MyBox !== null && MyBox !== undefined) {
    // 如果已存在容器
    console.log('已存在 Box 容器');
  } else {
    // 如果不存在容器

    console.log('不存在 Box 容器');
    MyBox = document.createElement('div')
    MyBox.id = '__jiang-souter'
    document.getElementsByTagName('html')[0].appendChild(MyBox);

    const shadow = MyBox?.attachShadow({ mode: 'open' });

    shadow.appendChild(shadowBox)

    // Ant 组件样式
    const antStylesheet = document.createElement('link');
    antStylesheet.rel = 'stylesheet';
    antStylesheet.href = 'https://cdn.bootcdn.net/ajax/libs/antd/4.17.1/antd.min.css';
    shadow.appendChild(antStylesheet);

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
        top: 10px;
        right: 10px;

        background-color: #fff;
        z-index: 9999;
        overflow: hidden;
        box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.1), -1px 10px 10px rgba(0, 0, 0, 0.06);
        border-radius: 4px;
    }

    #LearningEnglish2023,#LearningEnglish2023 textarea {
      font-size: 13px;
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
        font-weight: bold;
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
    shadow.appendChild(style);

  }

  // 显示窗口
  showPopupCard(window.getSelection(), shadowBox)

  // 监听页面点击事件
  document.onclick = function (event) {

    if (MyBox !== undefined && MyBox !== null) {
      // 如果点击的不是插件窗口，则关闭窗口
      if (MyBox !== event.target && !MyBox.contains(event.target as Node)) {
        console.log('点击窗口外区域');
        // 隐藏窗口
        MyBox.style.display = 'none'

        MyBox.parentNode?.removeChild(MyBox);

        // 通知 background 停止处理数据
        // browser.runtime.sendMessage({ 'type': 'windowClosed', 'messages': '' });


      }
    }
  }


});

function showPopupCard(msg: any, MyBox: any) {
  console.log('showPopupCard:');
  console.log(msg);

  ReactDOM.render(
    <React.StrictMode>
      <PopupCard selection={msg} />
    </React.StrictMode>,
    MyBox

  );

}