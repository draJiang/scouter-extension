import browser from 'webextension-polyfill'
import { ankiAction } from '../util'

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

        const selectionObject = data.selection.getRangeAt(0).getBoundingClientRect()

        const newX = selectionObject.x + selectionObject.width + 10
        const newY = selectionObject.y + selectionObject.height + 10

        const clampedX = Math.max(minX, Math.min(newX, maxX));
        const clampedY = Math.max(minY, Math.min(newY, maxY));
        // console.log(props.selection.getRangeAt(0));

        data.windowElement.current.style.left = `${clampedX}px`;
        data.windowElement.current.style.top = `${clampedY}px`;
    }

    // 添加滚动事件，让消息列表自动滚动到底部
    data.messagesList.current?.addEventListener("scroll", handleScroll);
    return () => {
        // console.log('useEffect return');
        data.messagesList.current?.removeEventListener("scroll", handleScroll);

    };

    function handleScroll() {

        if (data.messagesList.current !== null) {
            const isAtBottom = data.messagesList.current?.scrollTop + data.messagesList.current.clientHeight >= data.messagesList.current.scrollHeight - 0.5;
            if (isAtBottom) {
                // 已经位于底部，不需要自动滚动
                console.log('isAtBottom');
                return;
            } else {
                // scrollToBottom()
            }
        }
        // 未位于底部，不执行自动滚动
    }

}

export const getUnsplashImages = (keyWord: string) => {

    return new Promise((resolve, reject) => {


        // 请求 background 获取数据
        // 使用长连接
        let port = browser.runtime.connect({
            name: 'popup-name'
        })

        // 使用 postMs 发送信息
        port.postMessage({ 'type': 'getUnsplashImages', 'messages': '', 'keyWord': keyWord })

        // 接收信息
        port.onMessage.addListener(msg => {

            if (msg.type === 'sendImgData') {
                console.log('sendImgData');

                if ('imgs' in msg) {
                    // console.log('unsplashSearchPhotos');
                    console.log('imgs:');
                    // setImages([])
                    resolve(msg.imgs)
                }
            }

        })

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
export const handlePromptVariables = async (promptStr: string, keyWord: string, Sentence: string) => {

    let newPromptStr = promptStr

    // 处理关键字和句子
    newPromptStr = promptStr.replace(/\{selection\}/g, keyWord)
    newPromptStr = newPromptStr.replace(/\{sentence\}/g, Sentence)

    // 处理 Anki 单词
    if (newPromptStr.indexOf('{ankiCard\}') >= 0) {

        // 获取目标卡片 ID
        await browser.runtime.sendMessage({ 'type': 'ankiAction', 'messages': { 'anki_action_type': 'findCards', 'anki_arguments': { 'query': 'is:due prop:due>-1 prop:due<2' } }, }).then(async (message: any) => {

            if (message.error === null) {

                console.log(message);
                // 根据卡片 ID 查询卡片信息
                await browser.runtime.sendMessage({ 'type': 'ankiAction', 'messages': { 'anki_action_type': 'cardsInfo', 'anki_arguments': { 'cards': message.result } }, }).then((message: any) => {
                    console.log(message);
                    
                    let randomValues
                    let ankiCardsStr = ''

                    if (message.result.length > 5) {
                        // 随机取 X 个卡片

                        // 深拷贝数组以避免修改源数组
                        const shuffledArray = message.result.slice();

                        // 使用 Fisher-Yates 洗牌算法对数组进行打乱
                        for (let i = shuffledArray.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
                        }

                        // 取前 x 个元素作为结果
                        randomValues = shuffledArray.slice(0, 5);
                        
                    } else {

                        randomValues = message.result

                    }

                    // 将单词替换到 prompt 中
                    randomValues.forEach((card: any) => {
                        const keys = Object.keys(card.fields);
                        const firstKey = keys[0];
                        ankiCardsStr += card.fields[firstKey].value + ','

                    });

                    newPromptStr = newPromptStr.replace(/\{ankiCard\}/g, ankiCardsStr)

                }, () => {
                    //error

                })

            } else {
                // 反馈错误信息

            }


        }, () => {
            //error
        });
    }


    return newPromptStr

}