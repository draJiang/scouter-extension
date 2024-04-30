import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { StyleSheetManager } from 'styled-components';

import styled, { css } from 'styled-components';
import Logo from '../Components/Logo'

import { openScouter } from './index'

interface YouTubeButtonProps {

    container: HTMLDivElement;
    shadowRoot: ShadowRoot;
}

export function YouTubeButton(props: YouTubeButtonProps) {

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {


    }, [])

    const handleYouTubeButtonClick = () => {

        // // 获取字幕文字
        // const text = getCaption()
        // // 获取当前视频画面截图
        // const image = captureVideoScreenshot()

        // if (text && image) {
        //     // 显示窗口
        //     openScouter({
        //         runPrompt: false
        //     }, true, { text: text, image: image })
        // }

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


    const showCaptions = (show: boolean) => {

        if (show) {
            // 显示字幕
            const html5VideoPlayer: HTMLElement | null = document.querySelector('.html5-video-player');
            if (html5VideoPlayer) {
                const YouTubeCaptionsContainerDiv = document.createElement('div')
                YouTubeCaptionsContainerDiv.id = '__ScouterYouTubeCaptionsContainer'
                html5VideoPlayer.appendChild(YouTubeCaptionsContainerDiv);
                const thisShadowRoot = YouTubeCaptionsContainerDiv?.attachShadow({ mode: 'open' });


                // if (MyBox.shadowRoot?.querySelector('.' + CONTAINER_CLASSNAME) === null) {
                //   // 如果不存在 PopupCard
                //   container = document.createElement('div')
                //   container.className = CONTAINER_CLASSNAME
                //   shadowRoot?.appendChild(container)
                // }

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
            }
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
        }

    }


    return (
        <div style={{ width: '80px' }}>
            <div>
                <button onClick={() => setShowMenu(!showMenu)}>
                    scouter
                </button>
            </div>
            {showMenu &&
                <div style={{
                    position: 'relative',
                    top: '-90px',
                    left: '-10px',
                    width: '100px',
                    backgroundColor: '#000'
                }}>
                    <Checkbox lable="开启字幕" handleCheckBoxChange={showCaptions} />
                </div>
            }
        </div>
    )

}

function Caption() {

    const [captionText, setCaptionText] = useState<string[]>([]);
    const [lang, setLang] = useState<string>('en');

    useEffect(() => {


        // 定义当观察到变动时的回调函数
        const callback = function (mutationsList: MutationRecord[], _observer: MutationObserver) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    console.log('A child node has been added or removed.');
                } else if (mutation.type === 'attributes') {
                    console.log(`The ${mutation.attributeName} attribute was modified.`);
                }
                const captionInfo = getCaption()
                if (captionInfo && captionInfo?.captions !== captionText) {
                    setCaptionText(captionInfo?.captions)
                    setLang(captionInfo.lang)
                } else {
                    setCaptionText([])
                }
            }
        };

        // 创建 MutationObserver 实例，传入回调函数
        const observer = new MutationObserver(callback);

        // 选择要观察变动的节点
        const targetNode = document.querySelector('.ytp-caption-window-container');

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

        // 断开观察
        return () => {
            observer.disconnect();
        }


    }, [])


    return (
        <div style={{
            position: 'absolute',
            bottom: '60px',
            zIndex: '99',
            backgroundColor: '#000',
            textAlign: 'center'
        }}>
            {
                lang !== 'en' ?
                    captionText.map(item => <p>{item}</p>)
                    :
                    <p>
                        {captionText.map((item) => {
                            const words = item.split(' ');
                            return words.map(word => <span onClick={() => console.log('hello')}>{word}</span>)
                        })}
                    </p>
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
        <div onClick={() => {
            setChecked(!checked)
            props.handleCheckBoxChange(!checked)
        }}>
            <span>
                {checked && <span>checked</span>}
            </span>
            <span style={{ flex: 1, textAlign: 'right' }}>
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