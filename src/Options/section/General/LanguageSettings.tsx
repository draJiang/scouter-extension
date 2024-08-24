import React, { useEffect, useState, useRef } from "react";
import { Switch, Form, Select, Button } from 'antd';
import { lang } from "../../../lib/lang"
import { FormPropsType } from '../../../types'
import { useDebouncedCallback } from 'use-debounce';

export const LanguageSettings: React.FC<FormPropsType> = ({ settings, saveOptions, style }) => {
    type LanguageObject = Record<string, {
        name: string;
        Prompt1: {
            explanation: string;
        };
        Prompt2: {
            translate: string;
            explanation: string;
        };
        Prompt3: {
            validation: string;
        };
    }>;
    const languageData: LanguageObject = lang;
    const { Option } = Select;
    const [form] = Form.useForm();

    useEffect(() => {

        const loadData = async () => {

            if (settings) {
                // 更新 默认值
                form.setFieldsValue({
                    currentLanguage: settings.currentLanguage,
                    targetLanguage: settings.targetLanguage
                });
            }

        }

        loadData()


    }, [settings])

    const handleFormChange = useDebouncedCallback((term: string) => {

        saveOptions(term)

    }, 300)

    return (
        <>
            <Form
                onValuesChange={handleFormChange}
                form={form}
                labelCol={{ span: 4 }}
                layout={style ? style['layout'] : "horizontal"}

            >
                <section>
                    <Form.Item
                        name="currentLanguage"
                        label="💬Native Language"
                    >
                        <Select
                            placeholder="What language do you use?"
                        >

                            {Object.keys(languageData).map((item) => <Option key={item} value={item}>{languageData[item].name + '(' + item + ')'}</Option>)}

                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="targetLanguage"
                        label="💬Target Language"
                    >
                        <Select
                            placeholder="What do you want to learn"
                        >
                            {Object.keys(languageData).map((item) => <Option key={item} value={item}>{languageData[item].name + '(' + item + ')'}</Option>)}

                        </Select>
                    </Form.Item>
                </section>
            </Form>
        </>
    )

}