import browser from 'webextension-polyfill'
import React, { useEffect, useState, useRef } from "react";

import { Skeleton, Input, Space, Form, Button } from 'antd';

interface CustomPromptFormProps {
    data: string;
}

export function CustomPromptForm(props: CustomPromptFormProps) {


    return (
        <div>
            <Form
                // onFinish={saveOptions}
                layout='vertical'
            // form={form}

            >

                <Form.Item
                    name="openApiKey"
                    label="Your Open API Key"
                >
                    <Input placeholder="We will not use your Key for any other purposes." type="password" />
                </Form.Item>

                <span>{props.data}</span>

                <Form.Item
                    style={{ margin: '0' }}
                >
                    <Button type="primary" htmlType="submit">Save</Button>

                </Form.Item>



            </Form>
        </div>
    )
}