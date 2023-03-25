import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { Button, Input, Form, Divider } from 'antd';

import "./index.css"
import Usage from "../assets/usage.png"

export const Options = () => {

  const [openApiKey, setOpenApiKey] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  const [form] = Form.useForm();


  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.


  useEffect(() => {

    console.log('options useEffect:');

    // 获取配置信息
    getSettings().then(items => {
      setOpenApiKey(items.openApiKey ?? null);
      console.log(openApiKey);
      console.log(items.openApiKey);

      // 更新 input 文本框的默认值
      form.setFieldsValue({ openApiKey: items.openApiKey });
    })

  }, []);

  async function getSettings() {
    let items = await browser.storage.sync.get(
      {
        openApiKey
      }
    )
    return items
  }

  async function saveOptions(values: any) {
    console.log('Options save');
    console.log(values);

    // Saves options to chrome.storage.sync.
    let setStorage = await browser.storage.sync.set(
      {
        openApiKey: values['openApiKey'],
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
            style={{ margin: '0' }}
          >
            <Button type="primary" htmlType="submit">Save</Button>
            <span>{status}</span>
          </Form.Item>

        </Form>

        <Divider />
        <div className="instructions">
          <h2>Usage</h2>
          <ul>
            <li>
              <p><a target={"_blank"} href="https://platform.openai.com/account/api-keys">Get Open API Key</a></p>
            </li>
            <li>
              <p>Select text, then right-click and choose Scouter.</p>
              <img src={Usage}></img>
            </li>
          </ul>

        </div>


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
