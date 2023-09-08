import browser from 'webextension-polyfill'
import { createApi } from 'unsplash-js';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

import { v4 as uuidv4 } from 'uuid';

import { userInfoType, aiParameterType } from './types'

import { getSettings } from './Options/util'




// 将信息添加到 Anki
export function ankiAction(action: any, version: any, params = {}) {
  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:8765', {
      method: "POST",
      body: JSON.stringify({ "action": action, "version": version, "params": params })
    }).then(response => response.json()).then((data) => {

      // console.log(data);
      resolve(data)

    }).catch((error) => {
      console.log('util');
      reject({ 'result': [], 'error': 'Please open the Anki client and install the Anki-Connect plugin before trying again.' })
    })

  });
}

// 在 unsplash 中搜索照片
export function unsplashSearchPhotos(API_KEY: string, query: string) {
  return new Promise((resolve, reject) => {
    const unsplash = createApi({
      accessKey: API_KEY,
    });

    unsplash.search.getPhotos({
      query: query,
    }).then((data) => {
      // console.log(data);

      if (data.response?.results.length === 0) {
        resolve([]);
      } else {

        resolve(data.response?.results);

      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export function generationsImages(prompt: string) {

  console.log('generationsImages');


  return new Promise((resolve, reject) => {

    getAIParameter().then((result) => {



      const openApiEndpoint = result.data?.imagesGenerations.url



      if (!result.data || openApiEndpoint === undefined) {

      } else {

        // 使用 open router 和 aiproxy 服务时无法获取图片
        if (result.apiKeySelection === 'licenseKey' || openApiEndpoint?.indexOf('api.aiproxy') >= 0) {
          resolve({ 'succeeded': false, data: [] })
        }

        const body = {
          "prompt": prompt,
          "n": 2,
          "size": "512x512"
        }

        const headers = result.data.imagesGenerations.headers

        fetch(openApiEndpoint!, {
          method: "POST",
          body: JSON.stringify(body),
          headers: headers

        }).then(async (response) => {
          response.json().then((data) => {

            if (data.status === "notRunning") {

              // azure

              const stringList = openApiEndpoint.split('/openai/')
              const url = stringList[0] + '/openai/' + 'operations/images/' + data.id + '?api-version=2023-06-01-preview'


              const intervalId = setInterval(() => {
                fetch(url, {
                  method: "GET",
                  headers: headers
                })
                  .then(response => response.json())
                  .then(data => {
                    if (data.status === 'succeeded') {
                      resolve({'succeeded':true,'data':data.result})
                      clearInterval(intervalId); // 任务成功时清除轮询
                    }
                  });
              }, 1000);

            } else {

              resolve({'succeeded':true,'data':data})

            }


          })
        }).catch((error) => {

          console.log(error);

        })

      }



    })

  })

}

export function getAIParameter(): Promise<aiParameterType> {

  return new Promise((resolve, reject) => {

    const defaultOpenApiEndpoint = 'https://api.openai.com'

    getSettings().then((result) => {

      const apiKeySelection = result.apiKeySelection
      const licenseKey = result.licenseKey
      let openApiKey = result.openApiKey
      const currentLanguage = result.currentLanguage
      const targetLanguage = result.targetLanguage
      const model = result.model

      let openApiEndpoint: string = result.openApiEndpoint

      if (openApiKey.length < 5 && licenseKey.length < 5) {
        // port.postMessage({ 'type': 'sendGPTData', 'status': 'erro', 'code': 'invalid_api_key', 'content': '🥲 API Key error. Please modify and try again..' })

        resolve({
          'result': 'failure',
          'apiKeySelection': apiKeySelection,
          'data': null
        })

      }

      if (openApiEndpoint.length < 5) {
        openApiEndpoint = defaultOpenApiEndpoint
      }


      let headers = {}
      let body
      let imgOpenApiEndpoint = ''

      // 优先使用自己的 Key
      if (apiKeySelection === 'licenseKey') {

        // 使用许可证
        openApiEndpoint = 'https://openrouter.ai/api/v1/chat/completions'
        imgOpenApiEndpoint = 'https://openrouter.ai/api/v1/images/generations'
        openApiKey = licenseKey
        headers = {
          'Authorization': 'Bearer ' + openApiKey,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://notes.dabing.one/', // To identify your app
          'X-Title': 'Scouter'
        }
        body = {
          "model": model,
          "messages": [],
          "temperature": 0.7,
          "max_tokens": 420,
          "top_p": 1,
          "frequency_penalty": 0,
          "presence_penalty": 2,
          "stream": true
        }

      } else {

        // 使用用户自己的 Key

        if (openApiEndpoint.indexOf('azure.com') > -1) {

          // Azure
          // 'https://YOURDEPLOYMENTS.openai.azure.com/openai/deployments/YOURDEPLOYMENTS/chat/completions?api-version=2023-03-15-preview'
          const stringList = openApiEndpoint.split('/openai/')
          imgOpenApiEndpoint = stringList[0] + '/openai/' + 'images/generations:submit?api-version=2023-06-01-preview'

          headers = { 'api-key': openApiKey, 'Content-Type': 'application/json', }
          body = {
            "model": "gpt-35-turbo",
            "messages": [],
            "temperature": 0.7,
            "max_tokens": 420,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 2,
            "stream": true
          }

        } else {

          // OpenAI
          headers = { 'Authorization': 'Bearer ' + openApiKey, 'Content-Type': 'application/json', }

          // 去除端点末尾的 \ 符号
          if (openApiEndpoint.slice(-1) === "/") {
            openApiEndpoint = openApiEndpoint.slice(0, -1);
          }

          imgOpenApiEndpoint = openApiEndpoint + '/v1/images/generations'
          openApiEndpoint += '/v1/chat/completions'


          body = {
            "model": "gpt-3.5-turbo",
            "messages": [],
            "temperature": 0.7,
            "max_tokens": 420,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 2,
            "stream": true
          }

        }

      }

      resolve({
        'result': 'success',
        'apiKeySelection': apiKeySelection,
        'data': {
          'chatCompletions': {
            'url': openApiEndpoint,
            'headers': headers,
            'body': body
          },
          'imagesGenerations': {
            'url': imgOpenApiEndpoint,
            'headers': headers,
          }
        }

      })

    })

  })

}

// 获取 Anki 的 Deck 名称，添加到卡片会存放到这里
export function getDefaultDeckName() {
  return new Promise((resolve, reject) => {

    let defaultDeckName = ''

    // 获取用户设置的 Deck Name
    browser.storage.sync.get(["ankiDeckName"]).then(async (result) => {
      // console.log('result:');
      // console.log(result);

      if (result.ankiDeckName) {
        // 用户有设置


        defaultDeckName = result.ankiDeckName
      } else {
        // 用户未设置
        // 获取 Anki 的牌组列表
        defaultDeckName = await ankiAction('deckNames', 6).then((result: any) => {

          // 将第一个牌组作为默认牌组
          return result.result[0]


        }).catch((error) => {

          // console.log(error);
          return ''

        })

      }

      resolve({ 'defaultDeckName': defaultDeckName })

    })

  })



}


export const playTextToSpeech = (text: string, voice: string) => {

  const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
  const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_TTS_API_KEY as string, process.env.AZURE_TTS_SPEECH_REGION as string);
  speechConfig.speechSynthesisVoiceName = voice;

  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  synthesizer.speakTextAsync(
    text,
    function (result) {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        // console.log('synthesis finished.');
      } else {
        console.error(
          'Speech synthesis canceled, ' + result.errorDetails + '\nDid you set the speech resource key and region values?'
        );
      }
      synthesizer.close();
    },
    function (err) {
      // console.trace('err - ' + err);
      synthesizer.close();
    }
  );

  // console.log('Now synthesizing...');

};

export const getBalance = (apiKey: string) => {
  return new Promise((resolve, reject) => {

    const url = 'https://openrouter.ai/api/v1/auth/key'
    const headers = { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json', }


    fetch(url, {
      headers: headers
    }).then((response) => {

      response.json().then((data) => {
        resolve(data)
      })


    })

  })

}

export const getUserInfo = (): Promise<userInfoType> => {

  return new Promise((resolve, reject) => {
    // chrome.storage.sync.get('userId', (result) => {
    //   if (chrome.runtime.lastError) {
    //     reject(chrome.runtime.lastError);
    //   }

    //   if (result.userId) {
    //     resolve(result.userId);
    //   } else {
    //     let uniqueId = uuidv4();
    //     chrome.storage.sync.set({ userId: uniqueId }, () => {
    //       if (chrome.runtime.lastError) {
    //         reject(chrome.runtime.lastError);
    //       } else {
    //         resolve(uniqueId);
    //       }
    //     });
    //   }
    // });

    browser.storage.sync.get(['userId', 'newLicenseKey']).then(async (result) => {

      if (browser.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }

      let verified = false

      if (result.newLicenseKey) {
        // 判断用户
        const url = 'https://6r4atckmdr.us.aircode.run/index'
        const headers = { 'Authorization': 'Bearer ' + result.newLicenseKey, 'Content-Type': 'application/json', }

        await fetch(url, {
          headers: headers
        }).then(async (response) => {

          await response.json().then((data) => {
            verified = data.verified
          })

        })
      }

      let uniqueId: string

      // 获取用户 ID
      if (result.userId) {
        uniqueId = result.userId;
      } else {
        uniqueId = uuidv4();
        browser.storage.sync.set({ userId: uniqueId }).then(() => {
          if (chrome.runtime.lastError) {
            reject(browser.runtime.lastError);
          } else {
            // resolve(uniqueId);
          }
        })

      }


      resolve({ 'userId': uniqueId!, 'verified': verified })

    })


  });

};

/* 卡片样式可能随着版本迭代不断更新，(删掉括号内的文字可以暂停自动更新) | Card styles may be updated with each version iteration, (deleting the text in the parentheses can pause the auto-update). */

export const cardStyle = `

  .card {
    font-family: arial;
    font-size: 18px;
    color: rgb(0 0 0 / 84%);
    background-color: white;
    text-align: left;
    line-height: 1.6;
  }

  blockquote {
    border-left: 5px solid #ccc;
    padding: 8px 16px;
    margin-left:0;
    margin-right:0;
		background-color: rgb(0 0 0 / 4%);
  }

  a {
    text-decoration: underline;
  }

  img {
    max-height: 320px;
  }

  .ankiSpace {
    color:#F08A24;
  }

  .keyWord {
    color:#F08A24;
  }

  table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin:0;
    padding:0;
    width: 100%;
  }

  table tr {
    border: 1px solid #ddd;
    padding: 5px;
  }

  table th, table td {
    padding: 10px;
    text-align: left;
  }

  table th {
    letter-spacing: 1px;
    text-transform: uppercase;
  }`