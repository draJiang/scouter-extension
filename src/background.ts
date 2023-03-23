// function polling() {
//   console.log("polling");
//   setTimeout(polling, 1000 * 30);
// }

// polling();

chrome.runtime.onInstalled.addListener(function () {
  console.log("插件已被安装");

  // 创建右键菜单
  chrome.contextMenus.create({
    id: "1",
    title: "Test Context Menu",
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

  // 存储 Open API Key

  // 读取 Open API Key

});
