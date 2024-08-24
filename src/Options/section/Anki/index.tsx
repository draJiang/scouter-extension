import React, { useEffect, useState, useRef } from "react";
import { Switch, Form, Select, Button, Input, Skeleton } from 'antd';

import { FormPropsType } from '../../../types'
import { ankiAction } from '../../../util'
import { useDebouncedCallback } from 'use-debounce';
import FieldInput from './FieldInput'

const { TextArea } = Input;


const Anki: React.FC<FormPropsType> = ({ settings, saveOptions }) => {
    const [ankiClientIsopen, setAnkiClientIsopen] = useState<boolean>(true)
    const [ankiDeckNames, setAnkiDeckNames] = useState<Array<string> | 'loading'>('loading');
    const [ankiModelNames, setAnkiModelNames] = useState<Array<string> | 'loading'>('loading');
    const [ankiModelFieldNames, setAnkiModelFieldNames] = useState<Array<string>>([]);
    const [fieldsStatus, setFieldsStatus] = useState<'loading' | 'ready' | { 'error': true, 'msg': string }>('loading')

    const [isScouterNote, setIsScouterNote] = useState<boolean>(false)

    const [form] = Form.useForm();
    const [formForField] = Form.useForm();
    const { Option } = Select;

    useEffect(() => {

        (async () => {

            if (settings) {
                // 更新 默认值
                form.setFieldsValue({
                    ankiDeckName: settings.ankiDeckName
                });

                formForField.setFieldsValue({
                    ankiNoteName: settings.ankiNoteName
                });
            }

        })()

        setIsScouterNote(settings?.ankiNoteName.indexOf('Scouter') > -1)


    }, [settings])

    useEffect(() => {

        (async () => {

            try {

                // 获取 Note 对应的 fields
                handleModelFieldNames(settings?.ankiNoteName);

                const [deckNamesResult, modelNamesResult] = await Promise.all([
                    ankiAction('deckNames', 6),
                    ankiAction('modelNames', 6)
                ]);

                // 处理 deckNames 结果
                if (deckNamesResult) {
                    const deckNames = (deckNamesResult as any).result;
                    setAnkiDeckNames(deckNames);
                }

                // 处理 modelNames 结果
                if (modelNamesResult) {
                    const modelNames = (modelNamesResult as any).result;
                    setAnkiModelNames(modelNames);
                }




            } catch (error) {
                setAnkiClientIsopen(false)
            }

        })()



    }, [ankiClientIsopen])

    // Note, Fields 表单修改时
    const handleFieldsFormChange = useDebouncedCallback((term: {}) => {

        const ankiNoteName = formForField.getFieldValue('ankiNoteName')
        // 如果修改了 anki note 则联动显示对于的 fields
        if ("ankiNoteName" in term) {
            setAnkiModelFieldNames([])

            // 默认的 Note 类型不支持编辑
            // if (ankiNoteName.indexOf('Scouter') < 0) {
            //     handleModelFieldNames(term.ankiNoteName as string)
            // } else {
            //     setIsFieldsLoading(false)
            // }

            handleModelFieldNames(term.ankiNoteName as string)

            saveOptions(term);
        } else {

            // 处理 Fields 表单

            const fields = ankiModelFieldNames.reduce<{
                [key: string]: string;
            }>((obj, item) => {
                const v = formForField.getFieldValue(item)
                obj[item] = v ? v.replace(/\n/g, '<br>') : v;
                return obj;
            }, {})

            const newRecord = {
                note: ankiNoteName,
                fields: fields
            }
            console.log(newRecord);

            // 获取当前的 fields 记录，在当前的记录上生成新的记录
            const oldFields = settings?.ankiFields
            if (oldFields.length > 0) {
                type t = { note: string, fields: any }
                const exists = oldFields.some((item: t) => item.note === ankiNoteName);
                let newFields
                if (exists) {
                    newFields = oldFields.map((item: t) => {
                        if (item.note === ankiNoteName) {
                            return newRecord
                        } else {
                            return item
                        }
                    })
                } else {
                    newFields = [...oldFields, newRecord]
                }
                console.log('save:');
                console.log(newFields);
                saveOptions({ ankiFields: newFields });
            } else {
                const newFields = [newRecord]
                console.log('save:');
                console.log(newFields);
                saveOptions({ ankiFields: newFields });
            }

        }

    }, 300)

    // 其他表单修改时
    const handleFormChange = useDebouncedCallback((term: {}) => {
        console.log(settings);
        console.log(term);
        saveOptions(term);

    }, 300)

    // 获取 Note 对应的 fields
    const handleModelFieldNames = async (noteName: string) => {
        console.log('handleModelFieldNames');
        setFieldsStatus('loading')
        if (noteName) {
            const modelFieldNamesResult: any = await ankiAction('modelFieldNames', 6, {
                "modelName": noteName
            });
            if (modelFieldNamesResult.result) {
                const modelFieldNames = modelFieldNamesResult.result;
                setAnkiModelFieldNames(modelFieldNames);
                setFieldsStatus('ready')
                console.log(modelFieldNamesResult);


                // 渲染 fields 表单的默认值
                const fieldsRecord = settings?.ankiFields;
                if (fieldsRecord) {
                    // 找到 ankiNoteName 对应的 fields
                    const targetRecord = fieldsRecord.find((item: any) => item.note === noteName);
                    const tf = Object.keys(targetRecord.fields).reduce<{ [key: string]: string }>((obj, item) => {
                        const v = targetRecord.fields[item]
                        obj[item] = v ? v.replace(/<br>/g, '\n') : v;
                        return obj;
                    }, {})

                    if (tf) {
                        formForField.setFieldsValue(tf);
                    }
                }

            } else {
                setFieldsStatus({ 'error': true, msg: modelFieldNamesResult.error })
                alert(modelFieldNamesResult.error)
            }
        }
    }

    return (
        <>
            {!ankiClientIsopen && <div style={{
                color: '#f50',
                border: '1px solid #f50',
                padding: '10px',
                marginBottom: '20px',
                borderRadius: '4px',
            }}>Anki client and related settings not found. Please <a style={{ textDecorationLine: 'underline' }} target='__blank' href='https://jiangzilong.notion.site/Use-the-Add-to-Anki-feature-7ab95ff8aa5e419c978e8a2a0a451324'>configure↗️</a> and try again</div>}

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
                        label="Deck Name"
                    >
                        <Select
                            placeholder="Anki Deck Name"
                            disabled={!ankiClientIsopen}
                            loading={ankiDeckNames === 'loading'}
                        >

                            {
                                ankiDeckNames !== 'loading' &&
                                ankiDeckNames.map((item) => <Option key={item} value={item}>{item}</Option>)
                            }


                        </Select>
                    </Form.Item>

                </section>



            </Form>

            <Form
                // onFinish={}
                onValuesChange={handleFieldsFormChange}
                form={formForField}
                labelCol={{ span: 4 }}
                layout="horizontal"

            >

                <section>
                    <Form.Item
                        name="ankiNoteName"
                        label="Note Name"
                        extra={
                            isScouterNote ?
                                <p>Scouter's default note doesn't support editing.</p>
                                :
                                (fieldsStatus !== 'loading' && fieldsStatus !== 'ready') && <p style={{ color: 'red' }}>{fieldsStatus.msg}</p>
                        }
                    >
                        <Select
                            placeholder="Anki Note Name"
                            disabled={!ankiClientIsopen}
                            loading={ankiModelNames === 'loading'}
                        >

                            {ankiModelNames !== 'loading' &&
                                ankiModelNames.map((item) => {
                                    return < Option key={item} value={item} > {item}</Option>
                                })
                            }


                        </Select>
                    </Form.Item>

                    {fieldsStatus === 'loading' ?
                        <Skeleton active />
                        :
                        <div>
                            <div>
                                {ankiModelFieldNames.map((item) =>
                                    <Form.Item
                                        key={item}
                                        name={item}
                                        label={item}
                                    >
                                        {/* <FieldInput /> */}
                                        <TextArea
                                            disabled={isScouterNote}
                                            autoSize={{ minRows: 2, maxRows: 4 }}
                                            placeholder={isScouterNote ? "" : "{{Selection}}, {{Image}}..."} />
                                    </Form.Item>
                                )}
                            </div>

                        </div>
                    }

                </section>

                <div className=" flex">
                    <img className=" max-w-xl p-4" src="images/diagram.png" />
                    <div className=" mt-11">
                        <p className=" mb-3">You can customize the content of each field when adding to Anki. You can input any string, including the following dynamic variables:</p>
                        <ul className=" list-disc flex flex-col gap-1">
                            <li>{"{{Selection}}: Selected text"}</li>
                            <li>{"{{Sentence}}: Sentence containing the selected text"}</li>
                            <li>{"{{Audio}}: Pronunciation of the selected content"}</li>
                            <li>{"{{Image}}: Picture"}</li>
                            <li>{"{{Definition}}: Definition of the content"}</li>
                            <li>{"{{Source}}: Link to the current website"}</li>
                        </ul>
                    </div>
                </div>

            </Form >

        </>
    );
}

export default Anki;