import browser from 'webextension-polyfill'
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, ConfigProvider } from 'antd';

import Icon from "../assets/icon128.png"



interface NavProps {
    title: string;
    handleSaveToAnkiBtnClick: () => void;
    addToAnkiStatus: string;
    onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Nav(props: NavProps) {
    const [count, setCount] = useState(0);
    const [currentURL, setCurrentURL] = useState < string > ();

    useEffect(() => {

    }, []);

    const handleSaveToAnkiBtnClick = () => {
        console.log('Nav handleSaveToAnkiBtnClick');
        props.handleSaveToAnkiBtnClick()
    };


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
                    <div className="rightBtnBox" style={{ flex: 1, textAlign: 'right' }}>
                        {props.addToAnkiStatus == 'success' ? '✅ Added to Anki' :
                            <Button size="small"
                                // type='link'
                                // loading={props.addToAnkiStatus === 'loading' ? true : false}
                                disabled={props.addToAnkiStatus === 'standby' || props.addToAnkiStatus === 'loading' ? true : false}
                                onClick={handleSaveToAnkiBtnClick}>{props.addToAnkiStatus === 'loading' ? 'Adding...' : 'Add to Anki'}</Button>}
                    </div>

                </div>
            </ConfigProvider >
        </>
    );
}