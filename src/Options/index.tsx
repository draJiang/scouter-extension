import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { Button, Input, Form, Divider, ConfigProvider, Select } from 'antd';

import "./index.css"
import Usage from "../assets/usage.png"

export const Options = () => {

  const [openApiKey, setOpenApiKey] = useState < string | null > (null);
  const [status, setStatus] = useState < string > ("");

  const [form] = Form.useForm();
  const { Option } = Select;


  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.

  const LANGUAGES = [
    "Arabic",
    "Chinese Simplified",
    "Chinese Traditional",
    "Dutch",
    "English",
    "French",
    "German",
    "Hindi",
    "Indonesian",
    "Italian",
    "Japanese",
    "Korean",
    "Portuguese",
    "Russian",
    "Spanish",
    "Turkish"
  ]


  const onSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSelectSearch = (value: string) => {
    console.log('search:', value);
  };

  useEffect(() => {

    console.log('options useEffect:');

    // 获取配置信息
    getSettings().then(items => {
      // setOpenApiKey(items.openApiKey ?? null);

      // 更新 input 文本框的默认值
      form.setFieldsValue({ openApiKey: items.openApiKey, currentLanguage: items.currentLanguage, targetLanguage: items.targetLanguage });
    })

  }, []);

  async function getSettings() {
    let items = await browser.storage.sync.get(["openApiKey", "currentLanguage", "targetLanguage"])
    return items
  }

  async function saveOptions(values: any) {
    console.log('Options save');
    console.log(values);
    // Saves options to chrome.storage.sync.
    let setStorage = await browser.storage.sync.set(
      {
        openApiKey: values['openApiKey'],
        currentLanguage: values['currentLanguage'],
        targetLanguage: values['targetLanguage']
      }
    ).then(item => {

      // Update status to let user know options were saved.

      console.log('browser');
      setStatus(' ✅ Saved')
      setTimeout(() => {
        setStatus('')
      }, 2000);

    })

  };

  return (
    <>
      <div id="MyOptions">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#F08A24',
            },
          }}
        >
          <Form
            onFinish={saveOptions}
            layout='vertical'
            form={form}

          >

            <Form.Item
              name="openApiKey"
              // style={{ margin: '0 0 20px 0' }}
              label="Your Open API Key"
            // initialValue={openApiKey}
            // help="Should be combination of numbers & alphabets"
            >
              <Input placeholder="We will not use your Key for any other purposes." type="password" />
            </Form.Item>

            <Form.Item
              name="currentLanguage"
              label="Current Language"
            >
              <Select
                placeholder="What language do you use?"
              // onChange={onGenderChange}
              // allowClear
              >

                {LANGUAGES.map((item) => <Option value={item}>{item}</Option>)}

              </Select>
            </Form.Item>

            <Form.Item
              name="targetLanguage"
              label="What language do you want to learn"
            >
              <Select
                placeholder="What do you want to learn"
              // onChange={onGenderChange}
              // allowClear
              >
                {LANGUAGES.map((item) => <Option value={item}>{item}</Option>)}

              </Select>
            </Form.Item>

            <Form.Item
              style={{ margin: '0' }}
            >
              <Button type="primary" htmlType="submit">Save</Button>
              <span>{status}</span>
            </Form.Item>

          </Form>

          <Divider />
          <div className="instructions">
            <h2>Usage</h2>
            <h3>Set up your API Key</h3>
            <ul>
              <li>
                <p><a target={"_blank"} href="https://platform.openai.com/account/api-keys">Get Open API Key</a></p>
              </li>
              <li>
                <p>Select text, then right-click and choose Scouter.</p>
                <img src={Usage}></img>
              </li>
            </ul>
            <h3>Use the "Add to Anki" feature</h3>
            <p>This is an optional step if you need to add knowledge to Anki, you need to complete the following steps:</p>
            <ul>
              <li>Install the <a href='https://apps.ankiweb.net/'>Anki client</a></li>
              <li>Install the <a href='https://ankiweb.net/shared/info/2055492159'>AnkiConnect plugin</a></li>
            </ul>
            <p>The "Add to Anki" feature can only be used when the Anki client is open.</p>
          </div>

        </ConfigProvider>
      </div>
    </>
  );
};

// ReactDOM.render(
//   <React.StrictMode>
//     <Options />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
