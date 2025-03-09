import browser from 'webextension-polyfill'
import { userInfoType, AnkiInfoType } from '../types'
import { dictionaryPrompt } from './PopupCard/util'
import { Defuddle } from 'defuddle';

// 获取用户信息
export const thisGetUserInfo = async () => {

    try {

        // 获取用户信息
        const USER_INFO = await browser.runtime.sendMessage({ 'type': 'getUserInfo', 'messages': {}, })
        const showYoutubeButton = USER_INFO.showYoutubeButton

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

export const getDocumentContent = async ()=>{
    const article = new Defuddle(document).parse();

    // Use the extracted content and metadata
    // console.log(article.content);  // HTML string of the main content
    // console.log(article.title);    // Title of the article

    // 创建一个临时的 div 元素
    const temp = document.createElement('div');
    // 设置 div 的 innerHTML 为传入的 HTML
    temp.innerHTML = article.content;
    const content = temp.textContent || temp.innerText || '';
    return {content:content,title:article.title}
}

// 获取 Anki 信息
// export const setAnkiInfo = async () => {

//     let ANKI_INFO: AnkiInfoType

    // 获取用户设置

    // 如果没有设置 anki 则初始化 anki（setModel）

    // // 获取 Anki decks
    // const decks = await browser.runtime.sendMessage({ 'type': 'ankiAction', 'messages': { 'anki_action_type': 'deckNames', 'anki_arguments': {} }, })
    // ANKI_INFO.decks = decks.result

    // // 获取 Anki models 和默认的 Deck 名称
    // const modelsAndDeck = await browser.runtime.sendMessage({ 'type': 'setModel', 'messages': {}, })
    // ANKI_INFO.models = modelsAndDeck.data.modelData
    // ANKI_INFO.defaultDeckName = modelsAndDeck.data.defaultDeckName

    // 更新 Anki style
    // try {

    //     for (let i = 0; i < ANKI_INFO.models.length; i++) {


    //         if (ANKI_INFO.models[i]['modelName'].indexOf('Scouter') > -1) {
    //             // Scouter 默认的 Note 自动设置 Style
    //             const p = {
    //                 "model": {
    //                     "name": ANKI_INFO.models[i]['modelName'],
    //                     "css": cardStyle
    //                 }
    //             }

    //             // 更新 style
    //             browser.runtime.sendMessage({ 'type': 'ankiAction', 'messages': { 'anki_action_type': 'updateModelStyling', 'anki_arguments': p }, }).then((result) => {


    //             })
    //         }

    //     }

    // } catch (error) {

    //     console.log(error);

    // }

    // return ANKI_INFO
// }