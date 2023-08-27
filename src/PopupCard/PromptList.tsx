import React, { useEffect, useState, useRef, ReactNode } from "react";

import { PromptType } from '../types'
import { getDefaultPrompt } from './util'

interface PromptListProps {
    promptList: Array<PromptType>;
    followUpData: { keyWord: string, sentence: string }
    showFollowUpDataMenu: { show: boolean, style: {} }
    handleMenuItemClick: (data: PromptType, runPrompt?: boolean, imageToRerender?: boolean, promptData?: { keyWord: string, sentence: string }) => void;
}

interface PromptButtonProps {
    handleMenuItemClick: () => void;
    children: ReactNode;
}

export function PromptList(props: PromptListProps) {

    useEffect(() => {



    });

    // Prompt 菜单 item 点击
    const handleMenuItemClick = (data: PromptType) => {
        console.log('handleMenuItemClick');

        // 第 3 个参数 false 表示不重新渲染图片
        props.handleMenuItemClick(data, true, true, props.followUpData)

    }

    return (
        <div
            className='followUpMenu'
            style={{
                ...props.showFollowUpDataMenu.style,
                position: 'absolute',
                display: "flex",
                flexDirection: "column",
                width: '120px'
                // top: "50%",
                // left: "50%",
                // transform: "translate(-50%, -50%)",
                // left: "50%",
                // zIndex: 9,
                // backgroundColor: "#fff",
                // padding: "10px"
            }}
        >

            {/* <button onClick={() => {
                const p = getDefaultPrompt(props.followUpData.keyWord)
                handleMenuItemClick(p)
            }}>Default</button> */}

            <PromptButton handleMenuItemClick={() => {
                const p = getDefaultPrompt(props.followUpData.keyWord)
                handleMenuItemClick(p)
            }}>Default</PromptButton>

            {props.promptList.map((item) => {
                // return <button onClick={() => handleMenuItemClick(item)}>{item.title}</button>
                return <PromptButton handleMenuItemClick={() => handleMenuItemClick(item)}>{item.title}</PromptButton>
            })}

        </div>
    )
}

function PromptButton(props: PromptButtonProps) {
    return (

        <button style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',
            padding: '4px'
        }}
            onClick={props.handleMenuItemClick}>{props.children}</button>

    )
}