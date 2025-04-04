import React, { useEffect, useState, useRef } from "react";
import styled, { css } from 'styled-components';
import { PaperPlaneIcon, OpenInNewWindowIcon } from '@radix-ui/react-icons'
import Logo from '../Components/Logo'

interface ShortcutButtonProps {

    handleShortcutButtonClick: (runPrompt: boolean) => void;
    position: { x: number, y: number }
}

interface ScouterButtonProps {
    top: number;
    left: number;
}

const ScouterButton = styled.button`
    
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 4px 8px;

    &:hover {
        background-color: #F6F6F6;
    }

`;

const ScouterButtonBox = styled.div<ScouterButtonProps>`

font-family: sans-serif;
background-color: #fff;
color: rgb(0 0 0 / 80%);
height:32px;

font-size:14px;

display: flex;
flex-direction: row;
align-items: center;

position: absolute;
top: ${props => props.top}px;
left: ${props => props.left}px;
z-index: 999;

box-shadow: 0px 8px 28px rgba(0,0,0,.16);
border-radius: 4px;
border:1px solid rgba(5, 5, 5, .06)

`;

export function ShortcutButton(props: ShortcutButtonProps) {

    // // 设置初始坐标为 (0, 0)
    const [position, setPosition] = useState({ x: - 100, y: -100 });

    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        //设置按钮位置
        let left = props.position.x
        let top = props.position.y

        if (buttonRef.current) {

            const buttonWidth = buttonRef.current.offsetWidth
            const buttonHeight = buttonRef.current.offsetHeight

            // 如果超出右侧边界，向左调整
            if (left + buttonWidth > window.innerWidth) {
                left = window.innerWidth - buttonWidth - 10;
            }

            // // 如果超出底部边界，向上调整
            // if (top + buttonHeight > window.innerHeight) {
            //     top = window.innerHeight - buttonHeight;
            // }

        }

        setPosition({ x: left, y: top })

    }, [])

    return (
        <ScouterButtonBox
            ref={buttonRef}
            left={position.x}
            top={position.y}
            onMouseDown={(event: any) => event.stopPropagation()}
            onMouseUp={(event: any) => event.stopPropagation()}
        >

            {/* <div style={{
                padding: '6px 8px',
                borderRight: '1px solid rgba(5, 5, 5, .06)',
                height: '40px',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Logo style={{
                    width: '18px',
                    height: '18px',
                }} />
            </div> */}

            < div style={{
                padding: '6px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <ScouterButton
                    style={{
                        // marginRight: '4px'
                    }}
                    className="ShortcutButton"
                    onClick={(event: any) => {
                        props.handleShortcutButtonClick(true)
                        event.stopPropagation()
                    }}
                >
                    <PaperPlaneIcon style={{ marginRight: '4px' }} />Run
                </ScouterButton>
                <ScouterButton
                    className="ShortcutButton"
                    onClick={(event: any) => {
                        props.handleShortcutButtonClick(false)
                        event.stopPropagation()
                    }}
                >
                    <OpenInNewWindowIcon style={{ marginRight: '4px' }} /> Open
                </ScouterButton>
            </div >

        </ScouterButtonBox >
    )

}