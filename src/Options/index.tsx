import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";


import { ankiAction, getDefaultDeckName } from '../util'

import { Button, Radio, Input, Form, Divider, ConfigProvider, Select } from 'antd';

import "./index.css"
// import "../assets/tailwind.css"
import Usage from "../assets/usage.png"

import { lang } from "../lib/lang"

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


export const Options = () => {

  const [openApiKey, setOpenApiKey] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [ankiDeckNames, setAnkiDeckNames] = useState<Array<string>>(['Default']);

  const [ankiClientIsopen, setAnkiClientIsopen] = useState<boolean>(true)

  const [form] = Form.useForm();
  const { Option } = Select;


  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.



  const onSelectChange = (value: string) => {
    // console.log(`selected ${value}`);
  };

  const onSelectSearch = (value: string) => {
    // console.log('search:', value);
  };

  useEffect(() => {

    // chrome.storage.sync.remove('ankiDeckName', function () {
    //   console.log('历史记录已删除');
    // });


    let defaultDeckName = ''

    // 获取配置信息
    getSettings().then(async (items) => {
      // setOpenApiKey(items.openApiKey ?? null);

      await getDefaultDeckName().then((data: any) => {

        defaultDeckName = data.defaultDeckName

      })

      // 更新 input 文本框的默认值
      form.setFieldsValue({
        openApiKey: items.openApiKey,
        // servers: 'azureOpenAI',
        openApiEndpoint: items.openApiEndpoint,
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

      setAnkiDeckNames(result.result)

    }).catch(error => {
      setAnkiClientIsopen(false)
    })

  }, [ankiDeckNames.join(''), ankiClientIsopen])

  async function getSettings() {
    let items = await browser.storage.sync.get(["openApiKey", "openApiEndpoint", "unsplashApiKey", "currentLanguage", "targetLanguage", "ankiDeckName"])
    return items
  }

  // 保存设置
  async function saveOptions(values: any) {
    // Saves options to chrome.storage.sync.
    let setStorage = await browser.storage.sync.set(
      {
        openApiKey: values['openApiKey'],
        openApiEndpoint: values['openApiEndpoint'],
        unsplashApiKey: values['unsplashApiKey'],
        currentLanguage: values['currentLanguage'],
        targetLanguage: values['targetLanguage'],
        ankiDeckName: values['ankiDeckName']
      }
    ).then(item => {

      // Update status to let user know options were saved.
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

            <section>

              {/* <Form.Item name="servers" label="Radio.Group">
                <Radio.Group defaultValue="openAI" buttonStyle="solid" onChange={(e) => console.log(e)} style={{
                  display: 'flex'
                }}>
                  <Radio.Button style={{
                    flex: '1'
                  }} value="openAI">OpenAI</Radio.Button>
                  <Radio.Button style={{
                    flex: '1'
                  }} value="azureOpenAI">Azure OpenAI</Radio.Button>
                </Radio.Group>
              </Form.Item> */}

              <Form.Item
                name="openApiKey"
                label="🔑Your Open API Key"
              >
                <Input placeholder="We will not use your Key for any other purposes." type="password" />
              </Form.Item>


              <Form.Item
                name="openApiEndpoint"
                label="🔗API Endpoint"
                extra={
                  <p style={{
                    color: '#666'
                  }}>If you are using Azure or a third-party endpoint, please fill in the endpoint address. <a target='__blank' href='https://jiangzilong.notion.site/Set-up-your-API-Key-96266d5236fa462ca707683d9bb275c6?pvs=4'>Learn More</a></p>
                }
              >
                <Input placeholder="https://api.openai.com" type="url" />
              </Form.Item>

            </section>

            <section>

              <Form.Item
                name="currentLanguage"
                label="💬Current Language"
              >
                <Select
                  placeholder="What language do you use?"
                >

                  {Object.keys(languageData).map((item) => <Option key={item} value={item}>{languageData[item].name + '(' + item + ')'}</Option>)}

                </Select>
              </Form.Item>

              <Form.Item
                name="targetLanguage"
                label="💬What language do you want to learn"
              >
                <Select
                  placeholder="What do you want to learn"
                // onChange={onGenderChange}
                // allowClear
                >
                  {Object.keys(languageData).map((item) => <Option key={item} value={item}>{languageData[item].name + '(' + item + ')'}</Option>)}

                </Select>
              </Form.Item>

            </section>

            <section>

              <Form.Item
                name="ankiDeckName"
                label="📘Anki Deck Name"
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

            </section>

            <section>
              <div style={{ padding: '0 0 8px' }}>
                <label>⌨️Keyboard shortcut</label>
              </div>
              <a target='__blank' href='https://jiangzilong.notion.site/keyboard-shortcut-94a604055ef148a3b7c835e6436543f0?pvs=4'>Viewing and Setting Keyboard Shortcuts ↗️</a>
            </section>


            <Form.Item
              style={{
                margin: '0',
                position: 'sticky',
                bottom: 0,
                padding: '10px 0',
                display: 'flex',
                justifyContent: 'end',
                backdropFilter: 'blur(5px)'
              }}
            >
              <span style={{ marginRight: '10px' }}>{status}</span>
              <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>



          </Form>



          <Divider />

          <div className="instructions">


            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              width: '100%'
            }}>
              <Button style={{marginBottom: '14px' }} onClick={() => window.open('https://jiangzilong.notion.site/3dc5b8da86b6451296fc326c340ce6ba?v=c40102b71c3b48888ca7f37525f6a330')} >🌳 Find all Wiki</Button>
              <Button style={{marginBottom: '14px' }} onClick={() => window.open('https://discord.com/invite/7Pm3vmz87n')} >💬 Join our Discord community</Button>
              <Button style={{}} onClick={() => window.open('https://www.buymeacoffee.com/jiangzilong')} >☕ Buy me a coffee</Button>
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
