import browser from 'webextension-polyfill'
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button } from 'antd';

import Icon from "../assets/Logo.png"



interface NavProps {
    title: string;
    handleSaveToAnkiBtnClick: Function;
    addToAnkiStatus: string;
}

export function Nav(props: NavProps) {
    const [count, setCount] = useState(0);
    const [currentURL, setCurrentURL] = useState<string>();

    useEffect(() => {

    }, []);

    const handleSaveToAnkiBtnClick = () => {
        console.log('Nav:handleSaveToAnkiBtnClick');

        props.handleSaveToAnkiBtnClick()
    };

    return (
        <>
            <div id="ScouterNav">
                <img src={Icon} />
                {/* <span> {props.title}</span> */}
                <div className="rightBtnBox" style={{ flex: 1, textAlign: 'right' }}>
                    {props.addToAnkiStatus == 'success' ? 'OK' :
                        <Button size="small"
                            loading={props.addToAnkiStatus === 'loading' ? true : false}
                            disabled={props.addToAnkiStatus === 'standby' ? true : false}
                            onClick={handleSaveToAnkiBtnClick}>Add to Anki</Button>}
                </div>

            </div>
        </>
    );
}