import React, { useEffect, useState, useRef } from "react";
import { Switch, Form, Select, Button } from 'antd';

import { FormPropsType } from '../types'

import { useDebouncedCallback } from 'use-debounce';

const Youtube: React.FC<FormPropsType> = ({ settings, saveOptions }) => {

    const [form] = Form.useForm();

    useEffect(() => {

        console.log(settings);
        if (settings) {
            // 更新 默认值
            form.setFieldsValue({
                showYoutubeButton: settings.showYoutubeButton,
            });
        }

    }, [settings])

    const handleFormChange = useDebouncedCallback((term: string) => {

        saveOptions(term)

    }, 300)

    return (

        <Form

            // onFinish={}
            onValuesChange={handleFormChange}
            form={form}
            labelCol={{ span: 4 }}
            layout="horizontal"

        >

            <section>

                <Form.Item
                    name="showYoutubeButton"
                    valuePropName="checked"
                    label="📺 YouTube shortcut"
                    extra={
                        <div>
                            {/* <p style={{ marginBottom: '10px' }}>Display YouTube shortcut</p> */}
                            <img className=" w-full py-2 max-w-2xl" src="images/youtube.png" />
                        </div>}
                >
                    <Switch />

                </Form.Item>

            </section>

        </Form>

    );
}

export default Youtube;