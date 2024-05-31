import React, { useEffect, useState, useRef } from "react";
import { Switch, Form, Select, Button } from 'antd';

import { ankiAction, getDefaultDeckName } from '../../util'
import { FormPropsType } from '../../types'
import { lang } from "../../lib/lang"
import { LanguageSettings } from "./LanguageSettings";
import { ContextMenu } from "./ContextMenu";

import { useDebouncedCallback } from 'use-debounce';

const General: React.FC<FormPropsType> = ({ settings, saveOptions }) => {

    const [form] = Form.useForm();
    const { Option } = Select;

    const [ankiClientIsopen, setAnkiClientIsopen] = useState<boolean>(true)
    const [ankiDeckNames, setAnkiDeckNames] = useState<Array<string>>(['Default']);

    useEffect(() => {

        const loadData = async () => {

            if (settings) {
                // 更新 默认值
                form.setFieldsValue({
                    currentLanguage: settings.currentLanguage,
                    targetLanguage: settings.targetLanguage,
                });
            }

            const data = await getDefaultDeckName()
            const defaultDeckName = data.defaultDeckName

            form.setFieldsValue({
                ankiDeckName: defaultDeckName
            });
        }

        loadData()


    }, [settings])

    useEffect(() => {

        // 获取 Anki 的牌组列表
        ankiAction('deckNames', 6).then((result: any) => {

            setAnkiDeckNames(result.result)

        }).catch(error => {
            setAnkiClientIsopen(false)
        })

    }, [ankiDeckNames.join(''), ankiClientIsopen])

    const handleFormChange = useDebouncedCallback((term: string) => {

        saveOptions(term)

    }, 300)

    return (
        <>

            <LanguageSettings settings={settings} saveOptions={saveOptions} />

            <Form

                // onFinish={}
                onValuesChange={handleFormChange}
                form={form}
                labelCol={{ span: 4 }}
                layout="horizontal"

            >
                <section>
                    <Form.Item
                        name="ankiDeckName"
                        label="📘Anki Deck Name"
                        extra={!ankiClientIsopen && <p style={{
                            color: '#666'
                        }}>Anki client and related settings not found. Please <a target='__blank' href='https://jiangzilong.notion.site/Use-the-Add-to-Anki-feature-7ab95ff8aa5e419c978e8a2a0a451324'>configure↗️</a> and try again</p>}
                    >
                        <Select
                            placeholder="Anki Deck Name"
                            disabled={!ankiClientIsopen}
                        >

                            {ankiDeckNames.map((item) => <Option key={item} value={item}>{item}</Option>)}


                        </Select>
                    </Form.Item>

                </section>

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



            </Form>
        </>
    );
}

export default General;