import browser from 'webextension-polyfill'
import { createApi } from 'unsplash-js';

// 将信息添加到 Anki
export function ankiAction(action: any, version: any, params = {}) {
  return new Promise((resolve, reject) => {
    fetch('http://127.0.0.1:8765', {
      method: "POST",
      body: JSON.stringify({ "action": action, "version": version, "params": params })
    }).then(response => response.json()).then((data) => {

      console.log(data);
      resolve(data)

    }).catch((error) => {
      console.log('error');
      console.log(error);
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
      console.log(data);

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
      console.log('result:');
      console.log(result);

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

          console.log(error);
          return ''

        })

      }

      resolve({ 'defaultDeckName': defaultDeckName })

    })

  })



}