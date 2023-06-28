import browser from 'webextension-polyfill'
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Button, ConfigProvider, Dropdown, Divider, Space, Select } from 'antd';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
    HamburgerMenuIcon,
    DotFilledIcon,
    CheckIcon,
    ChevronRightIcon,
} from '@radix-ui/react-icons';


import type { MenuProps } from 'antd';


import Icon from "../assets/icon128.png"

import { pinPopupCard } from '../content_script'
import { PushpinOutlined, PushpinFilled, PlusSquareOutlined, CheckCircleTwoTone, DownOutlined } from '@ant-design/icons';


interface NavProps {
    title: string;
    handleSaveToAnkiBtnClick: () => void;
    handleMenuItemClick: (prompt: { prompt: Array<{ role: string, content: string }>, getUnsplashImages: boolean }) => void;
    addToAnkiStatus: { status: string, noteId: number };
    onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Nav(props: NavProps) {
    const [isPin, setIsPin] = useState(false);
    const [currentURL, setCurrentURL] = useState < string > ();

    const { Option } = Select;

    const navElement = useRef < HTMLDivElement > (null);

    const items = [
        {
            key: 'noopener noreferrer',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
    ];


    useEffect(() => {

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


    const handleMenuItemClick = (key: string) => {
        console.log(key);
        props.handleMenuItemClick({ 'prompt': [{ 'role': 'user', 'content': key }], 'getUnsplashImages': true })
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
                        {/* <Dropdown menu={{ items }} placement="topLeft" getPopupContainer={() => document.getElementById('__jiang-souter') ?? document.createElement('div')}>

                            <Button>topLeft</Button>
                        </Dropdown> */}

                        {/* <Select defaultValue="lucy" style={{ width: 120 }} >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="yiminghe">yiminghe</Option>
                        </Select> */}

                        <DropdownMenu.Root>

                            <DropdownMenu.Trigger asChild>
                                <button className="IconButton" aria-label="Customise options" style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    {items[0]['key']} <HamburgerMenuIcon />
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

                                    {items.map(item => <DropdownMenu.Item className="DropdownMenuItem" onSelect={() => handleMenuItemClick(item.key)}>
                                        {item.key}
                                    </DropdownMenu.Item>
                                    )}


                                    <DropdownMenu.Separator className="DropdownMenuSeparator" />

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