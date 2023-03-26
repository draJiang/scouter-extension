import browser from 'webextension-polyfill'
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'

// [暂时废弃]content script 关闭窗口时，将此值设为 false 以中断数据渲染
let isContinue = true

browser.runtime.onInstalled.addListener(function () {
  console.log("插件已被安装");

  // browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
  //   console.log(tabs);

  //   const activeTab = tabs[0]

  //   if (activeTab && activeTab.id !== undefined) {

  //     chrome.scripting.executeScript({
  //       target: { tabId: activeTab.id },
  //       files: ["js/vendor.js", "js/content_script.js"],
  //     }).then(() => {
  //       console.log('chrome.scripting.executeScript');

  //     })

  //   }
  // })

  // 创建右键菜单
  
  browser.contextMenus.create({
    id: "1",
    title: "Scouter",
    contexts: ["selection"],
  });


  // 右键菜单点击事件
  browser.contextMenus.onClicked.addListener(async function (info, _tab) {

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      console.log(tabs);
      const activeTab = tabs[0]
      let tID = activeTab.id ?? -1

      if (activeTab && activeTab.id !== undefined) {

        let b = browser.tabs.sendMessage(tID, { type: 'open-souter', info, })

        // 已知情况时，刚安装插件时直接使用会报错（刷新页面后使用则正常），此时需要载入 content_script.js 才行
        b.catch(e => {
          console.log(e);
          console.log('catch');

          chrome.scripting.executeScript({
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

  // 接收 content script 的消息
  browser.runtime.onConnect.addListener(port => {
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
        browser.storage.sync.get(["openApiKey"]).then((result) => {

          let messages = msg.messages
          messages.unshift({ "role": "system", "content": "You are an English teacher. Please answer questions about English grammar and vocabulary in Chinese." })

          fetch('https://api.openai.com/v1/chat/completions', {

            method: "POST",
            body: JSON.stringify({
              "model": "gpt-3.5-turbo",
              "messages": messages,
              "temperature": 0,
              "top_p": 0,
              "frequency_penalty": 0.8,
              "presence_penalty": 0.8,
              "stream": true
            }),
            headers: { 'Authorization': 'Bearer ' + result.openApiKey, 'Content-Type': 'application/json', }

          }).then(async (response) => {

            port.postMessage({ 'status': 'begin', 'content': '' })

            if (response.status === 401) {
              // API KEY Error
              console.log('401');
              port.postMessage({ 'status': 'erro', 'content': '🥲 API Key error. Please modify and try again..' })
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
                    port.postMessage({ 'status': 'process', 'content': JSON.parse(event.data)['choices'][0]['delta']['content'] })

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
                    port.postMessage({ 'status': 'end', 'content': '' })
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

              port.postMessage({ 'status': 'erro', 'content': "🥲 Encountered some issues, please try again later." })

            })

        })

      }

      // 停止渲染数据
      // if (msg.type === 'windowClosed') {
      //   isContinue = false
      // }

      // 保存到 Anki

    })
  })

  // 接收 content 消息用来停止渲染 GPT 数据
  // browser.runtime.onMessage.addListener(async (msg, sender) => {
  //   console.log("BG page received message", msg, "from", sender);
  //   // 停止渲染数据
  //   if (msg.type === 'windowClosed') {
  //     isContinue = false
  //   }
  // });

  // 将信息添加到 Anki
  function ankiAction(action: any, version: any, params = {}) {
    return new Promise((resolve, reject) => {
      fetch('http://127.0.0.1:8765', {
        method: "POST",
        body: JSON.stringify({ "action": action, "version": version, "params": params })
      }).then(response => response.json()).then((data) => {

        console.log(data);
        resolve(data)

      })

    });
  }

  const p = {
    "notes": [
      {
        "deckName": "Default",
        "modelName": "Basic",
        "fields": {
          "Front": "front content2",
          "Back": "back content2"
        },
        "tags": [
          "yomichan"
        ],
        "picture": [{
          "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/A_black_cat_named_Tilly.jpg/220px-A_black_cat_named_Tilly.jpg",
          "filename": "black_cat.jpg",
          "skipHash": "8d6e4646dfae812bf39651b59d7429ce",
          "fields": [
            "Back"
          ]
        }]
      }
    ]

  }

  // ankiAction('addNotes', 6, p).then((result) => {
  //   console.log(`got list of decks: ${result}`);
  // })


});
