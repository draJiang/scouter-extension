import browser from 'webextension-polyfill'
import { userInfoType, AnkiInfoType } from '../types'
import { dictionaryPrompt } from './PopupCard/util'
import { cardStyle } from '../util'

// 获取用户信息
export const thisGetUserInfo = async () => {

    try {
        console.log('get USER_INFO========');

        // 获取用户信息
        const USER_INFO = await browser.runtime.sendMessage({ 'type': 'getUserInfo', 'messages': {}, })
        const showYoutubeButton = USER_INFO.showYoutubeButton
        console.log('showYoutubeButton:');
        console.log(showYoutubeButton);
        console.log('USER_INFO:');
        console.log(USER_INFO);

        console.log('get USER_INFO======== end');

        // 在上下文菜单中最近执行的 Prompt
        const result = await browser.storage.local.get({ "executedPromptHistoryInToolBar": [dictionaryPrompt] })
        const executedPromptHistoryInToolBar = result.executedPromptHistoryInToolBar

        return {
            userInfo: USER_INFO,
            showYoutubeButton: showYoutubeButton,
            executedPromptHistoryInToolBar: executedPromptHistoryInToolBar
        }

    } catch (error) {

        console.log(error);
        return null
    }


}

// 获取 Anki 信息
export const setAnkiInfo = async () => {

    let ANKI_INFO: AnkiInfoType = { defaultDeckName: '', decks: [], models: [] }

    // 获取 Anki decks
    const decks = await browser.runtime.sendMessage({ 'type': 'ankiAction', 'messages': { 'anki_action_type': 'deckNames', 'anki_arguments': {} }, })
    ANKI_INFO.decks = decks.result

    // 获取 Anki models 和默认的 Deck 名称
    const modelsAndDeck = await browser.runtime.sendMessage({ 'type': 'setModel', 'messages': {}, })
    ANKI_INFO.models = modelsAndDeck.data.modelData
    ANKI_INFO.defaultDeckName = modelsAndDeck.data.defaultDeckName

    // 更新 Anki style
    try {

        for (let i = 0; i < ANKI_INFO.models.length; i++) {

            const p = {
                "model": {
                    "name": ANKI_INFO.models[i]['modelName'],
                    "css": cardStyle
                }
            }

            // 更新 style
            browser.runtime.sendMessage({ 'type': 'ankiAction', 'messages': { 'anki_action_type': 'updateModelStyling', 'anki_arguments': p }, }).then((result) => {

            })

        }


    } catch (error) {

        console.log(error);

    }

    return ANKI_INFO
}