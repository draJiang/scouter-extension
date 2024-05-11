import React, { useEffect, useState, useRef } from "react";

import { Button, Form, Input } from 'antd';
import { SendOutlined, LoadingOutlined } from '@ant-design/icons';

import { useSpring, animated } from 'react-spring';
import { ChatMessage } from "../../types"

const { TextArea } = Input;

interface MessageProps {
    messages: Array<ChatMessage>;
    handleSendMessage: (values: string, getFeedback: boolean) => void;
}

export function UserMessageInput(props: MessageProps) {

    const lastMessage = props.messages[props.messages.length - 1]
    // const lastMessageStatus = lastMessage.content[lastMessage.content.length - 1].status
    const [form] = Form.useForm();

    const [isAnswerInputed, setIsAnswerInputed] = useState(false);

    // 文本框下敲击按键时
    const handleKeyDown = (event: any) => {
        // 阻止事件冒泡
        // console.log('handleKeyDown');

        event.stopPropagation()

        if (event.keyCode === 13 && !event.shiftKey) {

            if (props.messages.length > 0) {

                const contents = props.messages[props.messages.length - 1]['content']
                const lastContentStatus = contents[contents.length - 1]['status']
                // console.log(props.messages);

                if (props.messages.length === 0 ||
                    (lastContentStatus !== 'begin' && lastContentStatus !== 'process') && isAnswerInputed) {

                    // 非加载状态、GPT 消息发送完毕时用户可发送消息
                    if (event.metaKey) {
                        // 发送消息，但不需要 AI 反馈
                        handleSendMessage({ 'msg': event.target.value }, false)
                    } else {
                        // 发送消息，需要 AI 反馈
                        handleSendMessage({ 'msg': event.target.value })
                    }
                } else {
                    event.preventDefault();
                }

            } else {

                if (event.metaKey) {
                    // 发送消息，但不需要 AI 反馈
                    handleSendMessage({ 'msg': event.target.value }, false)
                } else {
                    // 发送消息，需要 AI 反馈
                    handleSendMessage({ 'msg': event.target.value })
                }

            }



        }
    }

    // 文本框值变化时
    const onTextAreaInput = (event: any) => {

        if (event.target.value.length > 0) {
            setIsAnswerInputed(true)
        } else {
            setIsAnswerInputed(false)
        }
    }

    const handleSendMessage = (values: any, getFeedback: boolean = true) => {
        // 清空文本框
        form.resetFields();
        // 禁用发送按钮
        setIsAnswerInputed(false)
        // 执行发消息事件
        props.handleSendMessage(values.msg, getFeedback)
    }

    // const AnimatedButton = animated(Button);
    const animationStyle = useSpring({
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
        config: { duration: 1000 },
        loop: true,
        width: '32px',
        height: '32px',
        border: '1px solid red'
    });

    const lastStatus = lastMessage ? lastMessage.content[lastMessage.content.length - 1].status : 'begin'

    return (

        <div className='w-full'
            style={{ borderTop: '1px solid rgba(5, 5, 5, .06)' }}
        >
            <Form
                form={form}
                onFinish={handleSendMessage}
                // onKeyDown={handleFormKeyDown}
                layout='inline'
                style={{ alignItems: 'center' }}
                className='p-2'
            >
                <Form.Item
                    name="msg"
                    style={{ margin: '0', flexGrow: '1' }}
                >
                    <TextArea
                        placeholder="Send a message"
                        bordered={false}
                        autoSize={{ minRows: 1, maxRows: 2 }}
                        // onChange={handleInputChange}
                        style={{
                            caretColor: '#F08A24',
                        }}
                        onKeyDown={handleKeyDown} onInput={onTextAreaInput}

                    />

                </Form.Item>

                <Form.Item
                    style={{ marginRight: '0' }}
                >
                    {props.messages.length === 0 || lastStatus !== 'begin' && lastStatus !== 'process' ?
                        <Button
                            type="text"
                            htmlType="submit"
                            disabled={props.messages.length > 0 ? lastStatus === 'begin' || lastStatus === 'process' || !isAnswerInputed : false}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                // color: !isLoading && isAnswerInputed ? '#F08A24' : ''
                            }}
                            icon={<SendOutlined />}
                        /> : <div style={{ marginRight: '8px' }}>
                            <animated.div style={animationStyle}><LoadingOutlined /></animated.div>
                        </div>
                    }



                </Form.Item>

                <Form.Item
                    style={{ margin: '0' }}
                >

                </Form.Item>
            </Form>
        </div>
    )

}