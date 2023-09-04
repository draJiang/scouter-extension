

import browser from 'webextension-polyfill'
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'

import { ankiAction, unsplashSearchPhotos, getDefaultDeckName } from "./util";
import { createApi } from 'unsplash-js';

import { getSettings } from './Options/util'

import { models } from './Options/models'

import { getUserInfo, getBalance } from './util'

import { userInfoType } from './types'

// content script 关闭窗口时，将此值设为 false 以中断数据渲染
// let isContinue = true

let userId: string

try {

  getUserInfo().then((userInfo: userInfoType) => {

    userId = userInfo.userId
    // console.log('userInfo:');
    // console.log(userInfo);

    // 数据埋点
    // amplitude.init(process.env.AMPLITUDE_KEY as string, userId, {
    //   defaultTracking: {
    //     pageViews: false,
    //     sessions: false,
    //   },
    // });

  })

} catch (error) {

  console.log(error);

}

let controller = new AbortController();

const defaultOpenApiEndpoint = 'https://api.openai.com'

// 用户安装或者升级插件或者手动重新载入插件时会触发此事件
browser.runtime.onInstalled.addListener(function () {

  // amplitude.track("install")

});

// 卸载插件后引导填写卸载原因，帮助产品优化
browser.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSdobGQN3O0Ck4fVrgfvRZMme3de-2OaEp1pFtibZkU0koc37w/viewform?usp=sf_link");


// 创建右键菜单

browser.contextMenus.create({
  id: "2",
  title: "Run last prompt",
  contexts: ["selection"],
},
  () => {
    browser.runtime.lastError
  });


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


  const runPrompt = info.menuItemId === '2' ? true : false

  sendMessageToContent(runPrompt)


})

// 监听快捷键
browser.commands.onCommand.addListener(function (command) {


  if (command === 'RunLastPrompt') {
    // 执行相关代码
    sendMessageToContent()
  }

  if (command === 'Open') {
    // 执行相关代码
    sendMessageToContent(false)
  }
});

let popupPort: any;

// 长连接，主要处理 GPT 数据
browser.runtime.onConnect.addListener(port => {
  // 收到 content script 消息
  // console.log('连接中------------')

  if (port.name === 'fromPopupCard') {
    popupPort = port
  }

  // amplitude.init(process.env.AMPLITUDE_KEY as string);

  // amplitude.track('executivePrompt');

  // 接收 content script 的消息
  port.onMessage.addListener(async (msg) => {
    console.log('接收消息：', msg)

    // 停止渲染数据
    if (msg.type === 'StopTheConversation') {
      // isContinue = false
      controller.abort();
    }

    if (msg.type === 'getGPTMsg') {

      // 获取 API Key 等存储的数据
      let openApiKey: string, apiKeySelection: string, model: string, licenseKey: string, currentLanguage, openApiEndpoint: string, targetLanguage = ''
      getSettings().then((result) => {

        apiKeySelection = result.apiKeySelection
        licenseKey = result.licenseKey
        openApiKey = result.openApiKey
        openApiEndpoint = result.openApiEndpoint
        currentLanguage = result.currentLanguage
        targetLanguage = result.targetLanguage
        model = result.model


        // 请求  GPT 数据


        // isContinue = true 时才会渲染数据
        // isContinue = true

        // controller.abort();
        controller = new AbortController();

        let messages = msg.messages

        if (openApiKey.length < 5 && licenseKey.length < 5) {
          port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'code': 'invalid_api_key', 'content': '🥲 API Key error. Please modify and try again..' })
          return
        }

        if (openApiEndpoint.length < 5) {
          openApiEndpoint = defaultOpenApiEndpoint
        }


        let headers = {}
        let body

        // 优先使用自己的 Key
        if (apiKeySelection === 'licenseKey') {

          // 使用许可证
          openApiEndpoint = 'https://openrouter.ai/api/v1/chat/completions'
          openApiKey = licenseKey
          headers = {
            'Authorization': 'Bearer ' + openApiKey,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://notes.dabing.one/', // To identify your app
            'X-Title': 'Scouter'
          }
          body = JSON.stringify({
            "model": model,
            "messages": messages,
            "temperature": 0.7,
            "max_tokens": 420,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 2,
            "stream": true
          })

        } else {

          // 使用用户自己的 Key

          if (openApiEndpoint.indexOf('azure.com') > -1) {

            // Azure
            headers = { 'api-key': openApiKey, 'Content-Type': 'application/json', }
            body = JSON.stringify({
              "model": "gpt-35-turbo",
              "messages": messages,
              "temperature": 0.7,
              "max_tokens": 420,
              "top_p": 1,
              "frequency_penalty": 0,
              "presence_penalty": 2,
              "stream": true
            })

          } else {

            // OpenAI
            headers = { 'Authorization': 'Bearer ' + openApiKey, 'Content-Type': 'application/json', }

            // 去除端点末尾的 \ 符号
            if (openApiEndpoint.slice(-1) === "/") {
              openApiEndpoint = openApiEndpoint.slice(0, -1);
            }

            openApiEndpoint += '/v1/chat/completions'

            body = JSON.stringify({
              "model": "gpt-3.5-turbo",
              "messages": messages,
              "temperature": 0.7,
              "max_tokens": 420,
              "top_p": 1,
              "frequency_penalty": 0,
              "presence_penalty": 2,
              "stream": true
            })

          }

        }

        fetch(openApiEndpoint, {
          signal: controller.signal,
          method: "POST",
          body: body,
          headers: headers

        }).then(async (response) => {

          port.postMessage({ 'type': 'sendGPTData', 'status': 'begin', 'content': '' })

          if (response.status !== 200) {
            // API KEY Error
            response.json().then((data) => {

              port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 ' + data.error.message, 'code': data.error.code })

              return
            })


          }

          // 处理 server-sent events
          const parser = createParser((event) => {


            if (event.type === 'event') {
              // console.log('createParser:');
              try {

                if (event.data !== '[DONE]') {

                  let new_msg = JSON.parse(event.data)['choices'][0]['delta']['content']

                  if (new_msg !== undefined) {

                    // 将数据发送给 UI 以渲染内容
                    port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': JSON.parse(event.data)['choices'][0]['delta']['content'], 'chatId': JSON.parse(event.data).id })

                  }
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
                // const { done:boolean, value:uint8Array } = await Promise.race([reader.read(), cancelPromise]);

                if (done) {
                  // 数据传输结束
                  console.log('Done');

                  port.postMessage({ 'type': 'sendGPTData', 'status': 'end', 'content': '' })
                  break

                }

                // if (!isContinue) {
                //   console.log('停止渲染数据')
                //   break
                // }

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
            // 开启新的请求，中断旧请求

          } else {
            const tips = error.message.indexOf('Failed to fetch') >= 0 ? '🥲An error occurred. It might be an **API endpoint error**' + '(' + openApiEndpoint + ')' + '. Please modify and try again.' : '🥲An error occurred.'

            port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': tips + '(' + error.message + ')', 'code': error.message })
          }

          // port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': "🥲 Encountered some issues, please try again later." })

        })



      })

    }

    if (msg.type === 'UPDATE_POPUP_CARD') {

      popupPort.postMessage(msg);

    }

  })
})

// 监听一次性消息
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

  if (request.type === 'getUnsplashImages') {

    console.log('background getUnsplashImages:');

    // 获取图片
    if (request.keyWord) {

      // port.postMessage({ 'type': 'sendImgData', 'status': 'end', 'imgs': imgs })

      unsplashSearchPhotos(process.env.UNSPLASH_API_KEY as string, request.keyWord).then((imgs: any) => {

        // port.postMessage({ 'type': 'sendImgData', 'status': 'end', 'imgs': imgs })
        asyncSendResponse({ type: 'sendImgData', status: 'end', 'imgs': imgs });
      }).catch((error: any) => {
        console.log(error);
      });

    }

    return true;

  }

  if (request.type === 'addNote') {
    console.log('addNote');


    // Unsplash
    const unsplash = createApi({
      accessKey: process.env.UNSPLASH_API_KEY as string
    });


    if (request.messages.unsplash_download_location !== undefined) {
      unsplash.photos.trackDownload({ downloadLocation: request.messages.unsplash_download_location, }).then((result) => console.log(result))
    }

    ankiAction(request.messages.anki_action_type, 6, request.messages.anki_arguments).then((result: any) => {


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

    const isAnkiSpace = request.messages.isAnkiSpace


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

          let defaultModelName = 'Scouter'
          let cardTemplates = [
            {
              'name': 'Card1',
              'Front': '{{Front}}',
              'Back': `{{Front}}
              <hr id=answer>
              {{Back}}`

            }
          ]
          let inOrderFields = ["Front", "Back"]

          if (isAnkiSpace) {
            // Anki 完形填空
            defaultModelName = 'Scouter Cloze Text'
            cardTemplates = [
              {
                'name': 'Card2',
                'Front': '{{cloze:Text}}',
                'Back': `{{cloze:Text}}
                        <br>{{More}}`
              }
            ]
            inOrderFields = ["Text", "More"]
          }

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
              'modelName': defaultModelName,
              'inOrderFields': inOrderFields,
              'cardTemplates': cardTemplates,
              'isCloze': isAnkiSpace
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

  if (request.type === 'ankiAction') {

    ankiAction(request.messages.anki_action_type, 6, request.messages.anki_arguments).then((result: any) => {

      // 反馈处理结果
      asyncSendResponse(result);

    }).catch((error) => {

      asyncSendResponse(error);

    });

    return true;

  }

  if (request.type === 'amplitudeTrack') {


    fetch('https://api.amplitude.com/2/httpapi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.AMPLITUDE_KEY,
        events: [
          {
            user_id: userId,
            event_type: request.name,
          }
        ]
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });


    // return true;

  }

  if (request.type === 'getUserStatus') {

    // 获取用户的 License Key
    getSettings().then((result) => {

      const licenseKey = result.licenseKey
      // 获取 Key 的余额，有余额则可开启高级功能
      const data = getBalance(licenseKey)
      asyncSendResponse(data);
      console.log(data);

      return true;

    })


  }

  if (request.type === 'UPDATE_POPUP_CARD') {
    console.log('sendMessage');

    popupPort.postMessage(request);

  }

}



const sendMessageToContent = (runPrompt?: boolean) => {

  let needToRunPrompt = runPrompt
  if (needToRunPrompt === undefined) {
    needToRunPrompt = true
  }

  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {

    const activeTab = tabs[0]
    let tID = activeTab.id ?? -1

    if (activeTab && activeTab.id !== undefined) {

      let b = browser.tabs.sendMessage(tID, { type: 'open-scouter', runPrompt: needToRunPrompt })

      // 已知情况：刚安装插件时直接使用会报错（刷新页面后使用则正常），此时需要载入 content_script.js 才行
      // b.catch(e => {
      //   console.log(e);
      //   console.log('catch');

      //   browser.scripting.executeScript({
      //     target: { tabId: tID },
      //     files: ["js/vendor.js", "js/content_script.js"],
      //   }).then(() => {
      //     console.log('chrome.scripting.executeScript');
      //   }).then(() => {
      //     browser.tabs.sendMessage(tID, { type: 'open-scouter' })
      //   })

      // })

    }


  })


}