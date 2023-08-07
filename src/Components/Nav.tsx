import browser from 'webextension-polyfill'
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Button, ConfigProvider, Dropdown, Divider, Space } from 'antd';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DropdownMenuItem } from './DropdownMenuItem'

import { getDefaultPrompt } from '../PopupCard/util'

import { PromptType } from '../types'

import {
    HamburgerMenuIcon,
    DotFilledIcon,
    CheckIcon,
    ChevronRightIcon,
} from '@radix-ui/react-icons';


// import type { MenuProps } from 'antd';


import Icon from "../assets/icon128.png"

import { pinPopupCard } from '../content_script'
import { PushpinOutlined, PushpinFilled, PlusSquareOutlined, CheckCircleTwoTone, DownOutlined } from '@ant-design/icons';

// type PromptType = {
//     title: string;
//     getUnsplashImages: boolean;
//     userPrompt: string;
//     id: string;
// };

interface NavProps {
    title: string;
    prompts: Array<PromptType>;
    lastExecutedPrompt: PromptType;
    handleSaveToAnkiBtnClick: () => void;
    openCustomPromptForm: (data: { isOpen: boolean, data: PromptType }) => void;
    handleMenuItemClick: (data: PromptType, runPrompt?: boolean, imageToRerender?: boolean) => void;
    addToAnkiStatus: { status: string, noteId: number };
    onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Nav(props: NavProps) {
    const [isPin, setIsPin] = useState(false);
    const [currentURL, setCurrentURL] = useState<string>();
    const [isOpenPromptMenu, setIsOpenPromptMenu] = useState(false);

    // const { Option } = Select;

    const navElement = useRef<HTMLDivElement>(null);

    const defaultPrompt = getDefaultPrompt('')


    useEffect(() => {

    }, []);

    // 点击保存到 Anki 按钮
    const handleSaveToAnkiBtnClick = () => {
        props.handleSaveToAnkiBtnClick()
    };

    // 点击 Pin 按钮
    const handlePinBtnClick = () => {

        if (isPin) {
            pinPopupCard(false)
            setIsPin(false)
        } else {
            pinPopupCard(true)
            setIsPin(true)
        }

    }

    // 在 Anki 中打开笔记
    const editNoteInAnki = (noteId: number) => {

        let sending = browser.runtime.sendMessage({ 'type': 'guiEditNote', 'messages': { 'anki_action_type': 'guiEditNote', 'anki_arguments': { 'note': noteId }, } })
        sending.then((message: any) => {



        }, () => {
            //error
        });

    }

    // 打开 Prompt 编辑窗口
    const openCustomPromptForm = (data: { isOpen: boolean, data: PromptType }) => {

        props.openCustomPromptForm(data)
        setIsOpenPromptMenu(false)

    }

    // Prompt 菜单 item 点击
    const handleMenuItemClick = (data: PromptType) => {
        // 第 3 个参数 false 表示不重新渲染图片
        // 如果上一个 Prompt 是不显示图片，且当前 Prompt 需要显示图片，则本次任务需要渲染图片，否则不重新渲染图片
        if (props.lastExecutedPrompt.getUnsplashImages !== true && data.getUnsplashImages) {
            props.handleMenuItemClick(data)
        } else {
            props.handleMenuItemClick(data, true, false)
        }

    }

    const onMenuOpenChange = (open: boolean) => {
        // event.stopPropagation()
        setIsOpenPromptMenu(open)

    }



    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#F08A24',
                    },
                }}
            >
                <div id="ScouterNav"
                    ref={navElement}
                    className='p-4'
                    style={{
                        cursor: 'move',
                        position: 'absolute',
                        width: '100%', top: 0,
                        background: 'white',
                        zIndex: 9
                    }}
                    onMouseDown={props.onMouseDown}>

                    {/* <img src={Icon} /> */}

                    <div style={{ zIndex: 9 }}>

                        <DropdownMenu.Root open={isOpenPromptMenu}
                            modal={false}
                            onOpenChange={onMenuOpenChange}
                        >

                            <DropdownMenu.Trigger asChild>
                                <button className="IconButton" aria-label="Customise options" style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}

                                >

                                    <span style={{
                                        marginRight: '2px',
                                        maxWidth: '170px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>{props.lastExecutedPrompt.title}</span><HamburgerMenuIcon />
                                </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal container={navElement.current} >

                                <DropdownMenu.Content className="DropdownMenuContent" align='start' sideOffset={5} style={{
                                    backgroundColor: '#fff',
                                    cursor: 'default',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '180px',
                                    padding: '10px',
                                    boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
                                    borderRadius: '6px',
                                    animationDuration: '400ms',
                                    MozAnimationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                                    willChange: 'transform, opacity'
                                }}>

                                    {/* <DropdownMenu.Item className="DropdownMenuItem" style={{
                                        padding: '6px',
                                        marginBottom: '4px',
                                        borderRadius: '2px'
                                    }}
                                        onSelect={() => handleMenuItemClick(defaultPrompt)}>
                                        Default
                                    </DropdownMenu.Item> */}

                                    <DropdownMenuItem
                                        key={defaultPrompt.id}
                                        data={defaultPrompt}
                                        onSelect={() => handleMenuItemClick(defaultPrompt)}
                                        handleEditPrompt={() => openCustomPromptForm({ isOpen: true, data: defaultPrompt })}
                                    >

                                        {defaultPrompt.title}</DropdownMenuItem>


                                    {props.prompts.map(item => <DropdownMenuItem
                                        key={item.id}
                                        data={item}
                                        onSelect={() => handleMenuItemClick(item)}
                                        handleEditPrompt={() => openCustomPromptForm({ isOpen: true, data: item })}
                                    >

                                        {item.title}</DropdownMenuItem>)}

                                    <DropdownMenu.Separator className="DropdownMenuSeparator" />

                                    {props.prompts.length < 6 ? <Button style={{ marginTop: '4px' }} size='small' onClick={() => openCustomPromptForm({ isOpen: true, data: { 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' } })}>Create prompt</Button> :
                                        <Button style={{ marginTop: '4px' }} size='small' disabled>At most 7 Prompts</Button>}


                                    {/* <DropdownMenu.Arrow className="DropdownMenuArrow" /> */}
                                </DropdownMenu.Content>

                            </DropdownMenu.Portal>

                        </DropdownMenu.Root>


                    </div>


                    <div className="rightBtnBox"
                        style={{
                            flex: 1,
                            textAlign: 'right',
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center'
                        }}>
                        {props.addToAnkiStatus.status == 'success' ? <span>< CheckCircleTwoTone twoToneColor="#52c41a" /> Added to <a style={{
                            textDecoration: 'underline'
                        }} href="javascript:void(0);" onClick={editNoteInAnki.bind(event, props.addToAnkiStatus.noteId)}>Anki</a></span> :
                            <Button size="small"
                                // type='text'
                                icon={<PlusSquareOutlined />}
                                // loading={props.addToAnkiStatus === 'loading' ? true : false}
                                disabled={props.addToAnkiStatus.status === 'standby' || props.addToAnkiStatus.status === 'loading' ? true : false}
                                onClick={handleSaveToAnkiBtnClick}>{props.addToAnkiStatus.status === 'loading' ? 'Adding...' : 'Add to Anki'}</Button>}

                        <Button size='small'
                            // type='text'
                            style={{
                                borderColor: isPin ? '#F08A24' : ''
                            }}
                            icon={isPin ? <PushpinFilled className='isPin' /> : <PushpinOutlined />} onClick={handlePinBtnClick} />
                    </div>

                </div>
            </ConfigProvider >
        </>
    );
}