import browser from 'webextension-polyfill'
import { models, freeModels } from "./models"
import {AnkiInfoType} from "../types"

export async function getSettings() {
    let settings = await browser.storage.sync.get({
        "openApiKey": '',                                   // Open AI、Azure 等 API Key
        "openApiEndpoint": 'https://api.openai.com',        // Open AI、Azure 等端口的链接
        "openApiModel": 'gpt-4o-mini',                      // Open AI、Azure 等 API 选择的 Model
        "unsplashApiKey": '',                               // upsplansh 的 API Key
        "currentLanguage": 'Chinese Simplified',            // 当前语言
        "targetLanguage": 'United States',                  // 目标语言
        "ankiSettings":[],                                  // anki 设置
        "ankiDeckName": '',                                 // 默认的 Anki deck
        "ankiNoteName": '',                                 // 默认的 Anki note
        "ankiFields": [],                                   // 用户编辑的 Fields 设置
        "licenseKey": '',                                   // OpenRouter 的 API Key
        "showYoutubeButton": true,                          // 显示 YouTube 字幕的按钮
        "model": models[0]['id'],                           
        "freeModel": freeModels[0]['id'],                   // OpenRouter 的模型名称
        "apiKeySelection": 'scouterFreeAI',                 // 当前选择的 AI API 类型，有 Open AI、ollama 等选项
        "newLicenseKey": '',                                // Scouter Pro 版本激活码
        "contextMenu": false,                               // 是否显示划词后的上下文菜单
        "ollamaModel": 'llama2',                            // ollama 模型名称
        "ollamaApiEndpoint": 'http://localhost:11434',      // ollama 端口地址
        "userId": '',                                       // 用户 ID
        "contentEditable":false                             // Scouter 窗口中的内容能否编辑
    })

    let ankiSettings = settings.ankiSettings;
    // 如果 ankiSettings 为空则设置默认值
    if (settings.ankiSettings.length === 0) {
        ankiSettings = [
          {
            ankiDeckName: "Default",
            ankiFields: [
              { Front: "The default note is not editable" },
              { Back: `The default note is not editable` },
            ],
            ankiNoteName: "Scouter",
          },
          {
            ankiDeckName: "Default",
            ankiFields: [
              { Front: "The default note is not editable" },
              { Back: `The default note is not editable` },
            ],
            ankiNoteName: "Scouter Cloze Text",
          },
        ];

        if (settings.ankiDeckName !== "" && settings.ankiNoteName !== "") {
          // 如果存在历史旧数据，则保留旧数据
          const oldAnkiSettings = {
            ankiDeckName: settings.ankiDeckName,
            ankiFields: Object.entries(settings.ankiFields).map(
              ([key, value]) => ({ [key]: value })
            ),
            ankiNoteName: settings.ankiNoteName,
          };
          ankiSettings.unshift(oldAnkiSettings);
        }
      }
    settings.ankiSettings = [...ankiSettings]
    return settings
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

