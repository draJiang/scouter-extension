import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'

chrome.runtime.onInstalled.addListener(function () {
  console.log("插件已被安装");

  // 创建右键菜单
  chrome.contextMenus.create({
    id: "1",
    title: "Scouter",
    contexts: ["selection"],
  });

  // 右键菜单点击事件
  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    console.log("My Context Menu was clicked!");

    // 发送消息给 content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            say: "sendMessage hello From background"
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });

  });


  chrome.runtime.onConnect.addListener(port => {
    console.log('连接中------------')

    // 接收 content script 的消息
    port.onMessage.addListener(msg => {
      console.log('接收消息：', msg)

      if (msg.type === 'getGPTMsg') {
        // 请求  GPT 数据
        chrome.storage.sync.get(["openApiKey"]).then((result) => {
          console.log(result);


          fetch('https://api.openai.com/v1/chat/completions', {

            method: "POST",
            body: JSON.stringify({
              "model": "gpt-3.5-turbo",
              "messages": [{"role": "system", "content": "You are an English teacher. Please answer questions about English grammar and vocabulary in Chinese.."},{ "role": "user", "content": msg.prompt }],
              "temperature": 0,
              "top_p": 0.52,
              "frequency_penalty": 0.87,
              "presence_penalty": 0.3,
              "stream": true
            }),
            headers: { 'Authorization': 'Bearer ' + result.openApiKey, 'Content-Type': 'application/json', }

          }).then(async (response) => {

            console.log('response:');
            console.log(response);
            console.log(response.status);
            console.log(response.status === 401);

            port.postMessage({'status':'begin','content':''})

            if (response.status === 401) {
              // API KEY Error
              console.log('401');
              port.postMessage({'status':'erro','content':'API Key Error'})
              return
            }

            // 处理 server-sent events
            const parser = createParser((event) => {
              if (event.type === 'event') {
                // console.log('createParser:');
                try {
                  console.log(JSON.parse(event.data)['choices'][0]['delta']['content']);
                  let new_msg = JSON.parse(event.data)['choices'][0]['delta']['content']
                  if (new_msg !== undefined) {

                    // 渲染内容
                    port.postMessage({'status':'process','content':JSON.parse(event.data)['choices'][0]['delta']['content']})
                    console.log(JSON.parse(event.data)['choices'][0]['delta']['content']);


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

                  if (done) {
                    console.log('Done');
                    port.postMessage({'status':'end','content':''})
                    break

                  }

                  const str = new TextDecoder().decode(value)
                  parser.feed(str)


                }
              } finally {
                reader.releaseLock()
              }
              parser.reset()
            }


          })
            .catch((error) => {
              console.log('error');
              console.log(error);
              //
              port.postMessage({'status':'erro','content':'🥲 Something Error'})

            })

        })

      }

      port.postMessage('popup，我收到了你的信息~')
    })
  })

});
