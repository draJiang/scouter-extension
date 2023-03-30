import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import ReactDOM from "react-dom";

import "../index.css"

import { Nav } from "../Components/Nav"

import { Options } from "../Options"

import { Selection } from "./Selection"
import { ErroTips } from "./ErroTips"

import { Divider, Skeleton, Input, ConfigProvider, message, Result, Select } from 'antd';

const { TextArea } = Input;

export function PopupCard(props: any) {

  const [openApiAnser, setopenApiAnser] = useState('');
  const [openApiAnser2, setopenApiAnser2] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  // standby,normal,loading,success
  const [addToAnkiStatus, setAddToAnkiStatus] = useState < string > ('standby');


  const [isAnswerDone1, setAnswerDone1] = useState(false);
  const [isUserAnswered, setIsUserAnswered] = useState(false);
  const [isAnswerDone2, setAnswerDone2] = useState(false);

  const [keyWord, setKeyWord] = useState('');
  const [sentence, setSentence] = useState('');

  // const [conversationList, setConversationList] = useState<{ type: string, isLoading: boolean, content: string }[]>([{ 'type': 'ai', 'isLoading': true, 'content': '' }]);


  useEffect(() => {
    // New Task
    console.log('## PopupCard useEffect')

    // 当前选中的文字
    let keyWord = props.selection.toString()
    
    // 选中文字所在的段落
    let sentence = props.selection.anchorNode.data


    // 如果 keyWord 和 sentence 值相同，可能是选中的 keyWord 在 strong、code 等特殊标签内
    if (sentence.length <= keyWord.length) {
      sentence = props.selection.anchorNode.parentNode.parentNode.innerText
    }

    setKeyWord(keyWord)
    setSentence(sentence)

    // 设置加载状态
    setIsLoading(true)

    browser.storage.sync.get({'currentLanguage':'English','targetLanguage':'Spanish'}).then((result) => {
      console.log(result);

      let prompt = `Please provide your responses in ${result.currentLanguage} for all of the following:
      - Please explain the meaning of the word '${keyWord}' in the following sentence using ${result.currentLanguage}:
      "${sentence}"
      - Provide two example sentences, both of which must contain the word '${keyWord}', along with their translations. Please provide the sentences first in ${result.targetLanguage}, followed by the translations in ${result.currentLanguage}.
      - Provide two ${result.currentLanguage} to ${result.targetLanguage} translation test questions based on appeals, both of which must contain the word '${keyWord}'. Please do not provide the answers to the test questions.

      sentence is sentence

      Please format your responses as follows:
      
      <Explanation in ${result.currentLanguage}>
      <h3>Example Sentences</h3>
      <ul>
        <li><Sentence 1 in ${result.targetLanguage}> - <Translation 1 in ${result.currentLanguage}></li>
        <li><Sentence 2 in ${result.targetLanguage}> - <Translation 2 in ${result.currentLanguage}></li>
      </ul>
      <h3>Translation Test Questions</h3>
      <ul>
        <li><Test Question 1 in ${result.currentLanguage}></li>
        <li><Test Question 2 in ${result.currentLanguage}></li>
      </ul>
      `

      // 关键字长度较长时，按照句子进行处理
      if (keyWord.length > 20) {
        prompt = `Please provide your responses in ${result.currentLanguage} for all of the following:
          - Analyze the following sentence, explain the grammar involved in the original sentence using ${result.currentLanguage}, and provide two examples for each knowledge point:
          "${keyWord}"
          - Finally, create 2 test questions based on the grammar knowledge you've described. These questions should ask for the translation of a ${result.currentLanguage} phrase to ${result.targetLanguage}, but don't provide the answers.
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
          </ul>`
      }

      getGPTMsg([{ "role": "user", "content": prompt }])

    })



  }, [props]);


  // useEffect(() => {

  //   console.log('useFeefect isAnswerDone1');

  // }, [isAnswerDone1])


  // 使用 type 来区分当前请求的是第 1 个答案还是 第 2 个答案，根据不同的 type 渲染不同的 UI
  const getGPTMsg = async (prompt: Array<object>, type = 'as1') => {
    // console.log(prompt);
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

    const stc = keyWord.length <= 20 ? sentence : ''

    // 请求 background 将数据保存到 Anki
    const p = {
      "note": {
        "deckName": "Default",
        "modelName": "Basic",
        "fields": {
          "Front": keyWord,
          "Back": '<p>'+stc+'</p>' + openApiAnser + '<a href="' + window.location.href + '">Source</a>'
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