import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import ReactDOM from "react-dom";

import "../index.css"

import { Nav } from "../Components/Nav"

import { Options } from "../Options"

import { Selection } from "./Selection"
import { ErroTips } from "./ErroTips"

import { Divider, Skeleton, Input, ConfigProvider, message } from 'antd';

const { TextArea } = Input;

export function PopupCard(props: any) {

  const [openApiAnser, setopenApiAnser] = useState('');
  const [openApiAnser2, setopenApiAnser2] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  // standby,normal,loading,success
  const [addToAnkiStatus, setAddToAnkiStatus] = useState<string>('standby');


  const [isAnswerDone1, setAnswerDone1] = useState(false);
  const [isUserAnswered, setIsUserAnswered] = useState(false);
  const [isAnswerDone2, setAnswerDone2] = useState(false);

  const [keyWord, setKeyWord] = useState('');

  // const [conversationList, setConversationList] = useState<{ type: string, isLoading: boolean, content: string }[]>([{ 'type': 'ai', 'isLoading': true, 'content': '' }]);


  useEffect(() => {
    // New Task
    console.log('## PopupCard useEffect')

    // 初始化
    // setAnswerDone1(false)
    // setAnswerDone2(false)
    // setopenApiAnser(oa1 => {
    //   oa1 = ''
    //   return oa1
    // })
    // setopenApiAnser2('')

    // 当前选中的文字
    let keyWord = props.selection.toString()
    setKeyWord(keyWord)
    // 选中文字所在的段落
    let sentens = props.selection.anchorNode.data

    let prompt = `
    请解释以下句子中的'${keyWord}'，句子为：'${sentens}'
    
    - 使用 **CEFR A2** 级别的英语解释单词（请使用英文）
    - 使用图像记忆法描述单词
    - 提供两个例句以及对应的翻译，其中必须包含'${keyWord}'。
    - 最后结合你描述的知识提供'${keyWord}'相关的两个测试题。这些测试题应该将中文短语翻译为英文，但不要提供测试题的答案。
    
    请使用以下格式回复：
    
    <p><词性>（如果是单词）<使用中文解释单词在句子中的作用> <使用英文解释></p>
    
    <h3>图像记忆法描述</h3>
    <p><图像记忆法描述></p>
    
    <h3>例句</h3>：
    <ul>
    <li><例句及翻译></li>
    </ul>
    
    <h3>测试</h3>
    <ul>
    <li><测试题></li>
    </ul>
    
    `

    // 关键字长度较长时，按照句子进行处理
    if (keyWord.length > 20) {
      prompt = `Please use Chinese to respond. Analyze the following sentence, explain the grammar involved in the original sentence, and provide two examples for each knowledge point:
      "${keyWord}"
      
        Finally, create 2 test questions based on the grammar knowledge you've described. These questions should ask for the translation of a Chinese phrase to English, but don't provide the answers.
        Please respond in the following format:

        <h3><Grammar Knowledge Point></h3>
        <p><Description of the grammar knowledge></p>
        <ul>
        <li><Example sentence><translation></li>
        <li><Another example sentence><translation></li>
        </ul>

        ...

        <h3>Test Questions</h3>
        <ul>
        <li><Test question 1></li>
        <li><Test question 2></li>
        </ul>

        Please reply in Chinese.`
    }


    // 设置加载状态
    setIsLoading(true)
    getGPTMsg([{ "role": "user", "content": prompt }])

  }, [props]);


  // useEffect(() => {

  //   console.log('useFeefect isAnswerDone1');

  // }, [isAnswerDone1])

  // 使用 type 来区分当前请求的是第 1 个答案还是 第 2 个答案，根据不同的 type 渲染不同的 UI
  const getGPTMsg = async (prompt: Array<object>, type = 'as1') => {
    // return
    console.log('getGPTMsg:');

    // 请求 background 获取数据
    // 使用长连接
    let port = browser.runtime.connect({
      name: 'popup-name'
    })

    // 使用 postMs 发送信息
    port.postMessage({ 'type': 'getGPTMsg', 'messages': prompt })

    // 接收信息
    port.onMessage.addListener(msg => {

      console.log('port.onMessage.addListener');

      // 请求 GPT 数据失败
      if (msg.status === 'erro') {
        type === 'as2' ? setopenApiAnser2(msg.content) : setopenApiAnser(msg.content)
        setIsLoading(false)
      }

      // 请求 GPT 数据成功且数据流结束传输
      if (msg.status === 'end') {

        if (type === 'as2') {
          setAnswerDone2(true)
        } else {
          setAnswerDone1(true)
          setAddToAnkiStatus('normal')
        }

      }

      // 请求 GPT 数据成功且数据流开始传输
      if (msg.status === 'begin') {

        type === 'as2' ? setopenApiAnser2('') : setopenApiAnser('')
        setIsLoading(false)

      }

      // 请求 GPT 数据成功且数据流传输中
      if (msg.status === 'process') {
        // 渲染内容
        type === 'as2' ? setopenApiAnser2(oa => oa += msg.content) : setopenApiAnser(oa => oa += msg.content)

      }

    })

  };

  // 提交答案
  const onPressEnter = (event: any) => {
    console.log(event);

    // 同时按下 Shirt 时，不提交答案
    if (!event.shiftKey && event.target.defaultValue.replace(/(\r\n|\n|\r)/gm, '') !== '') {
      let prompt = `针对你提供的测试题，请检查我的回答，如果有误请指出错误的原因，最后提供正确答案，我的回答是："${event.target.defaultValue} "，如果回答和测试题无关，请直接提供测试题的答案`
      setIsUserAnswered(true)
      getGPTMsg([{ "role": "assistant", "content": openApiAnser }, { "role": "user", "content": prompt }], 'as2')

    }

  }

  // 点击保存到 Anki
  const handleSaveToAnkiBtnClick = () => {
    console.log('Popup:handleSaveToAnkiBtnClick');

    setAddToAnkiStatus('loading')


    // 请求 background 将数据保存到 Anki

    const p = {
      "note": {
        "deckName": "Default",
        "modelName": "Basic",
        "fields": {
          "Front": keyWord,
          "Back": openApiAnser
        },
        "tags": [
          "Scouter"
        ]
      }
    }

    // 发送消息给 background
    let sending = browser.runtime.sendMessage({ 'type': 'addToAnki', 'messages': p })
    sending.then(handleResponse, handleError);
    // 接收 background 的回复
    function handleResponse(message: any) {

      console.log(message);

      if (message.error === null) {

        setAddToAnkiStatus('success')

      } else {
        alert(message.error)
        setAddToAnkiStatus('normal')
      }


    }

    function handleError(erro: any) {
      setAddToAnkiStatus('normal')
      console.log(erro);
    }

  }

  return (
    <div id="LearningEnglish2023">

      <Nav handleSaveToAnkiBtnClick={handleSaveToAnkiBtnClick} addToAnkiStatus={addToAnkiStatus} title='Scouter' />

      <div className="contentBox">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#FEB825',
            },
          }}
        >
          {/* 当前查询的文字 */}
          <Selection title={keyWord} />

          {/* 第一个回答 */}
          {isLoading && !isAnswerDone1 ? <Skeleton active title={false} /> : <div className="openAIAnswer" dangerouslySetInnerHTML={{ __html: openApiAnser }} style={{}}></div>}

          {/* 文本域，用来提交测试题的答案 */}
          {isAnswerDone1 ? <div className="userInput">
            <TextArea rows={3} placeholder="Press the Enter ⏎ key to submit." onPressEnter={onPressEnter} disabled={isUserAnswered} />
          </div> : ''}

          {/* 第二个回答，针对文本域提交的回答进行评价 */}
          {isLoading && !isAnswerDone2 && isAnswerDone1 ? <Skeleton active title={false} /> : <div className="openAIAnswer" dangerouslySetInnerHTML={{ __html: openApiAnser2 }} style={{}}></div>}

        </ConfigProvider>
      </div>
    </div>
  );
};