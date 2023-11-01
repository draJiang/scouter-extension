import browser from 'webextension-polyfill'

import React, { useEffect, useState, useRef } from "react";
import { ChatMessage } from "../types"
import styled from 'styled-components';
import { Button, Skeleton } from 'antd';

import {
    ChevronLeftIcon, ChevronRightIcon
} from '@radix-ui/react-icons';

import ReactMarkdown from 'react-markdown'
import breaks from 'remark-breaks';
import rehypeParse from 'rehype-parse'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import settingGuide from '../assets/settingGuide.png'

import { Images } from "../Components/Images"

import { getUnsplashImages } from './util'

import { ImageType } from "../types"


interface MessageProps {
    message: ChatMessage;
}

interface MessagesListProps {
    messages: Array<ChatMessage>;
    // isApiErro: boolean;
}

let IconButton = styled(Button)`

    display: flex;
    align-items: center;
    justify-content: center;

`;

const MessageBox = styled.div`
    
    padding:18px 0;

    &:hover{
        // background-color: rgb(0,0,0,0.04);
    }
    

`;


function Message(props: MessageProps) {

    const [images, setImages] = useState<Array<ImageType>>([])
    const [messageIndex, setMessageIndex] = useState(props.message.content.length - 1)
    const [isMessageHover, setIsMessageHover] = useState(false)

    useEffect(() => {

        setImages(props.message.images)
        setMessageIndex(props.message.content.length <= 0 ? 0 : props.message.content.length - 1)
        // console.log('messageIndex:');
        // console.log(messageIndex);
        // console.log(props.message.content);


    }, [props.message]);

    const handleMessageIndexChange = (n: number) => {

        let newIndex = messageIndex
        newIndex += n

        if (newIndex < 0) {
            newIndex = props.message.content.length - 1
        }

        if (newIndex > props.message.content.length - 1) {
            newIndex = 0
        }

        setMessageIndex(newIndex)

    }

    const handleMessageHover = (e: React.MouseEvent) => {


        if (e.type === 'mouseleave') {
            setIsMessageHover(false)
        } else {
            setIsMessageHover(true)
        }


    }

    // const lastStatus = props.message.content[props.message.content.length - 1].status
    let content
    if (messageIndex > props.message.content.length - 1) {

        content = props.message.content[props.message.content.length - 1];
    } else {
        content = props.message.content[messageIndex];
    }

    return (
        <div className='' style={props.message.role === 'user' ? { backgroundColor: '#F6F6F6', paddingTop: '2px', paddingBottom: '2px' } : {}}>
            <Skeleton style={{ margin: '18px 0' }} loading={props.message.content[props.message.content.length - 1]['status'] === 'begin' ? true : false} active={true} title={false}>

                {/* 图片 */}
                {props.message.showImagesBox &&
                    <Images images={images}
                        getUnsplashImages={(keyWord) => {
                            getUnsplashImages(keyWord).then((imgs: any) => {

                                // 处理图片的数据格式
                                let newImages: Array<ImageType> = []
                                imgs.forEach((img: any) => {
                                    const obj = {
                                        type: 'unsplash',
                                        id: img.id,
                                        urls: {
                                            small: img.urls.small
                                        },
                                        links: {
                                            download_location: img.links.download_location
                                        },
                                        description: img.description,
                                        user: {
                                            username: img.user.username,
                                            name: img.user.name
                                        }
                                    }

                                    newImages.push(obj)
                                });

                                setImages(newImages)
                            })
                        }}

                        generationsImages={(keyWord) => {
                            browser.runtime.sendMessage({ 'type': 'generationsImages', 'data': { 'prompt': keyWord } }).then((response) => {

                                // 处理图片的数据格式
                                let newImages: Array<ImageType> = []

                                if (response.succeeded) {

                                    response.data.data.forEach((img: any) => {
                                        const obj = {
                                            type: 'ai',
                                            id: img.url,
                                            urls: {
                                                small: img.url
                                            },
                                            links: {
                                                download_location: ''
                                            },
                                            description: '',
                                            user: {
                                                username: 'AI',
                                                name: 'AI'
                                            }
                                        }

                                        newImages.push(obj)
                                    });

                                    setImages(newImages)

                                } else {
                                    setImages([])
                                    alert('The current AI endpoint does not support image generation.')
                                }



                            })
                        }}


                    />}


                {/* GPT 生成的内容 */}
                <MessageBox style={{}} onMouseEnter={handleMessageHover} onMouseLeave={handleMessageHover} >

                    {/* 重新生成后，可以在多个生成结果之间切换 */}
                    {props.message.content.length > 1 && isMessageHover &&
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            top: '-30px',
                            width: 'fit-content',
                            alignItems: 'center',
                            height: '0',
                            zIndex: '9'
                        }}>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 'fit-content',
                                // position: 'absolute',
                                backgroundColor: '#fff',
                                boxShadow: 'rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px',
                                borderRadius: '4px',
                            }}>

                                <IconButton type='text' size='small' icon={<ChevronLeftIcon />} onClick={() => {
                                    handleMessageIndexChange(- 1)
                                }} />
                                <div style={{ margin: '0 2px' }}>{messageIndex + 1 + '/' + props.message.content.length}</div>
                                <IconButton type='text' size='small' icon={<ChevronRightIcon />} onClick={() => {
                                    handleMessageIndexChange(1)
                                }} />

                            </div>

                            <div style={{
                                clipPath: "path('M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z')",
                                width: '16px',
                                height: '8px',
                                backgroundColor: '#fff',
                                transform: 'rotate(180deg)',
                                boxShadow: 'rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px',
                                position: 'absolute',
                                top: '26px'
                            }}></div>

                        </div>
                    }

                    <div>
                        <ReactMarkdown
                            remarkPlugins={[breaks, remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                table: ({ node, ...props }) => <div style={{ overflowX: 'scroll' }}>
                                    <table style={{
                                        width: 'max-content',
                                        maxWidth: '620px',
                                        border: "1px solid #ccc",
                                        borderCollapse: 'collapse',
                                        margin: 0,
                                        padding: 0,
                                    }} {...props} />
                                </div>
                            }}
                            skipHtml={false}
                            children={content['content']} />

                        {/* API 错误的引导图 */}
                        {content['status'] === 'invalid_api_key' && <div className=''>
                            <img src={settingGuide} style={{
                                borderRadius: '4px'
                            }} /></div>}

                    </div>





                </MessageBox>








            </Skeleton >

        </div >
    );
};

export function MessagesList(props: MessagesListProps) {

    return (
        <div
            className='messages'
            style={{
                lineHeight: '2',
                wordWrap: 'break-word',
                marginBottom: '48px'
            }}
        >
            {props.messages.map((item: ChatMessage) => {


                return <Message key={item.content[0].chatId} message={item} />

            }

            )}

            {/* {props.isApiErro ? <div className=''> <img src={settingGuide} style={{
                borderRadius: '4px'
            }} /></div> : ''} */}


        </div>
    )
}