import browser from 'webextension-polyfill'

import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

import * as amplitude from '@amplitude/analytics-browser';

import { ankiAction, getDefaultDeckName } from '../util'

import { BuyLicenseKeyDrawer } from './BuyLicenseKeyDrawer'
import { ProTag } from "../Components/ProTag";

import { theme, Button, Radio, Tooltip, Switch, Input, Form, Space, Divider, ConfigProvider, Select, Drawer, Tag } from 'antd';
import type { TabsProps } from 'antd';

import { ThunderboltTwoTone, CheckCircleTwoTone, InfoCircleOutlined } from '@ant-design/icons';

import { getSettings } from './util'

import "./index.css"

import { getBalance, getUserInfo } from '../util'

import { lang } from "../lib/lang"

import { models } from "./models"

import type { RadioChangeEvent } from 'antd';
import { Timeout } from 'microsoft-cognitiveservices-speech-sdk/distrib/lib/src/common/Timeout';

import { userInfoType } from '../types'

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

interface BalanceResponse {
  data: {
    limit_remaining: number;
  };
}


let USER_INFO: userInfoType


const languageData: LanguageObject = lang;


export const Options = () => {

  const [radioValue, setRadioValue] = useState<string | null>('myOwnOpenAiKey');
  const [verified, setVerified] = useState<boolean | null>(false);

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isUseOpenAIKey, setIsUseOpenAIKey] = useState(true);

  const [status, setStatus] = useState<string>("");
  const [ankiDeckNames, setAnkiDeckNames] = useState<Array<string>>(['Default']);

  const [ankiClientIsopen, setAnkiClientIsopen] = useState<boolean>(true)

  const [form] = Form.useForm();
  const divElement = useRef<HTMLDivElement>(null);

  const { Option } = Select;


  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.

  const KeyActive = () => {
    return (
      <Tooltip placement="top" title={'In use'} arrow={true}>

        <ThunderboltTwoTone twoToneColor='#F08A24' style={{ marginRight: '4px', position: 'absolute', right: '-20px' }} />
      </Tooltip>
    )
  }

  const onTabsChange = (key: string) => {

  };

  const onSelectChange = (value: string) => {
    // console.log(`selected ${value}`);
  };

  const onSelectSearch = (value: string) => {
    // console.log('search:', value);
  };

  const onRadioChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value)
  };

  const openBuyLicenseKeyDrawer = (isOpen: boolean) => {
    setPopoverOpen(isOpen)

    if (isOpen) {
      amplitude.track('openBuyLicenseKeyDrawer');
    }
  }


  useEffect(() => {

    // chrome.storage.sync.remove('ankiDeckName', function () {
    //   console.log('历史记录已删除');
    // });

    thisGetUserStatus().then((userInfo: userInfoType) => {

      const userId = userInfo.userId

      // 数据埋点
      amplitude.init(process.env.AMPLITUDE_KEY as string, userId, {
        defaultTracking: {
          pageViews: false,
          sessions: false,
        },
      });

      amplitude.track('openOptions');

    })

    // 数据埋点
    // getUserInfo().then((userInfo: userInfoType) => {

    //   USER_INFO = userInfo
    //   const userId = userInfo.userId

    //   // 数据埋点
    //   amplitude.init(process.env.AMPLITUDE_KEY as string, userId, {
    //     defaultTracking: {
    //       pageViews: false,
    //       sessions: false,
    //     },
    //   });

    //   amplitude.track('openOptions');

    // })




    let defaultDeckName = ''



    // 获取配置信息
    getSettings().then(async (items) => {
      // setOpenApiKey(items.openApiKey ?? null);
      console.log(items);


      if (items.apiKeySelection === 'chatGPTWeb') {
        // 显示 licenseKey
        setRadioValue('chatGPTWeb')
      } else if (items.apiKeySelection === 'myOwnOpenAiKey') {
        // 显示 openApiKey
        setRadioValue('myOwnOpenAiKey')
      } else {
        setRadioValue('licenseKey')
      }

      await getDefaultDeckName().then((data: any) => {

        defaultDeckName = data.defaultDeckName

      })

      // 获取 Token
      // thisGetBalance(items.licenseKey)


      // 更新 input 文本框的默认值
      form.setFieldsValue({
        openApiKey: items.openApiKey,
        apiKeySelection: items.apiKeySelection,
        openApiEndpoint: items.openApiEndpoint,
        unsplashApiKey: items.unsplashApiKey,
        currentLanguage: items.currentLanguage,
        targetLanguage: items.targetLanguage,
        ankiDeckName: defaultDeckName,
        licenseKey: items.licenseKey,
        chatGPTWeb: items.chatGPTWeb,
        model: items.model,
        newLicenseKey: items.newLicenseKey,
        contextMenu: items.contextMenu
      });


    })


  }, []);

  useEffect(() => {

    // 获取 Anki 的牌组列表
    ankiAction('deckNames', 6).then((result: any) => {

      setAnkiDeckNames(result.result)

    }).catch(error => {
      setAnkiClientIsopen(false)
    })

  }, [ankiDeckNames.join(''), ankiClientIsopen])

  // 保存设置
  async function saveOptions(values: any) {


    // if (values['openApiKey'] === '' || values['openApiKey'] === undefined) {
    //   // 使用 licenseKey
    //   setIsUseOpenAIKey(false)
    // } else {
    //   // 使用 openApiKey
    //   setIsUseOpenAIKey(true)
    // }

    console.log(values);

    // Saves options to chrome.storage.sync.
    let setStorage = await browser.storage.sync.set(
      {
        openApiKey: values['openApiKey'],
        openApiEndpoint: values['openApiEndpoint'],
        unsplashApiKey: values['unsplashApiKey'],
        currentLanguage: values['currentLanguage'],
        targetLanguage: values['targetLanguage'],
        ankiDeckName: values['ankiDeckName'],
        licenseKey: values['licenseKey'],
        chatGPTWeb: values['chatGPTWeb'],
        model: values['model'],
        apiKeySelection: values['apiKeySelection'],
        newLicenseKey: values['newLicenseKey'],
        contextMenu: values['contextMenu']
      }
    ).then(item => {

      // Update status to let user know options were saved.
      setStatus(' ✅ Saved')

      setTimeout(() => {
        setStatus('')
      }, 2000);

    })

    // thisGetBalance(values['licenseKey'])

    // 更新订阅状态
    thisGetUserStatus()

  };

  const thisGetUserStatus = (): Promise<userInfoType> => {

    return new Promise((resolve, reject) => {

      getUserInfo().then((userInfo: userInfoType) => {

        // 更新 UI
        setVerified(userInfo.verified)


        resolve(userInfo)

      })

    })





  }

  return (
    <>
      <div id="MyOptions"
        ref={divElement}
      >
        <ConfigProvider
          theme={{
            // algorithm: theme.defaultAlgorithm,
            token: {
              colorPrimary: '#F08A24',
              colorLink: "#F08A24",
              colorLinkHover: "#ffc478",
              colorLinkActive: "#c96914"
              // colorText: "#F08A24"
            },
            // components: {
            //   Button: {
            //     colorPrimary: '#F08A24',
            //   },
            // },
          }}
        >

          <Form

            onFinish={saveOptions}
            layout='vertical'
            form={form}

          >

            <section style={{
              border: '1px solid #ffd9a1',
              backgroundColor: '#fffaf0'
            }}>
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

                    {/* <a style={{
                      paddingLeft: '2px',
                      paddingRight: '0',
                    }} onClick={() => { openBuyLicenseKeyDrawer(true) }} >Get License⚡</a> */}

                  </div>
                }
              >
                <Input style={{ paddingLeft: '5px' }} prefix={<span style={{ marginRight: '4px' }}> <ProTag /></span>} suffix={verified && <CheckCircleTwoTone twoToneColor="#52c41a" />} placeholder="License Key" type="password" />
              </Form.Item>
            </section>


            <section style={{
              // padding: '0px 20px 20px 20px'
            }}>


              <Form.Item
                name="apiKeySelection"
                label="🔋In use"
              >
                <Radio.Group onChange={onRadioChange} value={radioValue} style={{ marginBottom: 0, display: 'flex' }}>

                  <Radio.Button value="myOwnOpenAiKey" style={{ flex: '1', textAlign: 'center' }}>OpenAI</Radio.Button>
                  <Radio.Button value="licenseKey" style={{ flex: '1', textAlign: 'center' }}>OpenRouter</Radio.Button>
                  <Radio.Button value="chatGPTWeb" style={{ flex: '1', textAlign: 'center' }}>ChatGPT</Radio.Button>

                </Radio.Group>
              </Form.Item>

              {/* myOwnOpenAiKey */}
              <div style={{
                display: radioValue === 'myOwnOpenAiKey' ? 'block' : 'none'
              }}>
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
                    }}>If you are using <strong>Azure</strong> or a third-party endpoint, please fill in the endpoint address. <a target='__blank' href='https://jiangzilong.notion.site/Set-up-your-API-Key-96266d5236fa462ca707683d9bb275c6?pvs=4'>Learn More↗️</a></p>
                  }
                >
                  <Input placeholder="https://api.openai.com" type="url" />
                </Form.Item>
              </div>

              {/* OpenRouter */}
              <div style={{
                display: radioValue === 'licenseKey' ? 'block' : 'none'
              }}>
                <Form.Item
                  name="licenseKey"
                  label="🔑Key"
                  style={{ marginBottom: '16px' }}
                >
                  <Input placeholder="We will not use your Key for any other purposes." type="password" />
                </Form.Item>

                <Form.Item
                  name="model"
                  label="🤖Model"
                >
                  <Select
                    placeholder=""
                    defaultValue={models[0]['name']}
                  >

                    {models.map((item) => <Option key={item.id} value={item.id}>{item.name}</Option>)}

                  </Select>

                </Form.Item>

              </div>

              {/* chatGPTWeb */}
              <div style={{
                display: radioValue === 'chatGPTWeb' ? 'block' : 'none',
                color:'#F08A24'
              }}>
                ⚠️Sorry, this feature is temporarily unavailable.
              </div>


            </section>

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

              <Form.Item
                name="contextMenu"
                valuePropName="checked"
                label="🚀Context Menu"
                extra={<p>Display the menu when you select any text</p>}
              >
                <Switch />

              </Form.Item>

            </section>

            <Form.Item
              style={{
                margin: '0',
                position: 'sticky',
                bottom: 0,
                padding: '14px 0',
                display: 'flex',
                backdropFilter: 'blur(5px)',
                justifyContent: 'end'
              }}
            >
              <span style={{ marginRight: '10px' }}>{status}</span>
              <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>



          </Form>

          <Drawer
            title={'Get License'}
            placement="bottom"
            maskClosable={true}
            closable={false}
            height={'80%'}
            // onClose={onClose}
            open={isPopoverOpen}

            bodyStyle={{
              overscrollBehavior: 'contain'
            }}
            extra={
              <Space>

                <Button style={{ zIndex: '9' }} onClick={() => openBuyLicenseKeyDrawer(false)}>Cancel</Button>

                {/* <Button type="primary">
                  OK
                </Button> */}

              </Space>
            }
          >

            <BuyLicenseKeyDrawer />

          </Drawer>



          <Divider />

          <div className="instructions">


            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              width: '100%'
            }}>
              <Button style={{ marginBottom: '14px' }} onClick={() => window.open('https://jiangzilong.notion.site/3dc5b8da86b6451296fc326c340ce6ba?v=c40102b71c3b48888ca7f37525f6a330')} >🌳 Find all Wiki</Button>
              <Button style={{ marginBottom: '14px' }} onClick={() => window.open('https://discord.com/invite/7Pm3vmz87n')} >💬 Join our Discord community</Button>
              <Button style={{ marginBottom: '14px' }} onClick={() => window.open('mailto:jzlong666@gmail.com?subject=%5BScouter%20-%20feedback%5D&body=')} >📫 Feedback</Button>
              {/* <Button style={{}} onClick={() => window.open('https://www.buymeacoffee.com/jiangzilong')} >☕ Buy me a coffee</Button> */}
              {/* <div style={{
                display: 'flex',
                justifyContent: 'center'
              }}>
                <img src='https://raw.githubusercontent.com/draJiang/scouter-extension/master/src/assets/weChatGroup.png' />
              </div> */}
            </div>
          </div>



        </ConfigProvider>
      </div >
    </>
  );
};

// ReactDOM.render(
//   <React.StrictMode>
//     <Options />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
