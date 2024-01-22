import browser from 'webextension-polyfill'
import { ankiAction } from '../util'

import { PromptType } from '../types'

export const dictionaryPrompt: PromptType = {
    title: 'Dictionary',
    id: 'dict',
    getUnsplashImages: true,
    userPrompt: '',
}

export const getClipboard = () => {

    return new Promise((resolve, reject) => {

        navigator.clipboard.readText()
            .then(text => {
                resolve(text);
            })
            .catch(err => {
                reject(err);
            });

    })



}

export const windowInitialization = (data: { isPin: boolean, windowElement: any, selection: any, messagesList: any }) => {

    // 设置窗口的默认位置
    if (data.windowElement.current && !data.isPin) {

        // Check the boundaries
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const elementWidth = data.windowElement.current.clientWidth;
        const elementHeight = data.windowElement.current.clientHeight;

        const minX = 0;
        const minY = 0;
        const maxX = windowWidth - elementWidth;
        const maxY = windowHeight - elementHeight;

        let newX, newY = 0

        try {
            const selectionObject = data.selection.getRangeAt(0).getBoundingClientRect()
            newX = selectionObject.x + selectionObject.width + 10
            newY = selectionObject.y + selectionObject.height + 10

        } catch (error) {

        }



        const clampedX = Math.max(minX, Math.min(newX, maxX));
        const clampedY = Math.max(minY, Math.min(newY, maxY));
        // console.log(props.selection.getRangeAt(0));

        data.windowElement.current.style.left = `${clampedX}px`;
        data.windowElement.current.style.top = `${clampedY}px`;
    }

    // // 添加滚动事件，让消息列表自动滚动到底部
    // data.messagesList.current?.addEventListener("scroll", handleScroll);
    // return () => {
    //     // console.log('useEffect return');
    //     data.messagesList.current?.removeEventListener("scroll", handleScroll);

    // };

    // function handleScroll() {

    //     if (data.messagesList.current !== null) {
    //         const isAtBottom = data.messagesList.current?.scrollTop + data.messagesList.current.clientHeight >= data.messagesList.current.scrollHeight - 0.5;
    //         if (isAtBottom) {
    //             // 已经位于底部，不需要自动滚动
    //             return;
    //         } else {
    //             // scrollToBottom()
    //         }
    //     }
    //     // 未位于底部，不执行自动滚动
    // }

}

/**
 * 获取 Unsplash 图片
 *
 * @param {string} keyWord - 根据此关键字搜索图片
 * @returns {Array} 图片列表
 * @throws {异常类型} 异常描述
 */
export const getUnsplashImages = (keyWord: string) => {

    return new Promise((resolve, reject) => {


        // 请求 background 获取数据
        // 使用长连接
        // let port = browser.runtime.connect({
        //     name: 'fromPopupCardUtil'
        // })

        // 使用 postMs 发送信息

        let sending = browser.runtime.sendMessage({ 'type': 'getUnsplashImages', 'messages': '', 'keyWord': keyWord })

        sending.then((msg: any) => {

            if (msg.type === 'sendImgData') {

                if ('imgs' in msg) {
                    // console.log('unsplashSearchPhotos');
                    resolve(msg.imgs)
                }
            }



        }, () => {
            //error
        });


        // // 接收信息
        // port.onMessage.addListener(msg => {

        //     if (msg.type === 'sendImgData') {

        //         if ('imgs' in msg) {
        //             // console.log('unsplashSearchPhotos');
        //             resolve(msg.imgs)
        //         }
        //     }

        // })

    });

}

/**
 * 处理 Prompt 中的变量
 *
 * @param {string} promptStr - 需要处理的 Prompt 字符串
 * @param {string} keyWord - 用户所选中的关键字
 * @param {string} Sentence - 从网页中提取的关键字所在的句子
 * @returns {string} 处理后的 Prompt 字符串
 * @throws {异常类型} 异常描述
 */
export const handlePromptVariables = async (promptStr: string, keyWord: string, Sentence: string, Lang: { target: { name: string }, current: { name: string } }) => {

    let newPromptStr = promptStr

    // 处理关键字和句子
    newPromptStr = promptStr.replace(/\{selection\}/g, keyWord)
    newPromptStr = newPromptStr.replace(/\{sentence\}/g, Sentence)

    // 处理语言
    newPromptStr = newPromptStr.replace(/\{nativeLanguage\}/g, Lang['current']['name'])
    newPromptStr = newPromptStr.replace(/\{currentLanguage\}/g, Lang['current']['name'])
    newPromptStr = newPromptStr.replace(/\{targetLanguage\}/g, Lang['target']['name'])

    // 处理 Anki 单词
    if (newPromptStr.indexOf('{ankiCards}') >= 0) {

        // 获取目标卡片
        let randomValues: Array<{}> | []
        let ankiCardsStr = ''

        await getAnkiCards().then((cards: any) => {

            randomValues = cards

            if (randomValues !== null) {


                if (randomValues.length > 5) {
                    // 随机取 X 个卡片

                    // 深拷贝数组以避免修改源数组
                    const shuffledArray = randomValues.slice();

                    // 使用 Fisher-Yates 洗牌算法对数组进行打乱
                    for (let i = shuffledArray.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
                    }

                    // 取前 x 个元素作为结果
                    randomValues = shuffledArray.slice(0, 5);

                } else {

                }

                // 将单词替换到 prompt 中
                randomValues?.forEach((card: any) => {
                    const keys = Object.keys(card.fields);
                    let firstKey = keys[0];
                    // 找到卡片正面
                    for (let i = 0; i < keys.length; i++) {
                        if (card.fields[keys[i]].order === 0) {
                            firstKey = keys[i]
                            break
                        }
                    }
                    ankiCardsStr += card.fields[firstKey].value + ','

                });

                newPromptStr = newPromptStr.replace(/\{ankiCards\}/g, ankiCardsStr)
                return newPromptStr
            }
        }).catch((error) => {
            newPromptStr = newPromptStr.replace(/\{ankiCards\}/g, '')
        })



    }

    return newPromptStr

}

/**
 * 获取 Anki 卡片
 *
 * @returns {object[]} 返回卡片的对象列表
 * @throws {异常类型} 异常描述
 */
export const getAnkiCards = () => {

    return new Promise((resolve, reject) => {
        // 判断本地是否存有未过期的数据
        browser.storage.local.get({ "ankiCards": { 'cards': [], 'time': 0 } }).then(async (item: any) => {

            // 缓存 1 小时
            if (item.ankiCards.cards.length > 0 && Date.now() - item.ankiCards.time < 3600 * 1000) {

                // 若本地有可用的数据，则直接处理
                resolve(item.ankiCards.cards)


            } else {

                // 若本地无可用的数据，则通过 Anki
                await browser.runtime.sendMessage({ 'type': 'ankiAction', 'messages': { 'anki_action_type': 'findCards', 'anki_arguments': { 'query': 'is:due prop:due>-2 prop:due<3' } }, }).then(async (message: any) => {

                    if (message.error === null) {

                        // 根据卡片 ID 查询卡片信息
                        await browser.runtime.sendMessage({ 'type': 'ankiAction', 'messages': { 'anki_action_type': 'cardsInfo', 'anki_arguments': { 'cards': message.result } }, }).then((message: any) => {

                            // console.log(message);

                            let cards = message.result

                            // 将数据存储到本地，限制最大保存数量，避免本地存储空间达到上限
                            browser.storage.local.set({
                                ankiCards: { 'time': Date.now(), 'cards': cards.slice(0, 30) }
                            })

                            resolve(cards.slice(0, 30))

                        }, (message) => {
                            //error
                        })

                    } else {
                        // 反馈错误信息
                        reject(message)
                    }


                }, (message) => {
                    //error
                });
            }

        })


    })

}

/**
 * 处理字符串，对指定字符设置样式、点击事件
 *
 * @param {string} str - 需要处理的字符串
 * @param {string} keyWord - 当前选中的字符
 * @returns {string} 处理后的 Prompt 字符串
 * @throws {异常类型} 异常描述
 */
export const handleHightlight = (str: string, keyWord: string, ankiCards: Array<{}>, windowElement: HTMLDivElement | null) => {


    if (str === '') {
        return str
    }

    let newStr = str

    // 处理 keyword 高亮
    newStr = newStr.replace(new RegExp(`(^|[^*])(${keyWord})([^*]|$)`, 'gi'), function (match, p1, p2, p3) {
        // 如果关键词前后没有*，则添加**，否则保留原样
        if (p1 !== '*' && p3 !== '*') {
            return p1 + '**' + p2 + '**' + p3;
        } else {
            return match;  // 不进行替换
        }
    });

    // 处理 Anki 单词高亮
    const cards = ankiCards

    if (windowElement && cards) {

        // 遍历每一个卡片
        cards.forEach((card: any) => {

            // setTimeout(() => {
            // console.log(card);
            const keys = Object.keys(card.fields);
            let firstKey = keys[0];
            // 找到卡片正面
            for (let i = 0; i < keys.length; i++) {
                if (card.fields[keys[i]].order === 0) {
                    firstKey = keys[i]
                    break
                }
            }

            

            const cardFrontValue = card.fields[firstKey].value
            const escapedCardFrontValue = escapeRegExp(cardFrontValue);
            if (cardFrontValue !== keyWord) {
                newStr = newStr.replace(new RegExp(escapedCardFrontValue, 'gi'), `<mark>${cardFrontValue}</mark>`)
            }
            // }, 10);


            function escapeRegExp(string: string) {
                return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
            }


            // // 创建一个用于包裹'o'的<span>元素
            // var spanElement = document.createElement('span');
            // spanElement.setAttribute('data-cardID', card.id);
            // spanElement.className = 'hello';
            // spanElement.style.color = 'red';
            // spanElement.style.cursor = 'pointer';
            // spanElement.textContent = cardFrontValue;

            // // newStr = newStr.replace(/o/gi, spanElement.outerHTML);
            // newStr = newStr.replace(new RegExp(cardFrontValue, 'gi'), spanElement.outerHTML);


        });

        // 对上述元素添加点击事件
        // let hightlightDom = windowElement.getElementsByClassName('hello')

        // for (let i = 0; i < hightlightDom.length; i++) {

        //     hightlightDom[i].removeEventListener('click', handleHightlightClick)
        //     hightlightDom[i].addEventListener('click', handleHightlightClick)

        // }
    }

    return newStr



    // return 'true'

}

/**
 * 获取系统的默认 Prompt
 * @param {string} keyWord - 当前选中的字符
 * @returns {string} Prompt 字符串
 * @throws {异常类型} 异常描述
 */
export const getDefaultPrompt = (keyWord: string) => {

    let getUnsplashImages = true

    let userPrompt = `

        Please help me learn as a foreign language teacher. Sentences in examples should not be the same as the given sentence, Absolutely No Extra Text, Only Provide Information as in the Examples, Keep Language Concise.

        Example：
        
        -  Meaning: <Explain the meaning using {nativeLanguage}>
        -  Part of Speech: <Indicate the part of speech using {nativeLanguage}>
        
        ## Meaning in the sentence
        -  <Explain the meaning of the word in the sentence using {nativeLanguage}>
        
        ## Example Sentences
        -  <{targetLanguage} example sentence> - <Translation in {nativeLanguage}>
        -  <{targetLanguage} example sentence> - <Translation in {nativeLanguage}>
        
        ## Translation Exercise
        -  <{nativeLanguage} sentence>
        -  <{nativeLanguage} sentence>
        
        ---
        
        Word:{selection}, sentence: {sentence},You must reply in the specified language

        Please start teaching:

        `

    // 关键字长度较长时，按照句子进行处理
    if (keyWord.length > 20) {

        getUnsplashImages = false
        userPrompt = `
      
            As a language teacher, I will provide an explanation of the grammar knowledge in the given sentence, Absolutely No Extra Text, Only Provide Information as in the Examples, Keep Language Concise.

            Example:

            ## Translation
            <Translate to {nativeLanguage}>
            
            ## Grammar
            <- Point: Explain in {nativeLanguage}>

            ## Examples of related grammar
            -  <{targetLanguage} example sentence> - <Translation in {nativeLanguage}>
            -  <{targetLanguage} example sentence> - <Translation in {nativeLanguage}>

            ---
            
            Sentence: {selection}
                  
            `

    }

    const defaultPrompt: PromptType = {
        'title': 'Default', 'getUnsplashImages': getUnsplashImages, 'userPrompt': userPrompt,
        'id': 'Default'
    }

    return defaultPrompt

}


