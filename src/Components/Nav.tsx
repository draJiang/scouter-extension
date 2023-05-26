import browser from 'webextension-polyfill'
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, ConfigProvider } from 'antd';

import Icon from "../assets/icon128.png"

import { pinPopupCard } from '../content_script'
import { PushpinOutlined, PushpinFilled, PlusSquareOutlined, CheckCircleTwoTone } from '@ant-design/icons';


interface NavProps {
    title: string;
    handleSaveToAnkiBtnClick: () => void;
    addToAnkiStatus: { status: string, noteId: number };
    onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Nav(props: NavProps) {
    const [isPin, setIsPin] = useState(false);
    const [currentURL, setCurrentURL] = useState < string > ();

    useEffect(() => {

    }, []);

    const handleSaveToAnkiBtnClick = () => {
        console.log('Nav handleSaveToAnkiBtnClick');
        props.handleSaveToAnkiBtnClick()
    };

    const handlePinBtnClick = () => {
        if (isPin) {
            pinPopupCard(false)
            setIsPin(false)
        } else {
            pinPopupCard(true)
            setIsPin(true)
        }

    }

    const editNoteInAnki = (noteId: number) => {

        console.log('editNoteInAnki');
        console.log(noteId);


        let sending = browser.runtime.sendMessage({ 'type': 'guiEditNote', 'messages': { 'anki_action_type': 'guiEditNote', 'anki_arguments': { 'note': noteId }, } })
        sending.then((message: any) => {



        }, () => {
            //error
        });

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
                    style={{
                        cursor: 'move',
                        position: 'absolute',
                        width: '100%', top: 0,
                        background: 'white',
                        zIndex: 9999
                    }}
                    onMouseDown={props.onMouseDown}>
                    <img src={Icon} />
                    <div className="rightBtnBox"
                        style={{
                            flex: 1,
                            textAlign: 'right',
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center'
                        }}>
                        {props.addToAnkiStatus.status == 'success' ? <span>< CheckCircleTwoTone twoToneColor="#52c41a" /> Added to <a style={{
                            textDecoration:'underline'
                        }} href="#" onClick={editNoteInAnki.bind(event, props.addToAnkiStatus.noteId)}>Anki</a></span> :
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