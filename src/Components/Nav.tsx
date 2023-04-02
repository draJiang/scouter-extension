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
        props.handleSaveToAnkiBtnClick()
    };

    // const onNavMouseDown = (event:any)=>{
    //     console.log('Nav:onMouseDown');
    //     props.onMouseDown(event)
    // }

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
                    style={{ cursor: 'move' }}
                    onMouseDown={props.onMouseDown}>
                    <img src={Icon} />
                    <div className="rightBtnBox" style={{ flex: 1, textAlign: 'right' }}>
                        {props.addToAnkiStatus == 'success' ? '✅ Added to Anki' :
                            <Button size="small"
                                // type='link'
                                loading={props.addToAnkiStatus === 'loading' ? true : false}
                                disabled={props.addToAnkiStatus === 'standby' ? true : false}
                                onClick={handleSaveToAnkiBtnClick}>Add to Anki</Button>}
                    </div>

                </div>
            </ConfigProvider >
        </>
    );
}