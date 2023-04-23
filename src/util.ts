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
            reject({'result':[],'error':'Please open the Anki client and install the Anki-Connect plugin before trying again.'})
          })

    });
}

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
          const imageUrl = data.response?.results[0].urls.regular
          // chrome.tabs.create({ url: imageUrl });
          resolve(data.response?.results);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }