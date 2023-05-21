import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";


import { ankiAction } from '../util'

import { Button, Input, Form, Divider, ConfigProvider, Select } from 'antd';

import "./index.css"
// import "../assets/tailwind.css"
import Usage from "../assets/usage.png"

import { lang } from "../lib/lang"

export const Options = () => {

  const [openApiKey, setOpenApiKey] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [ankiDeckNames, setAnkiDeckNames] = useState<Array<string>>(['Default']);

  const [ankiClientIsopen, setAnkiClientIsopen] = useState<boolean>(true)

  const [form] = Form.useForm();
  const { Option } = Select;


  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.


  console.log(Object.keys(lang));

  const onSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSelectSearch = (value: string) => {
    console.log('search:', value);
  };

  useEffect(() => {

    console.log('options useEffect:');

    // chrome.storage.sync.remove('ankiDeckName', function () {
    //   console.log('历史记录已删除');
    // });


    let defaultDeckName = ''

    // 获取配置信息
    getSettings().then(items => {
      // setOpenApiKey(items.openApiKey ?? null);
      console.log(items);
      console.log(items.ankiDeckName);

      if (items.ankiDeckName) {
        console.log('items.ankiDeckName');

        // 如果存有历史记录
        defaultDeckName = items.ankiDeckName

      } else {
        // 如果没有历史记录

        // 获取 Anki 的牌组列表
        ankiAction('deckNames', 6).then((result: any) => {


          console.log(result);
          // 将第一个牌组作为默认牌组
          defaultDeckName = result.result[0]

          console.log(defaultDeckName);

          form.setFieldsValue({

            ankiDeckName: defaultDeckName

          });

        }).catch((error) => {

          console.log(error);

        })

      }

      console.log(defaultDeckName);

      // 更新 input 文本框的默认值
      form.setFieldsValue({
        openApiKey: items.openApiKey,
        unsplashApiKey: items.unsplashApiKey,
        currentLanguage: items.currentLanguage,
        targetLanguage: items.targetLanguage,
        ankiDeckName: defaultDeckName
      });
    })






  }, [ankiDeckNames.join('')]);

  useEffect(() => {

    // 获取 Anki 的牌组列表
    ankiAction('deckNames', 6).then((result: any) => {
      console.log(result);

      setAnkiDeckNames(result.result)

    }).catch(error => {
      setAnkiClientIsopen(false)
    })

  }, [ankiDeckNames.join(''), ankiClientIsopen])

  async function getSettings() {
    let items = await browser.storage.sync.get(["openApiKey", "unsplashApiKey", "currentLanguage", "targetLanguage", "ankiDeckName"])
    return items
  }

  async function saveOptions(values: any) {
    console.log('Options save');
    console.log(values);
    // Saves options to chrome.storage.sync.
    let setStorage = await browser.storage.sync.set(
      {
        openApiKey: values['openApiKey'],
        unsplashApiKey: values['unsplashApiKey'],
        currentLanguage: values['currentLanguage'],
        targetLanguage: values['targetLanguage'],
        ankiDeckName: values['ankiDeckName']
      }
    ).then(item => {

      // Update status to let user know options were saved.
      console.log(item);

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
              label="Your Open API Key"
            >
              <Input placeholder="We will not use your Key for any other purposes." type="password" />
            </Form.Item>

            {/* <Form.Item
              name="unsplashApiKey"
              label="Your unsplash Access Key"
            >
              <Input placeholder="We will not use your Key for any other purposes." type="password" />
            </Form.Item> */}

            <Form.Item
              name="currentLanguage"
              label="Current Language"
            >
              <Select
                placeholder="What language do you use?"
              >

                {Object.keys(lang).map((item) => <Option key={item} value={item}>{item}</Option>)}

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
                {Object.keys(lang).map((item) => <Option key={item} value={item}>{item}</Option>)}

              </Select>
            </Form.Item>

            <Form.Item
              name="ankiDeckName"
              label="Anki Deck Name"
              extra={!ankiClientIsopen && <p style={{
                color: '#666'
              }}>Anki client and related settings not found. Please <a target='__blank' href='https://jiangzilong.notion.site/Use-the-Add-to-Anki-feature-7ab95ff8aa5e419c978e8a2a0a451324'>configure</a> and try again</p>}
            >
              <Select
                placeholder="Anki Deck Name"
                disabled={!ankiClientIsopen}
              >

                {ankiDeckNames.map((item) => <Option key={item} value={item}>{item}</Option>)}


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

            <ul style={{
              marginBottom: '14px'
            }}>
              <li>
                <p>Set up your API Key</p>
                <p><a target={"_blank"} href="https://platform.openai.com/account/api-keys">Get Open API Key</a></p>
              </li>
              <li>
                <p>Select text, then right-click and choose Scouter.</p>
                <img src={Usage}></img>
              </li>
            </ul>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              width: '100%'
            }}>
              <Button style={{ width: '300px', marginBottom: '14px' }} onClick={() => window.open('https://jiangzilong.notion.site/3dc5b8da86b6451296fc326c340ce6ba?v=c40102b71c3b48888ca7f37525f6a330')} >🌳 Find all Wiki</Button>
              <Button style={{ width: '300px' }} onClick={() => window.open('https://discord.com/invite/7Pm3vmz87n')} >💬 Join our Discord community</Button>
            </div>
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
