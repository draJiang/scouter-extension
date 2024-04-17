import React, { useEffect, useState, useRef } from "react";

import { Input, Button, Form } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { FormPropsType, userInfoType, AnkiInfoType } from '../types'
import { ProTag } from "../Components/ProTag";

import { useUserInfoContext } from '../lib/userInfo'

import { useDebouncedCallback } from 'use-debounce';

const Pro: React.FC<FormPropsType> = ({ settings, saveOptions }) => {

    // const [verified, setVerified] = useState<boolean | null>(false);

    const [form] = Form.useForm();

    const userInfo: { user: userInfoType, anki: AnkiInfoType } | null = useUserInfoContext()

    useEffect(() => {

        // thisGetUserStatus()
        if (settings) {
            // 更新 默认值
            form.setFieldsValue({
                newLicenseKey: settings.newLicenseKey,
            });
        }

    }, [settings])

    // useEffect(() => {

    //     setVerified(userInfo?.user.verified!)

    // }, [userInfo])

    const handleFormChange = useDebouncedCallback((term: string) => {

        saveOptions(term)

    }, 300)



    return (
        // <section style={{
        //     border: '1px solid #ffd9a1',
        //     backgroundColor: '#fffaf0'
        // }}>
        <Form
            form={form}
            onValuesChange={handleFormChange}
        >
            <Form.Item
                name="newLicenseKey"
                // label={<> <ProTag /></>}
                style={{}}
                extra={
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        // justifyContent: 'end'
                    }}>

                        Unlock more features

                        <Button style={{
                            paddingLeft: '2px',
                            paddingRight: '0',
                        }} type='link' onClick={() => { window.open('https://jiang.lemonsqueezy.com/checkout/buy/e31f8c18-7bf2-4f6b-85c2-508fb500ce84') }} >Get License⚡</Button>

                    </div>
                }
            >
                <Input style={{ paddingLeft: '5px' }} prefix={<span style={{ marginRight: '4px' }}> <ProTag /></span>} suffix={userInfo?.user.verified! && <CheckCircleTwoTone twoToneColor="#52c41a" />} placeholder="License Key" type="password" />
            </Form.Item>
        </Form>

    )

}

export default Pro;