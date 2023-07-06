import React, { useEffect, useState, useRef, ReactNode } from "react";
import browser from 'webextension-polyfill'

import { Button } from 'antd';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import {
    Pencil2Icon,
} from '@radix-ui/react-icons';

interface DropdownMenuItemProps {
    children: ReactNode;
    onSelect: () => void;
    handleEditPrompt: () => void;
    data: { title: string, getUnsplashImages: boolean, userPrompt: string, id: string }
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
                padding: '4px',
                marginBottom: '4px',
                borderRadius:'2px'
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
            }}>{props.children}</span>{isHovered && <button onClick={handleEditPrompt}><Pencil2Icon /></button>}
        </DropdownMenu.Item >
    )
}