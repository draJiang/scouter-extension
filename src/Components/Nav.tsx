import browser from 'webextension-polyfill'
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Button, ConfigProvider, Dropdown, Divider, Space } from 'antd';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DropdownMenuItem } from './DropdownMenuItem'


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

type PromptType = {
    title: string;
    getUnsplashImages: boolean;
    userPrompt: string;
    id: string;
};

interface NavProps {
    title: string;
    prompts: Array<PromptType>;
    lastExecutedPrompt: PromptType;
    handleSaveToAnkiBtnClick: () => void;
    openCustomPromptForm: (data: { isOpen: boolean, data: PromptType }) => void;
    handleMenuItemClick: (data: PromptType, runPrompt: boolean, imageToRerender: boolean) => void;
    addToAnkiStatus: { status: string, noteId: number };
    onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Nav(props: NavProps) {
    const [isPin, setIsPin] = useState(false);
    const [currentURL, setCurrentURL] = useState<string>();
    const [isOpenPromptMenu, setIsOpenPromptMenu] = useState(false);

    // const { Option } = Select;

    const navElement = useRef<HTMLDivElement>(null);

    const defaultPrompt = { 'title': 'Default', 'getUnsplashImages': true, 'userPrompt': 'Default', 'id': 'Default' }


    useEffect(() => {
        console.log(props);

    }, []);

    // 点击保存到 Anki 按钮
    const handleSaveToAnkiBtnClick = () => {
        console.log('Nav handleSaveToAnkiBtnClick');
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

        console.log('editNoteInAnki');
        console.log(noteId);


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
        console.log(data);
        // false 表示不重新渲染图片（因为 keyword 根本没有改变）
        props.handleMenuItemClick(data, true, false)
    }

    const onMenuOpenChange = (open: boolean) => {
        console.log('onMenuOpenChange');
        console.log(open);
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
                    style={{
                        cursor: 'move',
                        position: 'absolute',
                        width: '100%', top: 0,
                        background: 'white',
                        zIndex: 9999
                    }}
                    onMouseDown={props.onMouseDown}>

                    {/* <img src={Icon} /> */}

                    <div style={{ zIndex: 9999 }}>

                        <DropdownMenu.Root open={isOpenPromptMenu}
                            onOpenChange={onMenuOpenChange}
                        >

                            <DropdownMenu.Trigger asChild>
                                <button className="IconButton" aria-label="Customise options" style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}

                                >

                                    {props.lastExecutedPrompt.title} <HamburgerMenuIcon />
                                </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal container={navElement.current} >

                                <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5} style={{
                                    backgroundColor: '#fff',
                                    cursor: 'default',
                                    padding: '10px',
                                    boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
                                    borderRadius: '6px',
                                    animationDuration: '400ms',
                                    MozAnimationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                                    willChange: 'transform, opacity'
                                }}>

                                    <DropdownMenu.Item className="DropdownMenuItem"
                                        onSelect={() => handleMenuItemClick(defaultPrompt)}>
                                        Default
                                    </DropdownMenu.Item>

                                    {/* <DropdownMenuItem
                                        key='Default'
                                        data={defaultPrompt}
                                        onSelect={() => handleMenuItemClick(defaultPrompt)}
                                        handleEditPrompt={() => console.log('hello')}
                                    >

                                        Default</DropdownMenuItem> */}

                                    {props.prompts.map(item => <DropdownMenuItem
                                        key={item.id}
                                        data={item}
                                        onSelect={() => handleMenuItemClick(item)}
                                        handleEditPrompt={() => openCustomPromptForm({ isOpen: true, data: item })}
                                    >

                                        {item.title}</DropdownMenuItem>)}

                                    <DropdownMenu.Separator className="DropdownMenuSeparator" />

                                    <Button onClick={() => openCustomPromptForm({ isOpen: true, data: { 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' } })}>Click me</Button>

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