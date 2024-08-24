import React, { useEffect, useState, useRef } from "react";
import { Switch, Form, Select, Button } from 'antd';

import { getDefaultDeckName } from '../../../util'
import { FormPropsType, userInfoType, AnkiInfoType } from '../../../types'
import { lang } from "../../../lib/lang"
import { LanguageSettings } from "./LanguageSettings";
import { ContextMenu } from "./ContextMenu";
import { useUserInfoContext } from '../../../lib/userInfo'
import { useDebouncedCallback } from 'use-debounce';

const General: React.FC<FormPropsType> = ({ settings, saveOptions }) => {

    const userInfo: { user: userInfoType, anki: AnkiInfoType } | null = useUserInfoContext()

    const [form] = Form.useForm();
    // const { Option } = Select;

    // const [ankiClientIsopen, setAnkiClientIsopen] = useState<boolean>(true)
    // const [ankiDeckNames, setAnkiDeckNames] = useState<Array<string>>(['Default']);

    useEffect(() => {

        const loadData = async () => {

            if (settings) {
                // 更新 默认值
                form.setFieldsValue({
                    contentEditable: settings.contentEditable && userInfo?.user.verified,
                });
            }

            // const data = await getDefaultDeckName()
            // const defaultDeckName = data.defaultDeckName

            // form.setFieldsValue({
            //     ankiDeckName: defaultDeckName
            // });
        }

        loadData()


    }, [settings])

    // useEffect(() => {

    //     // 获取 Anki 的牌组列表
    //     ankiAction('deckNames', 6).then((result: any) => {

    //         setAnkiDeckNames(result.result)

    //     }).catch(error => {
    //         setAnkiClientIsopen(false)
    //     })

    // }, [ankiDeckNames.join(''), ankiClientIsopen])

    const handleFormChange = useDebouncedCallback((term: string) => {

        saveOptions(term)

    }, 300)

    return (
        <>

            <LanguageSettings settings={settings} saveOptions={saveOptions} />

            <Form
                labelWrap={true}
                labelAlign="left"
                // onFinish={}
                onValuesChange={handleFormChange}
                form={form}
                labelCol={{ span: 4 }}
                layout="horizontal"

            >

                <section>

                    <ContextMenu settings={settings} saveOptions={saveOptions} />

                </section>

                <section>

                    <Form.Item
                        name="ShortcutKeys"
                        label="⌨️Shortcut Keys"
                    // extra={
                    //     <div>
                    //         <p>Display the menu when you select any text</p>
                    //     </div>
                    // }
                    >
                        <Button onClick={() => { window.open('https://jiangzilong.notion.site/keyboard-shortcut-94a604055ef148a3b7c835e6436543f0?pvs=4') }}>Learn More</Button>
                    </Form.Item>

                </section>

                <section>
                    <Form.Item
                        name="contentEditable"
                        valuePropName="checked"
                        label="✏️Content Editable(⚡Pro)"
                        extra={
                            <div>
                                <span>🧪This is an experimental feature.</span><Button type="link" size="small" onClick={() => { window.open('https://jiangzilong.notion.site/Content-Editable-Pro-54644438b77d4d3fb756cf8baaf5357a?pvs=4') }}>Learn More</Button>
                            </div>
                        }
                    >
                        <Switch disabled={!userInfo?.user.verified} />
                    </Form.Item>

                </section>

            </Form>
        </>
    );
}

export default General;