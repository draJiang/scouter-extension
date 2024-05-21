

import browser from 'webextension-polyfill'

import { ChatGPTUnofficialProxyAPI } from 'chatgpt'

import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import { v4 as uuidv4 } from 'uuid';
import { ankiAction, unsplashSearchPhotos, getDefaultDeckName, getDictionaryData } from "../util";
import { createApi } from 'unsplash-js';

import { getSettings } from '../Options/util'

// import { models } from '../options/models'

import { cardStyle, fetchSSE, getChatGPTSession } from '../util';

import { getUserInfo, getBalance, getAIParameter, generationsImages } from '../util'

import { userInfoType, aiParameterType, AnkiModelType } from '../types'

// content script 关闭窗口时，将此值设为 false 以中断数据渲染
// let isContinue = true

let userId: string

try {

  getUserInfo().then((userInfo: userInfoType) => {

    userId = userInfo.userId

  })

} catch (error) {

  console.log(error);

}

let controller = new AbortController();



// 用户安装或者升级插件或者手动重新载入插件时会触发此事件
browser.runtime.onInstalled.addListener(function () {

  // amplitude.track("install")

});

// 卸载插件后引导填写卸载原因，帮助产品优化
browser.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSdobGQN3O0Ck4fVrgfvRZMme3de-2OaEp1pFtibZkU0koc37w/viewform?usp=sf_link");

// 点击右上角插件按钮
browser.action.onClicked.addListener(function (tab) {
  console.log('点击插件按钮');
  // browser.runtime.openOptionsPage(); // 打开扩展的Options页面
});



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

// 监听 tab 变化
browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    
    if (changeInfo.url.indexOf('youtube.com')) {

      browser.tabs.sendMessage(tabId, {
        type: 'tabOnUpdated', data: {
          locateInYouTube: true
        }
      })

    }
  }
});

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
  console.log('连接中------------')
  console.log(port);

  if (port.name === 'fromPopupCard') {
    popupPort = port
    console.log("port.name === 'fromPopupCard'");

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

    if (msg.type === 'getKnowledge') {

      // 获取 API Key 等存储的数据
      // let openApiKey: string, apiKeySelection: string, model: string, licenseKey: string, currentLanguage, openApiEndpoint: string, targetLanguage = ''
      getSettings().then((result) => {

        // 请求  GPT 数据

        controller.abort();
        controller = new AbortController();

        // let messages = msg.messages
        console.log('getAIParameter:');
        getAIParameter(msg.messages).then((result: aiParameterType) => {

          const openApiEndpoint = result.data?.chatCompletions.url

          if (!result.data || openApiEndpoint === undefined) {
            port.postMessage({ 'type': 'sendGPTData', 'status': 'invalid_api_key', 'content': '🥲 API Key error. Please modify and try again..' })
          } else {

            let body = result.data.chatCompletions.body
            // body.messages = messages


            const init = {
              method: 'POST',
              signal: controller.signal,
              headers: result.data.chatCompletions.headers,
              body: JSON.stringify(body),
            }

            const ApiType = result.apiKeySelection
            console.log('ApiType:');
            console.log(ApiType);
            console.log('body:');
            console.log(body);

            if (ApiType === 'chatGPTWeb') {

              port.postMessage({ 'type': 'sendGPTData', 'status': 'done', 'content': '⚠️ ChatGPT Web is temporarily not supported. Please switch to another method.' })

            } else {

              fetchSSE(openApiEndpoint, init, {
                onMessage: (data) => {

                  // 处理接收到的数据

                  // if (ApiType === 'chatGPTWeb') {

                  //   if ('is_completion' in data !== true) {
                  //     port.postMessage({ 'type': 'sendGPTData', 'ApiType': ApiType, 'status': 'process', 'content': data.message.content.parts[0] })
                  //   }

                  // } else {
                  //   if (data.choices[0].finish_reason !== 'stop') {
                  //     port.postMessage({ 'type': 'sendGPTData', 'ApiType': ApiType, 'status': 'process', 'content': data.choices[0].delta.content ? data.choices[0].delta.content : '' })
                  //   }
                  // }
                  if (data.choices.length > 0) {
                    const finish_reason = data.choices[0].finish_reason
                    if (ApiType === 'ollama') {
                      port.postMessage({ 'type': 'sendGPTData', 'ApiType': ApiType, 'status': 'process', 'content': data })
                    } else {

                      if (finish_reason !== 'stop') {
                        port.postMessage({ 'type': 'sendGPTData', 'ApiType': ApiType, 'status': 'process', 'content': data.choices[0].delta.content ? data.choices[0].delta.content : '' })
                      }

                      if ((ApiType === 'scouterFreeAI' || ApiType === 'licenseKey') && finish_reason === 'error') {
                        port.postMessage({ 'type': 'sendGPTData', 'ApiType': ApiType, 'status': 'process', 'content': `🥲error: ${data.choices[0].error.message}` })
                      }

                    }
                  }

                },
                onEnd: () => {
                  // 处理 SSE 连接结束的逻辑
                  port.postMessage({ 'type': 'sendGPTData', 'status': 'done', 'content': '' })

                },
                onError: error => {
                  // 处理错误的逻辑
                  console.log(error);
                  if (error.message.indexOf('aborted') >= 0) {
                    // 开启新的请求，中断旧请求

                  } else {
                    const tips = '🥲Sorry, an error happened, please retry.'

                    port.postMessage({ 'type': 'sendGPTData', 'status': 'error', 'content': tips + '(' + error.message + ')', 'code': error.message })

                    // 如果是 ChatGPT Web 模式的 401 错误，则更新 token，然后引导用户重试
                    getChatGPTSession()

                  }

                }
              }, ApiType);

            }



          }

        }).catch((error) => {

          port.postMessage({ 'type': 'sendGPTData', 'status': 'error', 'content': error ? '🥲 ' + error : '🥲 Something went wrong, please try again later.' })
        })
        //




      })

    }

    if (msg.type === 'getDictionaryData') {

      // 获取词典数据
      const result = await getDictionaryData(msg.keyWord)
      port.postMessage(result)

    }

    if (msg.type === 'UPDATE_POPUP_CARD') {

      popupPort.postMessage(msg);
      // port.postMessage(msg);

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


    if (request.messages.unsplash_download_location !== undefined && request.messages.unsplash_download_location !== '') {
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
    getDefaultDeckName().then(async (result: any) => {

      let defaultDeckName = result.defaultDeckName

      if (defaultDeckName === '' || defaultDeckName === undefined) {
        defaultDeckName = 'Default'
      }

      // 获取用户的所有 model 名称

      try {

        const modelNames: any = await ankiAction('modelNames', 6)

        console.log('modelNames:');
        console.log(modelNames);

        if (!modelNames.error) {

          const models = [
            {
              'modelName': 'Scouter',
              'cardTemplates': [
                {
                  'name': 'Card1',
                  'Front': '{{Front}}',
                  'Back': `{{Front}}
                  <hr id=answer>
                  {{Back}}`

                }
              ],
              'inOrderFields': ["Front", "Back"],
              'isAnkiSpace': false

            },
            {
              'modelName': 'Scouter Cloze Text',
              'cardTemplates': [
                {
                  'name': 'Card2',
                  'Front': '{{cloze:Text}}',
                  'Back': `{{cloze:Text}}
                            <br>{{More}}`
                }
              ],
              'inOrderFields': ["Text", "More"],
              'isAnkiSpace': true
            }
          ]

          // 遍历模型数组，如果存在则返回给 content，如果不存在则新建

          // 用于存储 model 相关的数据，返回给 content 将笔记添加到 Anki
          let modelData: Array<AnkiModelType> = []

          let promises = models.map((model) => {

            return new Promise<void>((resolve, reject) => {

              if (modelNames.result.includes(model.modelName)) {

                // 如果有 Scouter Model 则获取 Model 的字段
                ankiAction('modelFieldNames', 6, { 'modelName': model.modelName }).then((result: any) => {

                  if (result.result.length < 2) {
                    // 字段少于 2 个时无法添加笔记，引导用户修改

                    modelData.push(
                      { 'modelName': model.modelName, 'field1': result.result[0], 'field2': null, 'isAnkiSpace': model.isAnkiSpace }
                    )

                  } else {

                    modelData.push(
                      { 'modelName': model.modelName, 'field1': result.result[0], 'field2': result.result[1], 'isAnkiSpace': model.isAnkiSpace }
                    )

                  }

                  resolve(); // Resolve the Promise

                })

              } else {
                // 如果没有 Scouter 默认的 Model，则创建

                ankiAction('createModel', 6, {
                  'modelName': model.modelName,
                  'inOrderFields': model.inOrderFields,
                  'cardTemplates': model.cardTemplates,
                  'isCloze': model.isAnkiSpace,
                  'css': cardStyle
                }).then((result: any) => {

                  if (!result.error) {

                    modelData.push(
                      { 'modelName': model.modelName, 'field1': result.result.flds[0].name, 'field2': result.result.flds[1].name, 'isAnkiSpace': model.isAnkiSpace }
                    )

                  }

                  resolve(); // Resolve the Promise
                })

              }


            })



          })

          // 等待所有 Promise 完成
          Promise.all(promises).then(() => {
            console.log(modelData);
            asyncSendResponse({ type: 'setModel', result: 'success', data: { 'defaultDeckName': defaultDeckName, 'modelData': modelData }, error: result.error });
          }).catch((error) => {
            console.error('Error:', error);
          });



        }

      } catch (error) {

        asyncSendResponse({ type: 'setModel', result: 'failure', error: error });

      }




    })

    // browser.storage.sync.get({ 'ankiDeckName': 'Default' }).then((result) => {


    // })



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

  if (request.type === 'getUserInfo') {

    getUserInfo().then((userInfo: userInfoType) => {

      asyncSendResponse(userInfo);

    })

    return true;

  }

  if (request.type === 'generationsImages') {

    const data = generationsImages(request.data.prompt)

    asyncSendResponse(data);

    return true;

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