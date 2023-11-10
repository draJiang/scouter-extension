

import browser from 'webextension-polyfill'

import { ChatGPTUnofficialProxyAPI } from 'chatgpt'

import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import { v4 as uuidv4 } from 'uuid';
import { ankiAction, unsplashSearchPhotos, getDefaultDeckName, getDictionaryData } from "../util";
import { createApi } from 'unsplash-js';

import { getSettings } from '../Options/util'

import { models } from '../Options/models'

import { cardStyle, fetchSSE, getChatGPTSession } from '../util';

import { getUserInfo, getBalance, getAIParameter, generationsImages } from '../util'

import { userInfoType, aiParameterType } from '../types'

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

    if (msg.type === 'getKnowledge') {

      // 获取 API Key 等存储的数据
      // let openApiKey: string, apiKeySelection: string, model: string, licenseKey: string, currentLanguage, openApiEndpoint: string, targetLanguage = ''
      getSettings().then((result) => {

        // 请求  GPT 数据
        // isContinue = true 时才会渲染数据
        // isContinue = true

        // controller.abort();
        controller = new AbortController();

        let messages = msg.messages

        getAIParameter().then((result: aiParameterType) => {

          const openApiEndpoint = result.data?.chatCompletions.url

          if (!result.data || openApiEndpoint === undefined) {
            port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'code': 'invalid_api_key', 'content': '🥲 API Key error. Please modify and try again..' })
          } else {

            let body = result.data.chatCompletions.body
            body.messages = messages


            const init = {
              method: 'POST',
              signal: controller.signal,
              headers: result.data.chatCompletions.headers,
              body: JSON.stringify(body),
            }

            fetchSSE(openApiEndpoint, init, {
              onMessage: (data) => {
                // 处理接收到的数据
                console.log(data);

                if (data.choices[0].finish_reason !== 'stop') {
                  port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': data.choices[0].delta.content ? data.choices[0].delta.content : '' })
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
                  const tips = error.message.indexOf('Failed to fetch') >= 0 ? '🥲An error occurred. It might be an **API endpoint error**' + '(' + openApiEndpoint + ')' + '. Please modify and try again.' : '🥲An error occurred.'

                  port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': tips + '(' + error.message + ')', 'code': error.message })
                }

              }
            });


            // fetch(openApiEndpoint!, {
            //   signal: controller.signal,
            //   method: "POST",
            //   body: JSON.stringify(body),
            //   headers: result.data.chatCompletions.headers

            // }).then(async (response) => {

            //   port.postMessage({ 'type': 'sendGPTData', 'status': 'begin', 'content': '' })

            //   if (response.status !== 200) {
            //     // API KEY Error
            //     response.json().then((data) => {

            //       port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': '🥲 ' + data.error.message, 'code': data.error.code })

            //       return
            //     })


            //   }

            //   // 处理 server-sent events
            //   const parser = createParser((event) => {


            //     if (event.type === 'event') {
            //       // console.log('createParser:');
            //       try {

            //         if (event.data !== '[DONE]') {

            //           let new_msg = JSON.parse(event.data)['choices'][0]['delta']['content']

            //           if (new_msg !== undefined) {
            //             // console.log(JSON.parse(event.data))
            //             // 将数据发送给 UI 以渲染内容
            //             port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': JSON.parse(event.data)['choices'][0]['delta']['content'], 'chatId': JSON.parse(event.data).id })

            //           }
            //         }


            //       } catch {
            //         console.log(' createParser JSON.parse errow')
            //       }

            //     }
            //   })


            //   const reader = response.body?.getReader();
            //   if (reader !== undefined) {
            //     try {


            //       // eslint-disable-next-line no-constant-condition
            //       while (true) {
            //         const { done, value } = await reader.read()
            //         // const { done:boolean, value:uint8Array } = await Promise.race([reader.read(), cancelPromise]);

            //         if (done) {
            //           // 数据传输结束
            //           console.log('Done');

            //           port.postMessage({ 'type': 'sendGPTData', 'status': 'end', 'content': '' })
            //           break

            //         }

            //         // if (!isContinue) {
            //         //   console.log('停止渲染数据')
            //         //   break
            //         // }

            //         const str = new TextDecoder().decode(value)
            //         parser.feed(str)


            //       }

            //     } finally {

            //       reader.releaseLock()

            //     }
            //     parser.reset()
            //   }


            // }).catch((error) => {
            //   console.log('error');
            //   console.log(error);
            //   if (error.message.indexOf('aborted') >= 0) {
            //     // 开启新的请求，中断旧请求

            //   } else {
            //     const tips = error.message.indexOf('Failed to fetch') >= 0 ? '🥲An error occurred. It might be an **API endpoint error**' + '(' + openApiEndpoint + ')' + '. Please modify and try again.' : '🥲An error occurred.'

            //     port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': tips + '(' + error.message + ')', 'code': error.message })
            //   }

            //   // port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': "🥲 Encountered some issues, please try again later." })

            // })

          }


        })
        //




      })

    }

    if (msg.type === 'getDictionaryData') {


      // const url = 'https://chat.openai.com/backend-api/conversation'
      // const session = getChatGPTSession()
      // const headers = {
      //   'Content-Type': 'application/json',
      //   'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJqemxvbmc2NjZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsicG9pZCI6Im9yZy1TTVVSR281QkVJUlV6TjFLQXJzSGlwRnEiLCJ1c2VyX2lkIjoidXNlci03STVCMG42SmJQWFlQZVFIZFF1YkNpbmMifSwiaXNzIjoiaHR0cHM6Ly9hdXRoMC5vcGVuYWkuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTAxNTE4MjY1MTA0Njc4MDY4ODU5IiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY5OTExNDI0MywiZXhwIjoxNjk5OTc4MjQzLCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9yZ2FuaXphdGlvbi53cml0ZSBvZmZsaW5lX2FjY2VzcyJ9.s7cUAbaXwneQtyf6C7Zy7DLFSbwKsLDII9sEvSaBsJAY2dQaD-n-jflNvPQxKO4bKPkOlskp9TaEl-3-d8NDWd2ds68xoo1ywGaX8VCvGCDLVQOmHmIoho2dICnWCjfjIRYLG-TZ9DumbWP5TrRYNnYq3izGvy1wnAzyH7TkZBFrGY7VIN7CTdthnSURhqU4zp6HNh77HPrbodK9QFFR46FpI6MB1cDiSsvGxlx81BZDo0cJr9hvigLdCSxesL19aViao9wTx5FIYbTWH39VA8pOTulOZATKu8dV_OPAaqYV_gwQB4SX5qCtbWNllCL_4xFWkXUnVuR78Pwb5DLzkw'
      // }

      // const messages = msg.messages.map((item: { role: string, content: string }) => {
      //   return {
      //     id: uuidv4(),
      //     role: item.role,
      //     content: {
      //       content_type: 'text',
      //       parts: [item.content],
      //     },
      //   }
      // })

      // const body = {
      //   action: 'next',
      //   messages: messages,
      //   model: 'text-davinci-002-render-sha', // 'text-davinci-002-render-sha'
      //   parent_message_id: uuidv4(),
      //   history_and_training_disabled: true,
      // }

      // const init = {
      //   method: 'POST',
      //   headers: headers,
      //   body: JSON.stringify(body),
      // }

      // fetchSSE(url, init, {
      //   onMessage: (data) => {
      //     // 处理接收到的数据
      //     console.log(data);
      //     port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': data.message.content.parts[0] })
      //   },
      //   onEnd: () => {
      //     // 处理 SSE 连接结束的逻辑
      //     port.postMessage({ 'type': 'sendGPTData', 'status': 'end', 'content': '' })

      //   },
      //   onError: error => {
      //     // 处理错误的逻辑
      //     console.log(error);

      //   }
      // });


      // fetch(url, {
      //   method: 'POST',
      //   headers,
      //   body: JSON.stringify(body),
      // })
      //   .then(response => {
      //     if (!response.ok) {
      //       throw new Error('Network response was not ok');
      //     }
      //     return response.json(); // 返回一个包含响应数据的 JSON 对象
      //   })
      //   .then(data => {
      //     console.log(data)
      //   }) // 打印响应数据
      //   .catch(error => console.error('There has been a problem with your fetch operation: ', error));

      // port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': '' })
      // // port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': 'Hello World ', 'chatId': '' })


      // 获取词典数据
      const result = await getDictionaryData(msg.keyWord)
      port.postMessage(result)


      // 定义基础的 URL 和查询参数
      // let url = new URL('http://dict.youdao.com/jsonapi');
      // let params = {
      //   xmlVersion: '5.1',
      //   le: 'eng',
      //   q: msg.keyWord
      // };

      // // 创建一个新的 URL 对象
      // url = new URL(url);

      // // 使用 URLSearchParams 对象附加查询参数
      // url.search = new URLSearchParams(params).toString();
      // const ErrorMsg = '🥲 An Error Occurred with the Dictionary, Please Try Again Later.'
      // // 使用 fetch API 发送 GET 请求
      // fetch(url)
      //   .then(response => {
      //     if (!response.ok) {
      //       port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': ErrorMsg, 'chatId': '' })
      //       throw new Error('Network response was not ok');
      //     }
      //     return response.json(); // 返回一个包含响应数据的 JSON 对象
      //   })
      //   .then(data => {
      //     console.log(data)
      //     let msg = ''
      //     if ('ec' in data) {
      //       msg = data.ec.word[0].trs[0].tr[0].l.i[0]
      //     } else if ('fanyi' in data) {
      //       msg = data.fanyi.tran
      //     }

      //     if ('ec' in data || 'fanyi' in data) {

      //       // 数据请求失败
      //       port.postMessage({ 'type': 'sendGPTData', 'status': 'end', 'content': msg, 'chatId': '' })

      //     } else {

      //       port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': ErrorMsg, 'chatId': '' })

      //     }



      //   }) // 打印响应数据
      //   .catch(error =>
      //     port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'content': ErrorMsg, 'chatId': '' })
      //   );

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
          let modelData: any = []



          let promises = models.map((model) => {

            return new Promise<void>((resolve, reject) => {

              if (modelNames.result.includes(model.modelName)) {

                // 如果有 Scouter Model 则获取 Model 的字段
                ankiAction('modelFieldNames', 6, { 'modelName': model.modelName }).then((result: any) => {

                  if (result.result.length < 2) {
                    // 字段少于 2 个时无法添加笔记，引导用户修改

                    modelData.push(
                      { 'defaultDeckName': defaultDeckName, 'modelName': model.modelName, 'field1': result.result[0], 'field2': null, 'isAnkiSpace': model.isAnkiSpace }
                    )

                  } else {

                    modelData.push(
                      { 'defaultDeckName': defaultDeckName, 'modelName': model.modelName, 'field1': result.result[0], 'field2': result.result[1], 'isAnkiSpace': model.isAnkiSpace }
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
                      { 'defaultDeckName': defaultDeckName, 'modelName': model.modelName, 'field1': result.result.flds[0].name, 'field2': result.result.flds[1].name, 'isAnkiSpace': model.isAnkiSpace }
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
            asyncSendResponse({ type: 'setModel', result: 'success', data: modelData, error: result.error });
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