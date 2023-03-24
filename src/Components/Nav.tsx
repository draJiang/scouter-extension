import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import { Button } from 'antd';

import Icon from "../assets/icon48.png"

interface NavProps {
    title: string;
}

export function Nav(props: NavProps) {
    const [count, setCount] = useState(0);
    const [currentURL, setCurrentURL] = useState<string>();

    useEffect(() => {

    }, []);

    const changeBackground = () => {

        console.log('changeBackground');
        alert('hello')
    };

    return (
        <>
            <div id="ScouterNav">
                <img src={Icon} />
                <span> {props.title}</span></div>
        </>
    );
}