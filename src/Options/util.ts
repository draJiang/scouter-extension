import browser from 'webextension-polyfill'
import { models } from "./models"

export async function getSettings() {
    let items = await browser.storage.sync.get({
        "openApiKey": '',
        "openApiEndpoint": 'https://api.openai.com',
        "unsplashApiKey": '',
        "currentLanguage": 'Chinese Simplified',
        "targetLanguage": 'United States',
        "ankiDeckName": '',
        "licenseKey": '',
        "model": models[0]['id'],
        "apiKeySelection": 'myOwnOpenAiKey',
        "newLicenseKey": '',
        "contextMenu": false,
        "ollamaModel": 'llama2',
        "ollamaApiEndpoint": 'http://localhost:11434'
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