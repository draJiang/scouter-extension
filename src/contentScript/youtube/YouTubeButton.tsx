import browser from 'webextension-polyfill'
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { StyleSheetManager } from 'styled-components';

import Logo from '../../Components/Logo'
import { Caption } from './Caption'
import { CheckBox } from './CheckBox'

import { userInfoType } from '../../types'

interface YouTubeButtonProps {

    container: HTMLDivElement;
    shadowRoot: ShadowRoot;
    userInfo: userInfoType;
}

export function YouTubeButton(props: YouTubeButtonProps) {

    const [showMenu, setShowMenu] = useState(false);
    const [isShowCaptions, setIsShowCaptions] = useState(false)

    useEffect(() => {

        // 是否开启字幕
        browser.storage.local.get({ "showCaptions": false }).then((result) => {
            setIsShowCaptions(result.showCaptions)

            waitForElement(".ytp-caption-window-container", (element: Element) => {
                
                if (props.userInfo.verified && result.showCaptions) {
                    showCaptions(true)
                } else {
                    showCaptions(false)
                }

            });

        })

        // 监听页面点击后关闭设置菜单
        const closeMenu = (event: any) => {

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

    const handleHideHideShortcut = () => {
        // 移除元素
        const element = document.getElementById('__ScouterYouTubeButtonContainer');
        if (element) {
            element.remove();
        }

        // 记录
        browser.storage.sync.set({ "showYoutubeButton": false })
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
                    bottom: '120px',
                    left: '-100px',
                    width: '0px',
                    height: '0px',
                    zIndex: '99'
                }}>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        backgroundColor: 'rgba(8, 8, 8, 0.75)',
                        padding: '10px 20px',
                        width: 'max-content',
                        borderRadius: '12px'
                    }}>
                        <div style={{ display: 'flex' }}>
                            <CheckBox
                                lable="Display subtitles"
                                disable={!props.userInfo.verified}
                                checked={isShowCaptions && props.userInfo.verified}
                                handleCheckBoxChange={showCaptions} />
                            <a style={{ color: '#F08A24', lineHeight: 'normal', marginLeft: '4px' }} target='_blank' href='https://jiangzilong.notion.site/Learning-in-YouTube-YouTube-1d61fd50815a42a5af394db4a695c712?pvs=4'>
                                (⚡Pro)
                            </a>
                        </div>
                        <div>
                            <CheckBox lable="Hide This Shortcut" checked={false} handleCheckBoxChange={handleHideHideShortcut} />
                        </div>
                    </div>

                </div>
            }
        </div>
    )

}




