import browser from 'webextension-polyfill'
import { createApi } from 'unsplash-js';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

import { v4 as uuidv4 } from 'uuid';

import { userInfoType } from './types'




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