

import browser from 'webextension-polyfill'
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'

import { ankiAction, unsplashSearchPhotos, getDefaultDeckName } from "./util";
import { createApi } from 'unsplash-js';


// [暂时废弃]content script 关闭窗口时，将此值设为 false 以中断数据渲染
let isContinue = true

let controller = new AbortController();

const defaultOpenApiEndpoint = 'https://api.openai.com'


console.log('I am background');

browser.runtime.onInstalled.addListener(function () {

  console.log("插件已被安装");

});

// 卸载插件后引导填写卸载原因，帮助产品优化
browser.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSdobGQN3O0Ck4fVrgfvRZMme3de-2OaEp1pFtibZkU0koc37w/viewform?usp=sf_link");

browser.contextMenus.create({
  id: "2",
  title: "Run last prompt",
  contexts: ["selection"],
},
  () => {
    browser.runtime.lastError
  });

// 创建右键菜单
browser.contextMenus.create({
  id: "1",
  title: "Open",
  contexts: ["selection"],
},
  () => {
    browser.runtime.lastError
  });




// 右键菜单点击事件
browser.contextMenus.onClicked.addListener(async function (info, _tab) {

  console.log('右键菜单点击事件');
  console.log(info);

  const runPrompt = info.menuItemId === '2' ? true : false

  sendMessageToContent(runPrompt)


})

// 监听快捷键
browser.commands.onCommand.addListener(function (command) {

  console.log('hello');

  if (command === 'RunLastPrompt') {
    // 执行相关代码
    sendMessageToContent()
  }
});

// 长连接，处理 GPT 数据
browser.runtime.onConnect.addListener(port => {
  // 收到 content script 消息
  console.log('连接中------------')



  // 接收 content script 的消息
  port.onMessage.addListener(async (msg) => {
    console.log('接收消息：', msg)

    // 获取 API Key 等存储的数据
    let openApiKey: any, currentLanguage, openApiEndpoint: string, targetLanguage = ''
    browser.storage.sync.get({ 'openApiKey': '', 'openApiEndpoint': defaultOpenApiEndpoint, 'currentLanguage': 'English', 'targetLanguage': 'Spanish' }).then((result) => {

      openApiKey = result.openApiKey
      openApiEndpoint = result.openApiEndpoint
      currentLanguage = result.currentLanguage
      targetLanguage = result.targetLanguage


      // 请求  GPT 数据
      if (msg.type === 'getGPTMsg') {

        console.log('getGPTMsg');


        // isContinue = true 时才会渲染数据
        isContinue = true

        // controller.abort();
        controller = new AbortController();

        let messages = msg.messages

        console.log(messages);

        //==================== 下面的代码用于调试使用，正式环境需要注释掉

        // port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 API Key error. Please modify and try again..' })
        // port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 Encountered some issues, please try again later.' })


        // setTimeout(() => {
        //   const now = new Date();

        //   port.postMessage({ 'type': 'sendGPTData', 'status': 'begin', 'content': '' })
        //   port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': `${now}` })


        //   setTimeout(() => {

        //     for (let i = 0; i < 20; i++) {
        //       port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': "W" })
        //       if (!isContinue) {
        //         console.log('停止渲染数据')
        //         break
        //       }
        //     }

        //     port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': messages[messages.length - 1].content })
        //     port.postMessage({ 'type': 'sendGPTData', 'status': 'end', 'content': "" })
        //   }, 1000);

        // }, 1400);

        // return

        // ====================

        if (openApiKey.length < 5) {
          port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'code': 'invalid_api_key', 'content': '🥲 API Key error. Please modify and try again..' })
          return
        }

        if (openApiEndpoint.length < 5) {
          openApiEndpoint = defaultOpenApiEndpoint
        }

        fetch(openApiEndpoint + '/v1/chat/completions', {
          signal: controller.signal,
          method: "POST",
          body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": messages,
            "temperature": 0.7,
            "max_tokens": 420,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 2,
            "stream": true
          }),
          headers: { 'Authorization': 'Bearer ' + openApiKey, 'Content-Type': 'application/json', }

        }).then(async (response) => {

          port.postMessage({ 'type': 'sendGPTData', 'status': 'begin', 'content': '' })

          if (response.status !== 200) {
            // API KEY Error
            response.json().then((data) => {
              console.log(data)
              port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 ' + data.error.message, 'code': data.error.code })
              return
            })


          }

          // 处理 server-sent events
          const parser = createParser((event) => {


            if (event.type === 'event') {
              // console.log('createParser:');
              try {

                let new_msg = JSON.parse(event.data)['choices'][0]['delta']['content']

                if (new_msg !== undefined) {

                  console.log(JSON.parse(event.data).id);

                  // 将数据发送给 UI 以渲染内容
                  port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': JSON.parse(event.data)['choices'][0]['delta']['content'], 'chatId': JSON.parse(event.data).id })

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


        }).catch((error) => {
          console.log('error');
          console.log(error);
          if (error.message.indexOf('aborted') >= 0) {

          } else {
            const tips = error.message.indexOf('Failed to fetch') >= 0 ? '🥲An error occurred. It might be an **API endpoint error**' + '(' + openApiEndpoint + ')' + '. Please modify and try again.' : '🥲An error occurred.'

            port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': tips + '(' + error.message + ')', 'code': error.message })
          }

          // port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': "🥲 Encountered some issues, please try again later." })

        })


      }

      // 获取 Unsplash 图片
      if (msg.type === 'getUnsplashImages') {

        // 获取图片
        if (msg.keyWord) {

          // port.postMessage({ 'type': 'sendImgData', 'status': 'end', 'imgs': imgs })

          unsplashSearchPhotos(process.env.UNSPLASH_API_KEY as string, msg.keyWord).then((imgs: any) => {
            console.log(imgs);
            port.postMessage({ 'type': 'sendImgData', 'status': 'end', 'imgs': imgs })
          }).catch((error: any) => {
            console.log(error);
          });

        }

      }

      // 停止渲染数据
      if (msg.type === 'StopTheConversation') {
        isContinue = false
        controller.abort();

      }

    })

  })
})

browser.runtime.onMessage.addListener(handleMessage);

function handleMessage(request: any, sender: any, sendResponse: any) {
  console.log("Message from the content script: " +
    request.type);

  // Define sendResponse as an async function
  const asyncSendResponse = async (response: any) => {
    try {
      await sendResponse(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (request.type === 'addNote') {
    console.log('addNote');


    // Unsplash
    const unsplash = createApi({
      accessKey: process.env.UNSPLASH_API_KEY as string
    });

    console.log('unsplash.photos.trackDownload');

    if (request.messages.unsplash_download_location !== undefined) {
      unsplash.photos.trackDownload({ downloadLocation: request.messages.unsplash_download_location, }).then((result) => console.log(result))
    }

    ankiAction(request.messages.anki_action_type, 6, request.messages.anki_arguments).then((result: any) => {

      console.log(`got list of decks: ${result}`);
      // 反馈处理结果
      asyncSendResponse({ type: 'addToAnki', result: 'success', data: result.result, error: result.error });

    })
      .catch((error) => {

        console.error(error);
        asyncSendResponse({ type: 'addToAnki', result: 'failure', error: error.error });

      });

    // Return true to inform sendResponse that you will be calling it asynchronously
    return true;

  }

  // 获取用户设置的牌组和模板
  if (request.type === 'setModel') {

    // 获取 DeckName
    getDefaultDeckName().then((result: any) => {

      let defaultDeckName = result.defaultDeckName

      if (defaultDeckName === '' || defaultDeckName === undefined) {
        defaultDeckName = 'Default'
      }

      // 获取所有 Model
      ankiAction('modelNames', 6).then((result: any) => {

        console.log(result.result);

        if (!result.error) {

          const defaultModelName = 'Scouter'

          if (result.result.includes(defaultModelName)) {
            // 如果有 Scouter Model 则获取 Model 的字段

            ankiAction('modelFieldNames', 6, { 'modelName': defaultModelName }).then((result: any) => {
              if (result.result.length < 2) {
                // 字段少于 2 个时无法添加笔记，引导用户修改

                asyncSendResponse({ type: 'setModel', result: 'failure', data: {}, error: 'The Scouter model in Anki needs to include at least 2 fields. Please modify and try again.' });

              } else {

                // 反馈处理结果
                asyncSendResponse({ type: 'setModel', result: 'success', data: { 'defaultDeckName': defaultDeckName, 'modelName': defaultModelName, 'field1': result.result[0], 'field2': result.result[1] }, error: result.error });

              }
            })

          } else {
            // 如果没有 Scouter 默认的 Model，则创建

            ankiAction('createModel', 6, {
              "modelName": defaultModelName,
              "inOrderFields": ["Front", "Back"],
              'cardTemplates': [
                {
                  'name': 'Card1',
                  'Front': '{{Front}}',
                  'Back': `{{Front}}
                <hr id=answer>
                {{Back}}`

                }
              ]
            }).then((result: any) => {
              if (!result.error) {
                // 反馈处理结果
                asyncSendResponse({
                  type: 'setModel', result: 'success', data: {
                    'defaultDeckName': defaultDeckName,
                    'modelName': defaultModelName,
                    'field1': result.result.flds[0].name,
                    'field2': result.result.flds[1].name

                  }, error: result.error
                });
              }
            })

          }


        }




      })
        .catch((error) => {

          console.error(error);
          asyncSendResponse({ type: 'setModel', result: 'failure', error: error.error });

        });

    })

    browser.storage.sync.get({ 'ankiDeckName': 'Default' }).then((result) => {



    })



    return true;

  }

  if (request.type === 'guiEditNote') {

    ankiAction(request.messages.anki_action_type, 6, request.messages.anki_arguments).then((result: any) => {

      console.log(`got list of decks: ${result}`);
      // 反馈处理结果
      asyncSendResponse({ type: 'guiEditNote', result: 'success', data: result.result, error: result.error });

    })
      .catch((error) => {

        console.error(error);
        asyncSendResponse({ type: 'guiEditNote', result: 'failure', error: error.error });

      });

    // Return true to inform sendResponse that you will be calling it asynchronously
    return true;

  }

}


const sendMessageToContent = (runPrompt?: boolean) => {
  console.log('sendMessageToContent:');
  if (runPrompt === undefined) {
    runPrompt = true
  }

  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    console.log(tabs);
    const activeTab = tabs[0]
    let tID = activeTab.id ?? -1

    if (activeTab && activeTab.id !== undefined) {

      let b = browser.tabs.sendMessage(tID, { type: 'open-souter', runPrompt: runPrompt })

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
          browser.tabs.sendMessage(tID, { type: 'open-souter' })
        })

      })

    }


  })


}