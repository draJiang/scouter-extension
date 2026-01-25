import browser from 'webextension-polyfill'
import { createApi } from 'unsplash-js';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

import { v4 as uuidv4 } from 'uuid';

import { userInfoType, aiParameterType, BackgroundToPopup, BodyType, MessageForGPTType, MessageForGPTWebType } from './types'

import { getSettings } from './Options/util'
import ISO6391 from 'iso-639-1';


import { lang } from './lib/lang'

import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'



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

// 获取词典数据
export const getDictionaryData = async (keyWord: string): Promise<string> => {

  // 获取用户语言
  const Settings = await getSettings()
  const targetLanguage = Settings.targetLanguage

  // 获取词典数据
  let url = new URL('https://dict.youdao.com/jsonapi');
  let params = {
    xmlVersion: '5.1',
    le: ISO6391.getCode(targetLanguage),
    q: keyWord
  };

  url.search = new URLSearchParams(params).toString();
  const ErrorMsg = '🥲 Sorry, No Results Found for this Word.';
  // const ErrorResult = { 'type': 'sendGPTData', 'status': 'error', 'content': ErrorMsg, 'chatId': '' };

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return ErrorMsg;
      }
      return response.json(); // 返回一个包含响应数据的 JSON 对象
    })
    .then(data => {
      let msg = '';

      switch (targetLanguage) {
        case 'Spanish':
          if ('multle' in data) {
            msg = keyWord + ' /' + data.multle.word[0].phone + '/' + '\n' + data.multle.word[0].trs[0].tr[0].l.i[0];
          } else if ('fanyi' in data) {
            msg = data.fanyi.tran;
          }

          if ('multle' in data || 'fanyi' in data) {
            return msg;
          } else {
            return ErrorMsg;
          }
        case 'French':
          if ('fc' in data) {
            msg = keyWord + ' /' + data.fc.word[0].phone + '/' + '\n' + data.fc.word[0].trs[0].tr[0].l.i[0];
          } else if ('fanyi' in data) {
            msg = data.fanyi.tran;
          }

          if ('fc' in data || 'fanyi' in data) {
            return msg;
          } else {
            return ErrorMsg;
          }
        case 'Japanese':
          if ('jc' in data) {
            msg = keyWord + ' /' + data.jc.word[0]["return-phrase"].l.i + '/' + '\n' + data.jc.word[0].trs[0].tr[0].l.i[0];
            return msg;
          } else if ('fanyi' in data) {
            msg = data.fanyi.tran;
            return msg;
          } else if ('jaTransPjm' in data) {
            msg = data.jaTransPjm.fanyi.tran;
            return msg;
          }
          else if ('newjc' in data) {
            msg = data.newjc.word.sense[0].phrList[0].jmsy;
            return msg;
          } else {
            return ErrorMsg;
          }

          break;

        default:
          // English
          if ('ec' in data) {
            msg = keyWord + ' /' + data.ec.word[0].usphone + '/' + '\n' + data.ec.word[0].trs[0].tr[0].l.i[0];
          } else if ('fanyi' in data) {
            msg = data.fanyi.tran;
          }

          if ('ec' in data || 'fanyi' in data) {
            return msg;
          } else {
            return ErrorMsg;
          }
          break;
      }



    })
    .catch(error => {
      console.log(error);
      return ErrorMsg
    });
}

// AI 绘图
export function generationsImages(prompt: string) {

  return new Promise((resolve, reject) => {

    getAIParameter([]).then((result) => {

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

          if (!response.ok) {
            resolve({ 'succeeded': false, 'data': {} })
          }

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
                      resolve({ 'succeeded': true, 'data': data.result })
                      clearInterval(intervalId); // 任务成功时清除轮询
                    }

                    if (data.status === 'failed') {
                      //生成图片失败
                      resolve({ 'succeeded': false, 'data': data.error })
                      clearInterval(intervalId); // 任务成功时清除轮询
                    }
                  });
              }, 1000);

            } else {

              if ('error' in data) {
                resolve({ 'succeeded': false, 'data': data.error })
              } else {
                resolve({ 'succeeded': true, 'data': data })
              }


            }


          })
        }).catch((error) => {

          console.log(error);
          resolve({ 'succeeded': false, 'data': error })

        })

      }



    })

  })

}

export function getAIParameter(messages: MessageForGPTType[]): Promise<aiParameterType> {

  return new Promise((resolve, reject) => {

    const defaultOpenApiEndpoint = 'https://api.openai.com'

    getSettings().then((result) => {

      const apiKeySelection = result.apiKeySelection
      const licenseKey = result.licenseKey
      let openApiKey = result.openApiKey
      const currentLanguage = result.currentLanguage
      const targetLanguage = result.targetLanguage
      const model = result.model
      const customizeApiModel = result.openApiModel.replace(/ /g, '');
      const freeModel = result.freeModel

      let openApiEndpoint: string = result.openApiEndpoint

      if (openApiEndpoint.length < 5) {
        openApiEndpoint = defaultOpenApiEndpoint
      }

      let headers = {}
      let body: BodyType
      let imgOpenApiEndpoint = ''

      switch (apiKeySelection) {
        case 'scouterFreeAI':
          // scouter 提供的免费 AI
          openApiEndpoint = 'https://openrouter.ai/api/v1/chat/completions'
          imgOpenApiEndpoint = 'https://openrouter.ai/api/v1/images/generations'
          openApiKey = licenseKey
          headers = {
            'Authorization': 'Bearer ' + process.env.FREE_AI_KEY,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://notes.dabing.one/', // To identify your app
            'X-Title': 'ScouterFreeAI'
          }
          body = {
            "model": freeModel,
            "messages": messages,
            "temperature": 0.7,
            "max_tokens": 620,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 2,
            "stream": true
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

          break;

        case 'licenseKey':
          // openrouter

          openApiKey = licenseKey

          if (openApiKey.length < 5) {
            resolve({
              'result': 'failure',
              'apiKeySelection': apiKeySelection,
              'data': null
            })
          }

          openApiEndpoint = 'https://openrouter.ai/api/v1/chat/completions'
          imgOpenApiEndpoint = 'https://openrouter.ai/api/v1/images/generations'

          headers = {
            'Authorization': 'Bearer ' + openApiKey,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://notes.dabing.one/', // To identify your app
            'X-Title': 'Scouter'
          }
          body = {
            "model": model,
            "messages": messages,
            "temperature": 0.7,
            "max_tokens": 620,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 2,
            "stream": true
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

          break;

        case 'ollama':
          headers = { 'Content-Type': 'application/json', }
          openApiEndpoint = result.ollamaApiEndpoint
          // 去除端点末尾的 \ 符号
          if (openApiEndpoint.slice(-1) === "/") {
            openApiEndpoint = openApiEndpoint.slice(0, -1);
          }

          imgOpenApiEndpoint = ''
          openApiEndpoint += '/api/chat'

          body = {
            "model": result.ollamaModel,
            "messages": messages,
            // "temperature": 0.7,
            // "max_tokens": 620,
            // "top_p": 1,
            // "frequency_penalty": 0,
            // "presence_penalty": 2,
            // "stream": true
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

          break;

        case 'myOwnOpenAiKey':
          //  用户自定义 API

          if (openApiKey.length < 5) {
            resolve({
              'result': 'failure',
              'apiKeySelection': apiKeySelection,
              'data': null
            })
          }

          if (openApiEndpoint.indexOf('azure.com') > -1) {

            // Azure
            // 'https://YOURDEPLOYMENTS.openai.azure.com/openai/deployments/YOURDEPLOYMENTS/chat/completions?api-version=2023-03-15-preview'
            const stringList = openApiEndpoint.split('/openai/')
            imgOpenApiEndpoint = stringList[0] + '/openai/' + 'images/generations:submit?api-version=2023-06-01-preview'

            headers = { 'api-key': openApiKey, 'Content-Type': 'application/json', }
            body = {
              "model": customizeApiModel,
              "messages": messages,
              "temperature": 0.7,
              "max_tokens": 620,
              "top_p": 1,
              "frequency_penalty": 0,
              "presence_penalty": 2,
              "stream": true
            }

          } else if (openApiEndpoint.indexOf('api.pawan.krd') > -1) {

            // pawan
            let model = 'pai-001'
            const regex = /\/\/[^\/]+\/([^\/]+)\//;
            const match = openApiEndpoint.match(regex);
            if (match) { model = match[1] }

            headers = { 'Authorization': 'Bearer ' + openApiKey, 'Content-Type': 'application/json', }

            // 去除 v1 符号
            openApiEndpoint = openApiEndpoint.replace('v1', '')

            // 去除端点末尾的 \ 符号
            if (openApiEndpoint.slice(-1) === "/") {
              openApiEndpoint = openApiEndpoint.slice(0, -1);
            }

            imgOpenApiEndpoint = openApiEndpoint + '/v1/images/generations'
            openApiEndpoint += '/v1/chat/completions'

            body = {
              "model": model,
              "messages": messages,
              "temperature": 0.7,
              "max_tokens": 620,
              "top_p": 1,
              "frequency_penalty": 0,
              "presence_penalty": 2,
              "stream": true
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

          } else {

            // OpenAI
            headers = { 'Authorization': 'Bearer ' + openApiKey, 'Content-Type': 'application/json', }

            // // 去除端点末尾的 \ 符号
            // if (openApiEndpoint.slice(-1) === "/") {
            //   openApiEndpoint = openApiEndpoint.slice(0, -1);
            // }

            // imgOpenApiEndpoint = openApiEndpoint + '/v1/images/generations'
            // if(openApiEndpoint.indexOf('/chat/completions')< 0){
            //   //如果 URL 中没有包含后缀，则自动添加
            //   openApiEndpoint += '/v1/chat/completions';
            // }

            body = {
              "model": customizeApiModel,
              "messages": messages,
              "temperature": 0.7,
              "max_tokens": 620,
              "top_p": 1,
              "frequency_penalty": 0,
              "presence_penalty": 2,
              "stream": true
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

          break

        default:
          // chatGPT Web
          // 获取 token
          getChatGPTWebToken().then(token => {

            const newMessages: MessageForGPTWebType = messages.map((item: { role: string, content: string }) => {
              return {
                id: uuidv4(),
                role: item.role,
                content: {
                  content_type: 'text',
                  parts: [item.content],
                },
              }
            })

            openApiEndpoint = 'https://chat.openai.com/backend-api/conversation'
            imgOpenApiEndpoint = 'https://openrouter.ai/api/v1/images/generations'

            headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }

            body = {
              action: 'next',
              messages: newMessages,
              model: 'text-davinci-002-render-sha',
              parent_message_id: uuidv4(),
              history_and_training_disabled: true,
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

          }).catch(error => {
            // 错误处理
            reject(error + ' Please Ensure that You Are Logged into [ChatGPT](https://chat.openai.com/).')

          });



          break;
      }


    })

  })

}

export async function getChatGPTWebToken() {

  console.log('getChatGPTWebToken');

  return new Promise((resolve, reject) => {
    browser.storage.local.get(['authData']).then(async (result) => {

      const authData = result.authData;

      const now = new Date().getTime();

      if (authData && authData.token && authData.expiry && authData.expiry > now) {
        resolve(authData.token);
      } else {
        try {

          // const response = await fetch('https://chat.openai.com/api/auth/session');

          // if (!response.ok) {
          //   reject("Couldn't fetch the token");
          //   throw new Error("Couldn't fetch the token");
          // }
          // const data = await response.json();
          // if ('accessToken' in data !== true) {
          //   reject("Couldn't fetch the token");
          // }

          // const updatedAuthData = {
          //   token: data.accessToken,
          //   expiry: Date.parse(data.expires)
          // }

          // browser.storage.local.set({ authData: updatedAuthData }).then(() => {
          //   resolve(updatedAuthData.token);
          // })


          getChatGPTSession().then(token => {
            resolve(token);
          }).catch(error => {
            reject(error);
          });




        } catch (error) {
          reject(error);
        }
      }

    })


  });
}





// 获取 Anki 的 Deck 名称，添加到卡片会存放到这里
export function getDefaultDeckName(): Promise<{ defaultDeckName: string }> {
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


export const playTextToSpeech = (text: string, voice: string, targetLanguage: string) => {

  if (navigator.userAgent.indexOf('Firefox') >= 0) {

    const audioUrl = (lang as any)[targetLanguage]['audioURL']
    let audio = new Audio(audioUrl + text);
    audio.addEventListener('loadeddata', (event) => {
      audio.play();
    });

  } else {

    const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_TTS_API_KEY as string, process.env.AZURE_TTS_SPEECH_REGION as string);
    speechConfig.speechSynthesisVoiceName = voice;
    speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz128KBitRateMonoMp3;



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
        synthesizer.close();
      }
    );


  }

};


export const textToSpeechDownload = (text: string, voice: string) => {

  const pullStream = sdk.AudioOutputStream.createPullStream();

  const audioConfig = sdk.AudioConfig.fromStreamOutput(pullStream);
  const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_TTS_API_KEY!, process.env.AZURE_TTS_SPEECH_REGION!);

  speechConfig.speechSynthesisVoiceName = voice;
  speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz128KBitRateMonoMp3;

  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  synthesizer.speakTextAsync(
    text,
    async function (result) {
      synthesizer.close();
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        let allChunks = [];
        let chunk;
        do {
          const audioBuffer = new ArrayBuffer(16000);
          const chunkCount = await pullStream.read(audioBuffer);
          chunk = audioBuffer.slice(0, chunkCount);
          if (chunkCount > 0) {
            allChunks.push(chunk);
          }
        } while (chunk.byteLength > 0);
        let blob = new Blob(allChunks, { 'type': 'audio/mp3' });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = `Audio_${new Date().getTime()}.mp3`;
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error(`TTS Failed: ${result.errorDetails}`);
      }
      pullStream.close();
    },
    function (error) {
      console.error(`TTS Failed: ${error}`);
      synthesizer.close();
      pullStream.close();
    }
  );
};

export const getChatGPTSession = async () => {
  // const URL = 'https://chat.openai.com/api/auth/session'
  // try {
  //   const response = await fetch(URL);
  //   // 可能需要处理除200外的其他状态码：
  //   if (!response.ok) {
  //     throw new Error(`HTTP error, status = ${response.status}`);
  //   }
  //   // 假设服务器返回了JSON格式的响应体：
  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error(`Failed to fetch session: ${error}`);
  //   throw error; // 或者返回一个默认的/错误的结果
  // }


  const response = await fetch('https://chat.openai.com/api/auth/session');

  if (!response.ok) {
    return "Couldn't fetch the token";
    throw new Error("Couldn't fetch the token");
  }
  const data = await response.json();
  if ('accessToken' in data !== true) {
    return "Couldn't fetch the token"
  }

  const updatedAuthData = {
    token: data.accessToken,
    expiry: Date.parse(data.expires)
  }

  browser.storage.local.set({ authData: updatedAuthData }).then(() => {
    return updatedAuthData.token
  })


}


type SSEDataOptions = {
  onMessage?(data: any): void;
  onEnd?(): void;
  onError?(error: Error): void;
};

export const fetchSSE = async (url: string, requestInit: RequestInit, options: SSEDataOptions, apiType?: string) => {
  const { onMessage, onEnd, onError } = options;

  try {

    const response = await fetch(url, requestInit);

    if (!response.ok) {
      onError && onError(new Error(`HTTP error, status = ${response.status}`));
      return;
    }

    const parser = createParser((event) => {

      if (event.type === 'event') {
        try {
          if (event.data !== '[DONE]') {
            const data = JSON.parse(event.data);

            onMessage && onMessage(data);
          }
        } catch {
          onError && onError(new Error('Failed to parse SSE event data'));
        }
      }
    });

    const reader = response.body?.getReader();
    if (reader !== undefined) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            onEnd && onEnd();
            break;
          }
          const str = new TextDecoder().decode(value);

          if (apiType === 'ollama') {
            let contents = ''
            const jsonStrings = str.trim().split('\n');
            jsonStrings.forEach(jsonStr => {
              try {
                // 解析每个 JSON 字符串成为一个对象
                const jsonObject = JSON.parse(jsonStr);
                if (jsonObject.message && jsonObject.message.content) {
                  contents += jsonObject.message.content;
                }
              } catch (error) {
                console.error("Parsing error:", error);
                // 处理解析错误，例如打印错误日志
              }
            });

            onMessage && onMessage(contents);
          } else {
            parser.feed(str);
          }


        }
      } finally {
        reader.releaseLock();
      }
      parser.reset();
    }

  } catch (error) {
    onError && onError(new Error(`Fetch request failed: ${error}`));
  }
}



// export const playTextToSpeech = async (text: string, voice: string) => {
//   const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_TTS_API_KEY as string, process.env.AZURE_TTS_SPEECH_REGION as string);
//   speechConfig.speechSynthesisVoiceName = voice;
//   speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Riff16Khz16BitMonoPcm;

//   const synthesizer = new sdk.SpeechSynthesizer(speechConfig, undefined);

//   await new Promise((resolve, reject) => {
//     synthesizer.speakTextAsync(
//       text,
//       function (result) {
//         if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
//           const audio = new Audio(URL.createObjectURL(new Blob([result.audioData])));
//           audio.play();
//           resolve(true);
//         } else {
//           reject(
//             'Speech synthesis canceled, ' + result.errorDetails + '\nDid you set the speech resource key and region values?'
//           );
//         }
//       },
//       function (err) {
//         reject('err - ' + err);
//       }
//     );
//   }).finally(() => {
//     synthesizer.close();
//   });
// };


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

const checkLicenseKey = async (key: string) => {

  console.log('checkLicenseKey from lemonsqueezy:');

  let verified = false

  // 从 Lemonsqueezy 验证 Key
  const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      license_key: key,
    })
  });
  const data = await response.json(); // 可以使用这个来进行额外的操作
  verified = data.valid

  console.log(verified);


  if (!verified) {

    console.log('checkLicenseKey from dabing:');

    const res = await fetch('https://api.scouter.dabing.one/api/checktLicenseKey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: key,
      })
    });

    const data = await res.json();
    verified = data.verified

    if (!res.ok) {
      throw new Error(data.message);
    }

  }

  console.log(verified);
  return verified


}

export const getUserInfo = (): Promise<userInfoType> => {
  console.log('getUserInfo');

  return new Promise((resolve, reject) => {

    getSettings().then(async (result) => {


      if (browser.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }

      let verified = false

      if (result.newLicenseKey) {
        console.log('result.newLicenseKey:');
        console.log(true);

        verified = await checkLicenseKey(result.newLicenseKey)
        console.log('getUserInfo result:');
        console.log(verified);

      }

      // 获取用户 ID
      let uniqueId: string

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

      const response = {
        'userId': uniqueId!,
        'verified': verified,
        'contextMenu': result.contextMenu,
        'contextMenuBlackList': result.contextMenuBlackList,
        'showYoutubeButton': result.showYoutubeButton, 'contentEditable': result.contentEditable
      }
      console.log('response:');
      console.log(response);

      resolve(response)

    })


  });

};

// interface Dictionary {
//   [key: string]: any;
// }

// interface NoteFields {
//   note: string;
//   fields: Dictionary;
// }

export function handleAnkiDynamicVariable(
  fields: Record<string, string>[],
  dynamicVariable: { Selection: string, Sentence: string, Content: string, Audio: any, Image: string, Source: string, Title: string, Description: string, Url: string }
) {

  let audioFields: string[] = []
  const f = fields
  console.log('f:');
  console.log(f);

  // const newFields = f.map(((obj: Record<string, string>, index) => {
  //   return Object.keys(obj).reduce((newObj: Record<string, string>, key) => {
  //     // 处理哪些 field 需要显示 audio
  //     if (obj[key].indexOf('{{Audio}}') > -1) {
  //       audioFields.push(key);
  //     }

  //     newObj[key] = obj[key].replace(/{{Selection}}/g, dynamicVariable.Selection)
  //       .replace(/{{Sentence}}/g, `<blockquote>${dynamicVariable.Sentence}</blockquote>`)
  //       .replace(/{{Audio}}/g, '')
  //       .replace(/{{Definition}}/g, dynamicVariable.Content)
  //       .replace(/{{Image}}/g, dynamicVariable.Image)
  //       .replace(/{{Source}}/g, dynamicVariable.Source);
  //     return newObj; // Return the accumulator
  //   }, {} as Record<string, string>); // Initialize as an empty object
  // }), {});

  const newFields = f.reduce((accumulator: Record<string, string>, obj: Record<string, string>) => {

    Object.keys(obj).forEach((key) => {
      // 处理哪些 field 需要显示 audio
      if (obj[key].indexOf('{{Audio}}') > -1) {
        audioFields.push(key);
      }
      // 替换模板变量
      accumulator[key] = obj[key]
        .replace(/{{Selection}}/gi, dynamicVariable.Selection)
        .replace(/{{Sentence}}/gi, `<blockquote>${dynamicVariable.Sentence}</blockquote>`)
        .replace(/{{Audio}}/gi, '')
        .replace(/{{Definition}}/gi, dynamicVariable.Content)
        .replace(/{{Image}}/gi, dynamicVariable.Image)
        .replace(/{{Title}}/gi, dynamicVariable.Title)
        .replace(/{{Description}}/gi, dynamicVariable.Description)
        .replace(/{{Url}}/gi, `<a href="${dynamicVariable.Url}">${dynamicVariable.Url}</a>`);


    })

    return accumulator; // 返回累加器

  }, {} as Record<string, string>)

  return ({ fields: newFields, audioFields: audioFields })

  // const newFields2 = Object.keys(f).reduce((newObj: Record<string, string>, key:string) => {
  //   // 处理哪些 field 需要显示 audio
  //   if (f[key].indexOf('{{Audio}}') > -1) {
  //     audioFields.push(key)
  //   }

  //   newObj[key] = f[key].replace(/{{Selection}}/g, dynamicVariable.Selection)
  //     .replace(/{{Sentence}}/g, `<blockquote>${dynamicVariable.Sentence}</blockquote>`)
  //     .replace(/{{Audio}}/g, '')
  //     .replace(/{{Definition}}/g, dynamicVariable.Content)
  //     .replace(/{{Image}}/g, dynamicVariable.Image)
  //     .replace(/{{Source}}/g, dynamicVariable.Source)
  //   return newObj;
  // }, {});

  // return ({ fields: newFields, audioFields: audioFields })

}


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
