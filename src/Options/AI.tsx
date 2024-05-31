import React, { useEffect, useState, useRef } from "react";

import { Switch, Input, Radio, Form, Select } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { FormPropsType } from '../types'
import { models, freeModels } from "./models"

import { useDebouncedCallback } from 'use-debounce';

const AI: React.FC<FormPropsType> = ({ settings, saveOptions }) => {
    const [form] = Form.useForm();
    const { Option } = Select;

    const [radioValue, setRadioValue] = useState<string | null>('myOwnOpenAiKey');

    const onRadioChange = (e: RadioChangeEvent) => {
        setRadioValue(e.target.value)
    };


    useEffect(() => {
        if (settings) {
            setRadioValue(settings.apiKeySelection)

            form.setFieldsValue({
                apiKeySelection: settings.apiKeySelection,
                openApiKey: settings.openApiKey,
                openApiEndpoint: settings.openApiEndpoint,
                licenseKey: settings.licenseKey,
                chatGPTWeb: settings.chatGPTWeb,
                model: settings.model,
                freeModel: settings.freeModel,
                newLicenseKey: settings.newLicenseKey,
                ollamaApiEndpoint: settings.ollamaApiEndpoint,
                ollamaModel: settings.ollamaModel
            });
        }



    }, [settings])

    const handleFormChange = useDebouncedCallback((term: string) => {
        console.log(term);

        saveOptions(term)

    }, 300)

    return (


        <Form
            onValuesChange={handleFormChange}
            form={form}
            // labelCol={{ span: 4 }}
            layout="horizontal"
        >
            <section>
                <Form.Item
                    name="apiKeySelection"
                    label="🔋In use"
                >
                    <Radio.Group onChange={onRadioChange} value={radioValue} size="small" style={{ marginBottom: 0, display: 'flex' }}>

                        <Radio.Button value="scouterFreeAI" style={{ flex: '1', textAlign: 'center' }}>Scouter</Radio.Button>
                        <Radio.Button value="myOwnOpenAiKey" style={{ flex: '1', textAlign: 'center' }}>OpenAI</Radio.Button>
                        <Radio.Button value="ollama" style={{ flex: '1', textAlign: 'center' }}>Ollama</Radio.Button>
                        <Radio.Button value="licenseKey" style={{ flex: '1', textAlign: 'center' }}>OpenRouter</Radio.Button>
                        {/* <Radio.Button value="chatGPTWeb" style={{ flex: '1', textAlign: 'center' }}>ChatGPT</Radio.Button> */}

                    </Radio.Group>
                </Form.Item>

                {/* Scouter */}

                <div
                    // className="text-center"
                    style={{
                        display: radioValue === 'scouterFreeAI' ? 'block' : 'none'
                    }}>

                    <Form.Item
                        name="freeModel"
                        label="🤖Model"
                        initialValue={freeModels[0]['name']}
                    >
                        <Select
                            placeholder=""
                        >

                            {freeModels.map((item) => <Option key={item.id} value={item.id}>{item.name}</Option>)}

                        </Select>

                    </Form.Item>

                </div>

                {/* myOwnOpenAiKey */}
                <div style={{
                    display: radioValue === 'myOwnOpenAiKey' ? 'block' : 'none'
                }}>

                    <Form.Item
                        name="openApiEndpoint"
                        label="🔗API Endpoint"
                        extra={
                            <p style={{
                                color: '#666'
                            }}>If you are using <strong>Azure</strong> or a third-party endpoint, please fill in the endpoint address. <a target='__blank' href='https://jiangzilong.notion.site/Set-up-your-API-Key-96266d5236fa462ca707683d9bb275c6?pvs=4'>Learn More↗️</a></p>
                        }
                    >
                        <Input placeholder="https://api.openai.com" type="url" />
                    </Form.Item>

                    <Form.Item
                        name="openApiKey"
                        label="🔑Your Open API Key"
                    >
                        <Input placeholder="We will not use your Key for any other purposes." type="password" />
                    </Form.Item>

                </div>

                {/* Ollama */}
                <div style={{
                    display: radioValue === 'ollama' ? 'block' : 'none'
                }}>
                    <Form.Item
                        name="ollamaApiEndpoint"
                        label="🔗API Endpoint"
                    >
                        <Input placeholder="http://localhost:11434" type="url" />
                    </Form.Item>


                    <Form.Item
                        name="ollamaModel"
                        label="🤖Model"
                        extra={
                            <p style={{
                                color: '#666'
                            }}> <a target='__blank' href='https://jiangzilong.notion.site/How-to-use-Ollama-f8ff0d71198945b883e71e08f09cc9f5?pvs=4'>Learn More↗️</a></p>
                        }
                    >
                        <Input placeholder="llama2" type="text" />
                    </Form.Item>
                </div>

                {/* OpenRouter */}
                <div style={{
                    display: radioValue === 'licenseKey' ? 'block' : 'none'
                }}>
                    <Form.Item
                        name="licenseKey"
                        label="🔑Key"
                        style={{ marginBottom: '16px' }}
                    >
                        <Input placeholder="We will not use your Key for any other purposes." type="password" />
                    </Form.Item>

                    <Form.Item
                        name="model"
                        label="🤖Model"
                        initialValue={models[0]['name']}
                    >
                        <Select
                            placeholder=""
                        >

                            {models.map((item) => <Option key={item.id} value={item.id}>{item.name}</Option>)}

                        </Select>

                    </Form.Item>

                </div>

                {/* chatGPTWeb */}
                <div
                    className=" text-center"
                    style={{
                        display: radioValue === 'chatGPTWeb' ? 'block' : 'none',
                        color: '#F08A24'
                    }}
                >
                    ⚠️Sorry, this feature is temporarily unavailable.
                </div>
            </section>
        </Form >

    )

}

export default AI;