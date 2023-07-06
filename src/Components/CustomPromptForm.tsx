import browser from 'webextension-polyfill'
import React, { useEffect, useState, useRef } from "react";

import { Skeleton, Input, Space, Form, Button, Switch } from 'antd';

interface CustomPromptFormProps {
    initializePromptList: () => void;
    openCustomPromptForm: (data: { isOpen: boolean, data: { title: string, getUnsplashImages: boolean, userPrompt: string, id: string } }) => void;
    data: { title: string, getUnsplashImages: boolean, userPrompt: string, id: string };
}


export function CustomPromptForm(props: CustomPromptFormProps) {

    const [form] = Form.useForm();

    useEffect(() => {

        console.log(props.data);

        // 更新 input 文本框的默认值
        form.setFieldsValue({
            title: props.data.title,
            getUnsplashImages: props.data.getUnsplashImages,
            userPrompt: props.data.userPrompt
        })
    }, [props.data])

    // 保存 Prompt
    const savePrompt = async (values: any) => {

        // 关闭表单
        props.openCustomPromptForm({ isOpen: false, data: { 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' } })

        const timestamp = new Date().getTime().toString();

        // 获取已保存的 Prompt List
        const promptList = await browser.storage.sync.get({ "promptList": [] }).then((item) => {
            return item.promptList
        })


        console.log(props);

        let newPrompts = promptList

        // 如果 props 中包含 ID，则说明当前是在编辑 Prompt 而不是新增 Prompt
        if (props.data.id !== '') {

            // 在 Prompt 记录中找到这条 Prompt
            for (let i = 0; i < newPrompts.length; i++) {
                if (newPrompts[i]['id'] === props.data.id) {
                    newPrompts[i]['title'] = values['title']
                    newPrompts[i]['getUnsplashImages'] = values['getUnsplashImages']
                    newPrompts[i]['userPrompt'] = values['userPrompt']

                    break
                }
            }

        } else {
            newPrompts = [{ ...values, 'id': timestamp }, ...promptList]
        }




        // 将 Prompt 保存下来
        browser.storage.sync.set(
            {
                promptList: newPrompts.length > 6 ? newPrompts.splice(0, 6) : newPrompts,
            }
        ).then(item => {

            console.log(item);

            // 将 Prompt 传回给父组件，以让 Prompt 列表 UI 重新渲染
            props.initializePromptList()

        })

    }

    // 删除 Prompt
    const handleDeleteButtonClick = async () => {

        // 关闭表单
        props.openCustomPromptForm({ isOpen: false, data: { 'title': '', 'getUnsplashImages': false, 'userPrompt': '', 'id': '' } })

        // 获取已保存的 Prompt List
        const promptList = await browser.storage.sync.get({ "promptList": [] }).then((item) => {
            return item.promptList
        })

        let newPrompts = promptList

        // 在 Prompt 记录中找到这条 Prompt
        for (let i = 0; i < newPrompts.length; i++) {
            if (newPrompts[i]['id'] === props.data.id) {

                // 删除
                newPrompts.splice(i, 1)

                // 将 Prompt 保存下来
                browser.storage.sync.set(
                    {
                        promptList: newPrompts.length > 6 ? newPrompts.splice(0, 6) : newPrompts,
                    }
                ).then(item => {

                    console.log(item);

                    // 将 Prompt 传回给父组件，以让 Prompt 列表 UI 重新渲染
                    props.initializePromptList()

                })

                break
            }
        }



    }

    const handleKeyDown = (event: any) => {
        event.stopPropagation()
    }

    return (
        <div>
            <Form
                onFinish={savePrompt}
                // layout='horizontal'
                labelCol={{
                    xs: { span: 6 },
                    sm: { span: 5 },
                }}
                form={form}
            >

                <Form.Item
                    name="title"
                    label="Title"

                    rules={[{ required: true, message: 'Please input your title' }]}
                >
                    <Input maxLength={40} onKeyDown={handleKeyDown} placeholder="How to name the Prompt" type="text" />
                </Form.Item>

                <Form.Item
                    extra="Display Images Related to the Selected Text"
                    name="getUnsplashImages" label="Images" valuePropName="checked">
                    <Switch />
                </Form.Item>

                <Form.Item name="userPrompt" label="Prompt"
                    extra={
                        <>
                            {`${'{selection}'}: Selected text`}<br />
                            {`${'{sentence}'}: Sentence containing the selected text`}
                        </>}
                    rules={[{ required: true, message: 'Please input your prompt' }]}
                >
                    <Input.TextArea
                        placeholder="Translate {selection} to Chinese"
                        onKeyDown={handleKeyDown} rows={4} />
                </Form.Item>

                <Form.Item
                    style={{ margin: '0' }}
                >

                    {props.data.id !== '' && <Button style={{
                        marginRight: '12px'
                    }} onClick={handleDeleteButtonClick} danger>Delete</Button>}

                    <Button style={{ minWidth: '100px' }} type="primary" htmlType="submit">Save</Button>

                </Form.Item>



            </Form>
        </div >
    )
}