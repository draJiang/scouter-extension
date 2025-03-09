

import browser, { action } from 'webextension-polyfill'

// import { ChatGPTUnofficialProxyAPI } from 'chatgpt'

// import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
// import { v4 as uuidv4 } from 'uuid';
import { ankiAction, unsplashSearchPhotos, getDefaultDeckName, getDictionaryData } from "../util";
import { createApi } from 'unsplash-js';

import { getSettings } from '../Options/util'

// import { models } from '../options/models'

import { cardStyle, fetchSSE, getChatGPTSession } from '../util';

import { getUserInfo, getBalance, getAIParameter, generationsImages } from '../util'

import { userInfoType, aiParameterType,ImageType } from '../types'

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
browser.runtime.onInstalled.addListener(function (details) {

  if (details.reason === 'install') { browser.tabs.create({ url: "welcome.html" }); }

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

// 总结网页
browser.contextMenus.create({
  id: "3",
  title: "Summarize",
  contexts: ["page"],
},
  () => {
    browser.runtime.lastError
  });


// 右键菜单点击事件
browser.contextMenus.onClicked.addListener(async function (info, _tab) {


  const runPrompt = info.menuItemId === '2' ? true : false

  sendMessageToContent(info.menuItemId,runPrompt)

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
    sendMessageToContent('',false)
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

      
      if(msg.option && msg.option.dictionary){
        // 查询词典数据
        console.log(msg)
        const dictionary = msg.option.dictionary
        for (const d of dictionary) {
          switch (d) {
            case 'youdao':
              const result = await getDictionaryData(msg.keyWord)
              console.log(result);
              port.postMessage({ 'type': 'sendGPTData', 'status': 'process', 'content': `${result}\n\n---\n` })
              break;
            default:
              break;
          }
        };
      }

      // 获取 API Key 等存储的数据
      // let openApiKey: string, apiKeySelection: string, model: string, licenseKey: string, currentLanguage, openApiEndpoint: string, targetLanguage = ''
      // const result = await getSettings();
        // 请求  GPT 数据

        controller.abort();
        controller = new AbortController();

        // let messages = msg.messages
        console.log('getAIParameter:');
        try {
          const result:aiParameterType = await getAIParameter(msg.messages);
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

                  // console.log('fetchSSE data:');
                  // console.log(data);
                  
                  if (ApiType === 'ollama') {
                    port.postMessage({ 'type': 'sendGPTData', 'ApiType': ApiType, 'status': 'process', 'content': data })
                  } else{
                    if (data.choices.length > 0) {
                      const finish_reason = data.choices[0].finish_reason
                      
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
                    // getChatGPTSession()

                  }

                }
              }, ApiType);

            }



          }
        } catch (error) {
          port.postMessage({ 'type': 'sendGPTData', 'status': 'error', 'content': error ? '🥲 ' + error : '🥲 Something went wrong, please try again later.' })
        }

    }

    if (msg.type === 'getDictionaryData') {

      // 获取词典数据
      const result = await getDictionaryData(msg.keyWord)
      port.postMessage({ 'type': 'sendGPTData', 'status': 'done', 'content': result })

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

    // const isAnkiSpace = request.messages.isAnkiSpace

    // 获取用户设置的 ankiSettings
    (async()=>{
      const settings = await getSettings()
      let deckNames
      try {
        // 获取用户的所有 decks 名称
        const getdeckNamesResult = await ankiAction('deckNames', 6)  
        if(!(getdeckNamesResult as any).error){
          deckNames = getdeckNamesResult as any
        }
      } catch (error:any) {
        asyncSendResponse({ type: 'setModel', result: 'failure', error: error.error });
      }
      
      
      // 如果包含默认的 Scouter note
      if(settings.ankiSettings.some((setting: any) => 
        setting.ankiNoteName === 'Scouter' || setting.ankiNoteName === 'Scouter Cloze Text'
      )){
        // 需要检查 anki 中是否有对应的 note
        
        
        // 获取用户的所有 model 名称
        const modelNames: any = await ankiAction('modelNames', 6)

        if (!modelNames.error) {
          const hasScouterNote = modelNames.result.filter((name: string) => 
            name === 'Scouter')
        const hasScouterClozeNote = modelNames.result.filter((name: string) => 
          name === 'Scouter Cloze Text')

          if(hasScouterNote.length<1){
            // 没有默认的 Scouter note 则需要新建
            ankiAction('createModel', 6, {
              'modelName': 'Scouter',
              'inOrderFields': ["Front", "Back"],
              'cardTemplates': [

                {'name': 'Card1',
                'Front': '{{Front}}',
                'Back': `{{Front}}
                <hr id=answer>
                {{Back}}`}
            ],
              'isCloze': false,
              'css': cardStyle
            })
  
          }
          if(hasScouterClozeNote.length<1){
            // 没有默认的 Scouter Cloze Text note 则需要新建
            ankiAction('createModel', 6, {
              'modelName': 'Scouter Cloze Text',
              'inOrderFields': ["Text", "More"],
              'cardTemplates': [
                  {
                    'name': 'Card2',
                    'Front': '{{cloze:Text}}',
                    'Back': `{{cloze:Text}}
                              <br>{{More}}`
                  }
                ],
              'isCloze': false,
              'css': cardStyle
            })
          }

        }else{
          // 请求出错需要反馈
          asyncSendResponse({ type: 'setModel', result: 'failure', error: modelNames.error });

        }
        

        // 检查 default deck 是否存在
        if(true){
          // 不存在则获取 deck，取 deck[0] 作为 deck
        }
        
      }else{
        // 如果非 Scouter note
        // 直接返回 settings 给用户
        
      }

      asyncSendResponse({ type: 'setModel', result: 'success', data: {deckAndNoteList:settings.ankiSettings,deckNames:deckNames.result}});

    })()

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

const sendMessageToContent = (id?:string|number,runPrompt?: boolean) => {

  let needToRunPrompt = runPrompt
  let actionId = id;
  if (needToRunPrompt === undefined) {
    needToRunPrompt = true
  }
  if(actionId===undefined){
    actionId = ''
  }

  if(actionId==='3'){
    // Summarize
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {

      const activeTab = tabs[0]
      let tID = activeTab.id ?? -1
  
      if (activeTab && activeTab.id !== undefined) {
  
        let b = browser.tabs.sendMessage(tID, { type: 'summarize'})
  
      }
  
  
    })

    return;
  
  }

  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {

    const activeTab = tabs[0]
    let tID = activeTab.id ?? -1

    if (activeTab && activeTab.id !== undefined) {

      let b = browser.tabs.sendMessage(tID, { type: 'open-scouter',actionId:actionId, runPrompt: needToRunPrompt })

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