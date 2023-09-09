import browser from 'webextension-polyfill'

import React, { useEffect, useState, useRef } from "react";
import { ChatMessage } from "../types"

import { Skeleton } from 'antd';

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


function Message(props: MessageProps) {

    const [images, setImages] = useState<Array<ImageType>>([])


    useEffect(() => {

        setImages(props.message.images)

    }, [props.message.images]);

    return (
        <div key={props.message.chatId} className='' style={props.message.role === 'user' ? { backgroundColor: '#F6F6F6', paddingTop: '2px', paddingBottom: '2px' } : {}}>
            <Skeleton loading={props.message.status === 'begin' || props.message.status === 'process' ? true : false} active={true} title={false}>

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


                {/* 文字 */}
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
                    children={props.message.content} />

                {/* API 错误的引导图 */}
                {props.message.status === 'invalid_api_key' && <div className=''>
                    <img src={settingGuide} style={{
                        borderRadius: '4px'
                    }} /></div>}


            </Skeleton>

        </div>
    );
};

export function MessagesList(props: MessagesListProps) {

    useEffect(() => {



    }, []);

    return (
        <div
            className='messages'
            style={{
                lineHeight: '1.8',
                wordWrap: 'break-word',
                marginBottom: '18px'
            }}
        >
            {props.messages.map((item: ChatMessage) => {


                return <Message key={item.chatId} message={item} />

            }

            )}

            {/* {props.isApiErro ? <div className=''> <img src={settingGuide} style={{
                borderRadius: '4px'
            }} /></div> : ''} */}


        </div>
    )
}