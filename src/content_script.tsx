import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { PopupCard } from "./PopupCard"

// 接收消息
browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log('content script onMessage:');
  console.log(msg);

  // sendResponse('Hello Background, I am content_script')

  // 用户选中的文字
  console.log(window.getSelection());
  if (window.getSelection() !== null) {

    console.log(window.getSelection()?.toString());

  }

  let MyBox = document.getElementById('myBox') ? document.getElementById('myBox') : undefined
  // 如果已存在容器

  if (MyBox !== null && MyBox !== undefined) {
    console.log('已存在 Box 容器');
  } else {
    // 如果不存在容器
    console.log('不存在 Box 容器');
    MyBox = document.createElement('div')
    MyBox.id = 'myBox'
    document.body.appendChild(MyBox);

  }

  console.log('MyBox:');
  console.log(MyBox);


  // 显示窗口
  showPopupCard(window.getSelection(), MyBox)
  MyBox.style.display = 'block'

  // document.removeEventListener('click')

  // // 页面绑定点击事件
  // document.addEventListener('click', HidePopup(event))

  document.onclick = function (event) {

    if (MyBox !== undefined && MyBox !== null) {
      // 如果点击的不是插件窗口，则关闭窗口
      if (MyBox !== event.target && !MyBox.contains(event.target as Node)) {
        console.log('点击窗口外区域');
        // 隐藏窗口
        MyBox.style.display = 'none'
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