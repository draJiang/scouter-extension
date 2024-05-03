import browser from 'webextension-polyfill'
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { StyleSheetManager } from 'styled-components';

import Logo from '../../Components/Logo'
import { Caption } from './Caption'
import { CheckBox } from './CheckBox'



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
                        <CheckBox lable="开启字幕" checked={isShowCaptions} handleCheckBoxChange={showCaptions} />
                    </div>

                </div>
            }
        </div>
    )

}




