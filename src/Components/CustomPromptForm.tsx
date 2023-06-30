import browser from 'webextension-polyfill'
import React, { useEffect, useState, useRef } from "react";

import { Skeleton, Input, Space, Form, Button, Switch } from 'antd';

interface CustomPromptFormProps {
    data: string;
}

export function CustomPromptForm(props: CustomPromptFormProps) {

    const [form] = Form.useForm();

    useEffect(() => {
        // 更新 input 文本框的默认值
        form.setFieldsValue({
            name: props.data
        })
    })

    const savePrompt = (values: any) => {

        console.log(values);

        // 将 Prompt 传回给父组件，以让 Prompt 列表 UI 重新渲染

        // 将 Prompt 保存下来

    }

    return (
        <div>
            <Form
                onFinish={savePrompt}
                layout='horizontal'
                labelCol={{
                    xs: { span: 6 },
                    sm: { span: 4 },
                }}
                form={form}
            >

                <Form.Item
                    name="title"
                    label="Title"
                >
                    <Input placeholder="We will not use your Key for any other purposes." type="text" />
                </Form.Item>

                <Form.Item name="getUnsplashImages" label="Images" valuePropName="checked">
                    <Switch />
                </Form.Item>

                <Form.Item name="userPrompt" label="Prompt"
                    extra="hello"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    style={{ margin: '0' }}
                >
                    <Button type="primary" htmlType="submit">Save</Button>

                </Form.Item>



            </Form>
        </div >
    )
}