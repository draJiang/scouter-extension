import { Button } from 'antd';
import React, { useEffect, useState, useRef } from "react";
import { ChatMessage } from "../types"

interface MessageProps {
    messages: Array<ChatMessage>;
    handleRegenerateButtonClick: () => void;
}

export function RegenerateButton(props: MessageProps) {

    const lastMessage = props.messages[props.messages.length - 1]
    const lastMessageStatus = lastMessage ? lastMessage.content[lastMessage.content.length - 1].status : 'begin'

    return (
        <div>
            {props.messages.length >= 1 && (lastMessageStatus === 'invalid_api_key' || lastMessageStatus === 'done') &&
                <div>
                    <Button style={{
                        position: 'absolute',
                        fontSize: '13.2px',
                        bottom: '60px',
                        right: '18px',
                        boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
                    }} size='small' onClick={() => {

                        props.handleRegenerateButtonClick()

                    }}>Regenerate</Button>
                </div>

            }
        </div>
    )

}