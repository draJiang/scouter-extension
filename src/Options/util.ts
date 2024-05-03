import browser from 'webextension-polyfill'
import { models } from "./models"

export async function getSettings() {
    let items = await browser.storage.sync.get({
        "openApiKey": '',                                   // Open AI、Azure 等 API Key
        "openApiEndpoint": 'https://api.openai.com',        // Open AI、Azure 等端口的链接
        "unsplashApiKey": '',                               // upsplansh 的 API Key
        "currentLanguage": 'Chinese Simplified',            // 当前语言
        "targetLanguage": 'United States',                  // 目标语言
        "ankiDeckName": '',                                 // 默认的 Anki deck
        "licenseKey": '',                                   // OpenRouter 的 API Key
        "showYoutubeButton": false,                         // 显示 YouTube 字幕的按钮
        "model": models[0]['id'],                           // OpenRouter 的模型名称
        "apiKeySelection": 'myOwnOpenAiKey',                // 当前选择的 AI API 类型，有 Open AI、ollama 等选项
        "newLicenseKey": '',                                // Scouter Pro 版本激活码
        "contextMenu": false,                               // 是否显示划词后的上下文菜单
        "ollamaModel": 'llama2',                            // ollama 模型名称
        "ollamaApiEndpoint": 'http://localhost:11434'       // ollama 端口地址
    })
    return items
}

export async function saveOptions(values: any) {
    // 获取键值对
    const entries = Object.entries(values);

    // 遍历键值对
    for (const [key, value] of entries) {

        console.log(`Key: ${key}, Value: ${value}`);

        await browser.storage.sync.set(
            {
                [key]: value,
            }
        )

    }

}