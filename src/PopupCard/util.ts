import browser from 'webextension-polyfill'

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

        const newX = maxX - 20
        const newY = data.selection.anchorNode.parentElement.offsetTop + data.selection.anchorNode.parentElement.clientHeight + 20

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
                    resolve (msg.imgs)
                }
            }

        })

    });

}