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

export function getMp3() {
  // 创建 AudioContext 对象
  const audioContext = new AudioContext();

  // 创建一个空的缓冲区，用于存储音频数据
  const buffer = audioContext.createBuffer(1, 44100, 44100);

  // 获取缓冲区的数据
  const data = buffer.getChannelData(0);

  // 将字符串转换为音频数据
  const string = 'Hello, world!';
  for (let i = 0; i < string.length; i++) {
    data[i] = string.charCodeAt(i) / 65535 * 2 - 1;
  }

  // 创建一个 AudioBufferSourceNode 对象，将缓冲区作为参数传入
  const source = audioContext.createBufferSource();
  source.buffer = buffer;

  // 将 AudioBufferSourceNode 对象连接到 AudioContext 的 destination 属性
  source.connect(audioContext.destination);

  // 播放音频
  source.start();

  // 将音频导出为 MP3 文件
  // const encoder = new Mp3Encoder(1, 44100, 128);
  // const mp3Data = encoder.encodeBuffer(buffer.getChannelData(0));
  // const blob = new Blob([mp3Data], { type: 'audio/mp3' });
  // const url = URL.createObjectURL(blob);
  // const link = document.createElement('a');
  // link.href = url;
  // link.download = 'audio.mp3';

}