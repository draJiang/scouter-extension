import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import { Button } from 'antd';

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
            <div>{props.title}</div>
        </>
    );
}