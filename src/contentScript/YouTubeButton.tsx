import browser from 'webextension-polyfill'
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { StyleSheetManager } from 'styled-components';

import Logo from '../Components/Logo'

import { openScouter } from './index'

interface YouTubeButtonProps {

    container: HTMLDivElement;
    shadowRoot: ShadowRoot;
}

export function YouTubeButton(props: YouTubeButtonProps) {

    const [showMenu, setShowMenu] = useState(false);
    const [isShowCaptions, setIsShowCaptions] = useState(false)

    useEffect(() => {

        // 是否开启字幕
        browser.storage.local.get({ "showCaptions": false }).then((result) => {
            setIsShowCaptions(result.showCaptions)

            waitForElement(".ytp-caption-window-container", (element: Element) => {
                console.log("元素已加载：", element);
                showCaptions(result.showCaptions)
            });

        })

        // 监听页面点击后关闭设置菜单
        const closeMenu = (event: any) => {

            console.log(event);
            if (event.target.id !== '__ScouterYouTubeButtonContainer') {
                setShowMenu(false)
            }

        }

        function waitForElement(selector: string, callback: (element: Element) => void): void {
            const interval = setInterval(() => {
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(interval);
                    callback(element);
                }
            }, 1000);
        }




        document.addEventListener('click', closeMenu)

        return () => {
            document.removeEventListener('click', closeMenu)
        }



    }, [])


    const showCaptions = (show: boolean) => {

        if (show) {
            // 显示字幕
            const html5VideoPlayer: HTMLElement | null = document.querySelector('.html5-video-player');
            if (html5VideoPlayer) {
                const YouTubeCaptionsContainerDiv = document.createElement('div')
                YouTubeCaptionsContainerDiv.id = '__ScouterYouTubeCaptionsContainer'
                html5VideoPlayer.appendChild(YouTubeCaptionsContainerDiv);
                const thisShadowRoot = YouTubeCaptionsContainerDiv?.attachShadow({ mode: 'open' });

                ReactDOM.render(
                    <React.StrictMode>
                        <StyleSheetManager target={thisShadowRoot}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    top: 0
                                }}
                            >

                                <Caption />

                            </div>
                        </StyleSheetManager>
                    </React.StrictMode >,
                    thisShadowRoot
                );

                const style = document.createElement('style');
                // style.type = 'text/css';
                style.textContent = `
        
                .captionWord {
                    cursor: default;
                }
                
                .captionWord:hover {
                    background-color: #F08A24;
                }
        
                `;
                thisShadowRoot.appendChild(style);
            }

            setIsShowCaptions(true)

            // 保存记录
            browser.storage.local.set(
                {
                    showCaptions: true
                }
            )

            // 隐藏原生字幕
            const style = document.createElement('style');
            style.id = 'scouter-style';
            style.textContent = `
                .caption-window {
                    display: none;
                }
            `;
            document.head.appendChild(style);


        } else {
            const elementToRemove = document.getElementById('__ScouterYouTubeCaptionsContainer');

            // 检查元素是否存在
            if (elementToRemove) {
                // 如果元素存在，则从 DOM 中移除该元素
                elementToRemove.remove();
            } else {
                // 如果找不到元素，可以在控制台输出一条消息
                console.log('Element not found!');
            }

            setIsShowCaptions(false)
            // 保存记录
            browser.storage.local.set(
                {
                    showCaptions: false
                }
            )
            // 显示原生字幕
            const styleToRemove = document.getElementById('scouter-style');
            if (styleToRemove) {
                styleToRemove.parentNode!.removeChild(styleToRemove);
            }

        }

    }

    return (
        <div>
            <div>
                <button
                    className='scouterCaptionButton'
                    style={{
                        display: 'flex',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                    }}
                    onClick={() => setShowMenu(!showMenu)}>
                    <Logo style={{ width: '24px' }} />
                </button>
            </div>
            {showMenu &&
                <div style={{
                    position: 'relative',
                    top: '-98px',
                    left: '-100px',
                    width: '0px',
                    height: '0px',
                    zIndex: '99'
                }}>

                    <div style={{
                        backgroundColor: 'rgba(8, 8, 8, 0.75)',
                        padding: '20px',
                        width: '120px',
                        borderRadius: '12px'
                    }}>
                        <Checkbox lable="开启字幕" checked={isShowCaptions} handleCheckBoxChange={showCaptions} />
                    </div>

                </div>
            }
        </div>
    )

}

function Caption() {

    const [captionText, setCaptionText] = useState<string[]>([]);
    const [lang, setLang] = useState<string>('en');

    useEffect(() => {

        const setCaptions = () => {
            const captionInfo = getCaption()
            if (captionInfo && captionInfo?.captions !== captionText) {
                setCaptionText(captionInfo?.captions)
                setLang(captionInfo.lang)
            } else {
                setCaptionText([])
            }
        }

        // 定义当观察到变动时的回调函数
        const callback = function (mutationsList: MutationRecord[], _observer: MutationObserver) {
            for (const mutation of mutationsList) {

                if ((mutation.target as HTMLElement).className === 'ytp-caption-window-container') {
                    setCaptions()
                }

            }
        };

        // 创建 MutationObserver 实例，传入回调函数
        const observer = new MutationObserver(callback);

        // 选择要观察变动的节点
        const targetNode = document.querySelector('.html5-video-player');
        console.log('targetNode');
        console.log(targetNode);

        // 设置观察的配置选项
        const config = {
            attributes: true, // 观察属性变动
            childList: true, // 观察子节点的变动，如添加或者删除
            subtree: true   // 观察后代节点
        };

        if (targetNode) {
            // 用配置的选项开始观察目标节点
            observer.observe(targetNode, config);
        }

        setCaptions()

        // 断开观察
        return () => {
            observer.disconnect();
        }


    }, [])

    const handleCaptionClick = (word: string, captionText: string) => {

        const image = captureVideoScreenshot()

        openScouter({
            runPrompt: true
        }, true, { keyWord: word, sencence: captionText, image: image || '' })

    }

    const captionStyle = {
        fontSize: '2.2rem',
        backgroundColor: 'rgba(8, 8, 8, 0.75)',
        width: 'fit-content',
        margin: '0 auto',
        padding: '4px',
        display: 'flex',
        flexFlow: 'wrap',
        justifyContent: 'center',
        gap: '0.8rem'
    }

    interface CaptionPProps {
        children: React.ReactNode;
    }

    const CaptionP: React.FC<CaptionPProps> = ({ children }) => {
        return <p
            className='captionP'
            onMouseEnter={() => {
                const videoElement = document.querySelector('video');
                if (videoElement) { videoElement.pause() }
            }}
            onMouseLeave={() => {
                const videoElement = document.querySelector('video');
                if (videoElement) { videoElement.play() }
            }}
            style={captionStyle}>
            {children}</p>;
    };


    return (
        <div style={{
            position: 'absolute',
            bottom: '60px',
            zIndex: '50',
        }}>
            {
                lang !== 'en' ?
                    captionText.map((item, index) => <CaptionP key={index}>{item}</CaptionP>)  // 添加 key 避免 React 的 key warning
                    :
                    <>
                        {captionText.map((item, index) => (
                            <CaptionP key={index}>
                                {item.split(' ').map((word, wordIndex) => (
                                    <span
                                        className='captionWord'
                                        key={wordIndex}
                                        onClick={() => handleCaptionClick(word, item)}>
                                        {word}
                                    </span>
                                ))}
                            </CaptionP>
                        ))}
                    </>
            }

        </div>
    )
}

function Checkbox(props: {
    lable: string,
    checked?: boolean,
    handleCheckBoxChange: (checked: boolean) => void
}) {

    const [checked, setChecked] = useState(false);

    useEffect(() => {

        if (props.checked) {
            setChecked(props.checked)
        }

    }, [props.checked])

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
                // padding: '10px 10px 10px 24px',
            }}
            onClick={() => {
                setChecked(!checked)
                props.handleCheckBoxChange(!checked)
            }}>
            <span style={{ width: '20px', display: 'flex', position: 'absolute', left: '6px' }}>
                {checked &&
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                }
            </span>
            <span style={{ flex: 1, lineHeight: '1rem' }}>
                {props.lable}
            </span>
        </div>
    )
}

const getCaption = (): { captions: string[], lang: string } | null => {

    // 字幕的语言
    const windowElement = document.querySelector('.caption-window');
    const langValue = windowElement?.getAttribute('lang') || 'en';

    // 字幕信息
    const captionNodes = document.querySelectorAll('.caption-visual-line');

    if (captionNodes) {


        const captionTextList = Array.from(captionNodes).map(item => item.textContent || '');
        return {
            captions: captionTextList,
            lang: langValue
        };

    }

    return null


}

const captureVideoScreenshot = (): string | null => {

    // 获取页面上的第一个视频元素
    const video = document.querySelector('video');
    if (!video) {
        console.log("No video found on the page.");
        return null;
    }

    // 创建canvas元素
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 将视频的当前帧画到canvas上
    const ctx = canvas.getContext('2d');
    ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 将canvas转换为图片（DataURL）
    const imageDataUrl = canvas.toDataURL('image/png');
    return imageDataUrl

}