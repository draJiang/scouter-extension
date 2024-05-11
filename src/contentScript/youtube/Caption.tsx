import React, { useEffect, useState, useRef } from "react";

import { getCaption, captureVideoScreenshot } from './util'
import { CaptionLine } from './CaptionLine'
import { openScouter } from '../index'
import { OpenInNewWindowIcon } from '@radix-ui/react-icons'

import { useDebouncedCallback } from 'use-debounce';

export function Caption() {

    const [captionText, setCaptionText] = useState<string[]>([]);
    const [lang, setLang] = useState<string>('en');
    const [showButton, setShowButton] = useState(false)
    const clickedCaption = useRef<boolean>(false)
    const [fontSize, setFontSize] = useState('20px')

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

                console.log(mutation);

                const target = (mutation.target as HTMLElement)
                if (target.className === 'ytp-caption-window-container' || target.classList.contains('caption-window')) {
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
            attributes: true,           // 观察属性变动
            childList: true,            // 观察子节点的变动，如添加或者删除
            subtree: true,              // 观察后代节点
            characterData: true,        // 监视节点文本内容的变化 
        };

        if (targetNode) {
            // 用配置的选项开始观察目标节点
            observer.observe(targetNode, config);
        }

        // 设置字幕
        setCaptions()

        // 初始字幕尺寸
        handleResize()

        // 在 window 对象上添加 resize 事件监听器
        window.addEventListener('resize', handleResize);

        // 断开观察
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
        }


    }, [])

    const handleResize = useDebouncedCallback(() => {
        const v = document.querySelector('video')
        if (!v) {
            return
        }
        const w = v.clientWidth

        let newFontSize = '20px';

        if (w >= 1200) {
            newFontSize = '28px'
        }
        if (w > 900 && w < 1200) {
            newFontSize = '24px'
        }
        if (w > 640 && w <= 900) {
            newFontSize = '20px'
        }
        if (w <= 640) {
            newFontSize = '16px'
        }

        if (newFontSize !== fontSize) {
            setFontSize(newFontSize)
        }
    }, 500)

    const handleCaptionClick = (word: string, captionText: string) => {

        const image = captureVideoScreenshot()
        const thisWord = word.trim()
        openScouter({
            runPrompt: true
        }, true, { keyWord: thisWord, sencence: captionText, image: image || '' })

    }

    const handleOpenWindow = () => {
        const text = captionText.join(' ')
        const image = captureVideoScreenshot()

        openScouter({
            runPrompt: false
        }, true, { keyWord: text, sencence: text, image: image || '' })
    }


    const buttonStyle: React.CSSProperties = {
        marginLeft: '2px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        color: 'white',
        display: 'flex',
        position: 'absolute',
        right: '0',
        bottom: '8px'
    }



    return (
        <div
            style={{
                position: 'absolute',
                bottom: '60px',
                zIndex: '50',
            }}
            onClick={() => clickedCaption.current = true}
            onMouseEnter={() => {
                const videoElement = document.querySelector('video');
                if (videoElement) { videoElement.pause() }
                setShowButton(true)
                clickedCaption.current = false
            }}
            onMouseLeave={() => {
                setShowButton(false)

                // 如果鼠标移出字幕前未点击字幕中的元素
                if (!clickedCaption.current) {
                    // 继续播放视频
                    const videoElement = document.querySelector('video');
                    if (videoElement) { videoElement.play() }
                }
            }}
        >
            {captionText.map((item, index) => (
                <CaptionLine
                    key={index}
                    fontSize={fontSize}
                >
                    {item.split(' ').map((word, wordIndex) => (
                        <span
                            className='captionWord'
                            key={wordIndex}
                            onClick={() => handleCaptionClick(word, item)}>
                            {word.trim()}
                        </span>
                    ))}
                </CaptionLine>
            ))}

            {showButton &&
                <button style={buttonStyle} onClick={handleOpenWindow}><OpenInNewWindowIcon /></button>
            }

        </div>
    )
}