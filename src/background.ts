import browser from 'webextension-polyfill'
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import { ankiAction } from "./util";

// [暂时废弃]content script 关闭窗口时，将此值设为 false 以中断数据渲染
let isContinue = true
console.log('I am background');

browser.runtime.onInstalled.addListener(function () {
  console.log("插件已被安装");
});


// 创建右键菜单
browser.contextMenus.create({
  id: "1",
  title: "Scouter",
  contexts: ["selection"],
},
  () => {
    browser.runtime.lastError
  });


// 右键菜单点击事件
browser.contextMenus.onClicked.addListener(async function (info, _tab) {

  console.log('右键菜单点击事件');

  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    console.log(tabs);
    const activeTab = tabs[0]
    let tID = activeTab.id ?? -1

    if (activeTab && activeTab.id !== undefined) {

      let b = browser.tabs.sendMessage(tID, { type: 'open-souter', info, })

      // 已知情况：刚安装插件时直接使用会报错（刷新页面后使用则正常），此时需要载入 content_script.js 才行
      b.catch(e => {
        console.log(e);
        console.log('catch');

        browser.scripting.executeScript({
          target: { tabId: tID },
          files: ["js/vendor.js", "js/content_script.js"],
        }).then(() => {
          console.log('chrome.scripting.executeScript');
        }).then(() => {
          browser.tabs.sendMessage(tID, { type: 'open-souter', info, })
        })

      })

    }


  })

})

// 长连接，处理 GPT 数据
browser.runtime.onConnect.addListener(port => {
  // 收到 content script 消息
  console.log('连接中------------')

  // 接收 content script 的消息
  port.onMessage.addListener(msg => {
    console.log('接收消息：', msg)
    // return
    // 请求  GPT 数据
    if (msg.type === 'getGPTMsg') {

      // isContinue = true 时才会渲染数据
      isContinue = true

      // 获取存储的 API Key  
      browser.storage.sync.get({ 'openApiKey': '', 'currentLanguage': 'English', 'targetLanguage': 'Spanish' }).then((result) => {

        let messages = msg.messages
        // messages.unshift({ "role": "system", "content": `You are an ${result.targetLanguage} teacher. Please answer questions about ${result.targetLanguage} grammar and vocabulary in ${result.currentLanguage}.` })
        console.log(messages)

        //==================== 下面 4 行代码用于调试使用，正式环境需要注释掉
        // port.postMessage({ 'type': 'sendGPTData', 'status': 'begin', 'content': 'Welcome to the React documentation! This page will give you an introduction to the 80% of React concepts that you will use on a daily basis.' })
        // port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': "在这个句子中，“that”是一个关系代词，用来引导一个定语从句，修饰先行词“JavaScript functions”。## 英文例句 React components are JavaScript functions that return markup. ## 中文翻译 React组件是返回标记的JavaScript函数。 ## 翻译问题： 1. React组件是JavaScript函数，它们返回标记。 2. 我们需要一些能够处理大量数据的算法。" })
        // port.postMessage({ 'type': 'sendGPTData', 'status': 'end', 'content': "" })
        // return
        // ====================

        if (result.openApiKey.length < 5) {
          port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 API Key error. Please modify and try again..' })
          return
        }

        fetch('https://api.openai.com/v1/chat/completions', {

          method: "POST",
          body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": messages,
            // "temperature": 0.8,
            // "top_p": 0.9,
            // "frequency_penalty": -0.5,
            // "presence_penalty": 0.5,

            // "temperature": 0,
            // "max_tokens":520,
            // "top_p": 1,
            // "frequency_penalty": 0,
            // "presence_penalty": 1,

            "temperature": 0,
            "max_tokens":320,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 1,

            "stream": true
          }),
          headers: { 'Authorization': 'Bearer ' + result.openApiKey, 'Content-Type': 'application/json', }

        }).then(async (response) => {

          port.postMessage({ 'type': 'sendGPTData', 'status': 'begin', 'content': '' })

          if (response.status === 401) {
            // API KEY Error
            console.log('401');
            port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 API Key error. Please modify and try again..' })
            return
          }

          if (response.status !== 401 && response.status !== 200) {
            //  Error
            port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 Encountered some issues, please try again later.' })
            return
          }

          // 处理 server-sent events
          const parser = createParser((event) => {
            if (event.type === 'event') {
              // console.log('createParser:');
              try {

                let new_msg = JSON.parse(event.data)['choices'][0]['delta']['content']
                if (new_msg !== undefined) {

                  // 将数据发送给 UI 以渲染内容
                  port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': JSON.parse(event.data)['choices'][0]['delta']['content'] })

                }

              } catch {
                console.log(' createParser JSON.parse errow')
              }

            }
          })

          const reader = response.body?.getReader();
          if (reader !== undefined) {
            try {

              // eslint-disable-next-line no-constant-condition
              while (true) {
                const { done, value } = await reader.read()

                if (done) {
                  // 数据传输结束
                  console.log('Done');
                  port.postMessage({ 'type': 'sendGPTData', 'status': 'end', 'content': '' })
                  break

                }

                if (!isContinue) {
                  console.log('停止渲染数据')
                  break
                }

                const str = new TextDecoder().decode(value)
                parser.feed(str)


              }

            } finally {

              reader.releaseLock()

            }
            parser.reset()
          }


        })
          .catch((error) => {
            console.log('error');
            console.log(error);

            port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': "🥲 Encountered some issues, please try again later." })

          })

      })

    }

    // 停止渲染数据
    if (msg.type === 'windowClosed') {
      isContinue = false
    }

  })
})

browser.runtime.onMessage.addListener(handleMessage);

function handleMessage(request: any, sender: any, sendResponse: any) {
  console.log("Message from the content script: " +
    request.type);


  if (request.type === 'addToAnki') {
    console.log('addToAnki');

    const p = request.messages


    // Define sendResponse as an async function
    const asyncSendResponse = async (response: any) => {
      try {
        await sendResponse(response);
      } catch (error) {
        console.error(error);
      }
    };

    ankiAction('addNote', 6, p).then((result: any) => {
      console.log(`got list of decks: ${result}`);
      // 反馈处理结果
      asyncSendResponse({ type: 'addToAnki', result: 'success', error: result.error });
    })
      .catch((error) => {
        console.error(error);
        asyncSendResponse({ type: 'addToAnki', result: 'failure', error: error.error });
      });

    // Return true to inform sendResponse that you will be calling it asynchronously
    return true;

  }

}