import browser from 'webextension-polyfill'
import { models } from "./models"

export async function getSettings() {
    let items = await browser.storage.sync.get({
        "openApiKey": '',
        "openApiEndpoint": 'https://api.openai.com',
        "unsplashApiKey": '',
        "currentLanguage": 'Chinese Simplified',
        "targetLanguage": 'English',
        "ankiDeckName": '',
        "licenseKey": '',
        "model": models[0]['id'], "apiKeySelection": 'myOwnOpenAiKey',
        "newLicenseKey": ''
    })
    return items
}