import browser from 'webextension-polyfill'
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Layout } from "./Layout";

import { Button, ConfigProvider } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, BulbOutlined } from '@ant-design/icons';
import { StyleProvider } from '@ant-design/cssinjs';

import { ContextMenu } from '../Options/section/General/ContextMenu';
import { LanguageSettings } from '../Options/section/General/LanguageSettings'
import { getSettings, saveOptions } from '../Options/util'

import '../Options/index.css'

export const Welcome = () => {
    const [settings, setSettings] = useState<Record<string, any> | undefined>();
    const [setpIndex, setSetpIndex] = useState<number>(0);

    useEffect(() => {

        (async () => {

            // 获取配置信息
            const items = await getSettings()
            setSettings(items)

        })()

    }, []);

    const handleNavuttonClick = (offset: number) => {
        let newIndex = setpIndex + offset
        if (newIndex > 2) {
            // 回到首页
            newIndex = 0
        }
        setSetpIndex(newIndex)
    }

    return (
        <ConfigProvider
            theme={{
                // algorithm: theme.defaultAlgorithm,
                token: {
                    colorPrimary: '#F08A24',
                    colorLink: "#F08A24",
                    colorLinkHover: "#ffc478",
                    colorLinkActive: "#c96914"
                    // colorText: "#F08A24"
                },
            }}
        >
            <div className='overflow-hidden'>

                {setpIndex === 0 &&
                    <>
                        <Layout title="Choose your languages">
                            <LanguageSettings style={{ layout: 'vertical' }} settings={settings} saveOptions={saveOptions} />
                        </Layout>
                        <div>
                            <div className='absolute flex flex-row gap-3 m-auto bottom-8 left-0 right-0 w-fit'>
                                <Button style={{ width: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} icon={<ArrowRightOutlined />} type='primary' onClick={() => handleNavuttonClick(1)}>Next</Button>
                            </div>
                        </div>
                    </>
                }

                {setpIndex === 1 &&
                    <>
                        <Layout title="Learning in reading">
                            <section>
                                <ContextMenu settings={settings} saveOptions={saveOptions} showImage={false} />
                            </section>
                            <div className='flex flex-col items-center'>
                                <video style={{ maxHeight: '520px' }} className=' rounded' autoPlay loop src="videos/document.mp4" />
                            </div>
                        </Layout>
                        <div>
                            <div className='absolute flex flex-row gap-3 m-auto bottom-8 left-0 right-0 w-fit'>
                                <Button style={{ width: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} icon={<ArrowLeftOutlined />} onClick={() => handleNavuttonClick(-1)}>Previous</Button>
                                <Button style={{ width: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} icon={<ArrowRightOutlined />} type='primary' onClick={() => handleNavuttonClick(1)}>Next</Button>
                            </div>
                        </div>
                    </>
                }

                {setpIndex === 2 &&
                    <>
                        <Layout title="Learning in watching">
                            <div className='flex flex-col items-center'>
                                <video style={{ maxHeight: '520px' }} className=' rounded' autoPlay loop src="videos/youtube.mp4" />
                            </div>
                        </Layout>
                        <div className='absolute flex flex-row gap-3 m-auto bottom-8 left-0 right-0 w-fit'>
                            <Button style={{ width: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} icon={<ArrowLeftOutlined />} onClick={() => handleNavuttonClick(-1)}>Previous</Button>
                            <Button style={{ width: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} icon={<BulbOutlined />} type='primary' onClick={() => window.open('https://jiangzilong.notion.site/3dc5b8da86b6451296fc326c340ce6ba?v=c40102b71c3b48888ca7f37525f6a330')}>Learn more</Button>
                        </div>
                    </>
                }

            </div>
        </ConfigProvider>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <StyleProvider>
            <Welcome />
        </StyleProvider>
    </React.StrictMode>,
    document.getElementById("root")
);