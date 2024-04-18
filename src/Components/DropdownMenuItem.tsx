import React, { useEffect, useState, useRef, ReactNode } from "react";
import { dictionaryPrompt } from '../contentScript/PopupCard/util'
import { Button } from 'antd';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { PromptType } from '../types'

import {
    Pencil2Icon,
    QuestionMarkCircledIcon
} from '@radix-ui/react-icons';

interface DropdownMenuItemProps {
    children: ReactNode;
    onSelect: () => void;
    handleEditPrompt: () => void;
    data: PromptType
}

export function DropdownMenuItem(props: DropdownMenuItemProps) {

    const [isHovered, setIsHovered] = useState(false);


    useEffect(() => {



    })

    const onSelect = () => {
        props.onSelect()
    }

    const handleEditPrompt = (event: any) => {
        event.stopPropagation()
        props.handleEditPrompt()
    }


    return (
        <DropdownMenu.Item
            style={{
                display: 'flex',
                padding: '6px',
                marginBottom: '4px',
                borderRadius: '2px'
            }}
            className="DropdownMenuItem"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onSelect={onSelect}>
            <span style={{
                flex: '1',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>{props.children}</span>{isHovered &&
                (props.data.id === 'Default' ?
                    <button onClick={(event) => {
                        event.stopPropagation();
                        window.open('https://jiangzilong.notion.site/What-is-the-default-Prompt-Prompt-5b55e3fc303d425f8cca16d5bee19e7c')
                    }}><QuestionMarkCircledIcon /></button>
                    :
                    props.data.id === dictionaryPrompt.id ?
                        <button onClick={(event) => { 
                            event.stopPropagation();
                            window.open('https://jiangzilong.notion.site/Online-Dictionary-43737527dc134bceb2d40ed79be1e0e3?pvs=4') }}><QuestionMarkCircledIcon /></button>
                        :
                        <button onClick={handleEditPrompt}><Pencil2Icon /></button>)}
        </DropdownMenu.Item >
    )
}