import React, { useEffect, useState, useRef, ReactNode } from "react";
import browser from 'webextension-polyfill'

import { Button } from 'antd';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

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
        <DropdownMenu.Item className="DropdownMenuItem"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onSelect={onSelect}>
            {props.children}{isHovered && <button onClick={handleEditPrompt}>Edit</button>}
        </DropdownMenu.Item>
    )
}