import browser from 'webextension-polyfill'

import React, { useEffect, useState, useRef } from "react";
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import ReactDOM from "react-dom";
import ReactMarkdown from 'react-markdown'

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
  const [addToAnkiStatus, setAddToAnkiStatus] = useState<string>('standby');


  const [isAnswerDone1, setAnswerDone1] = useState(false);
  const [isUserAnswered, setIsUserAnswered] = useState(false);
  const [isAnswerDone2, setAnswerDone2] = useState(false);

  const [keyWord, setKeyWord] = useState('');
  const [sentence, setSentence] = useState('');

  // 窗口拖拽逻辑
  const [dragging, setDragging] = useState(false);
  // const [position, setPosition] = useState({ x: 10, y: 10 });
  // const [offset, setOffset] = useState({ x: 0, y: 0 });

  const windowElement = useRef<HTMLDivElement>(null);

  let currentLanguage: string
  let targetLanguage: string

  // const [conversationList, setConversationList] = useState<{ type: string, isLoading: boolean, content: string }[]>([{ 'type': 'ai', 'isLoading': true, 'content': '' }]);


  useEffect(() => {

    // New Task
    // console.log('## PopupCard useEffect')

    // 当前选中的文字
    let keyWord = props.selection.toString()

    // 选中文字所在的段落
    let sentence = props.selection.anchorNode.data

    // 设置窗口的默认位置
    if (windowElement.current) {

      // Check the boundaries
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const elementWidth = windowElement.current.clientWidth;
      const elementHeight = windowElement.current.clientHeight;

      const minX = 0;
      const minY = 0;
      const maxX = windowWidth - elementWidth;
      const maxY = windowHeight - elementHeight;

      const newX = maxX - 20
      const newY = props.selection.anchorNode.parentElement.offsetTop + props.selection.anchorNode.parentElement.clientHeight

      const clampedX = Math.max(minX, Math.min(newX, maxX));
      const clampedY = Math.max(minY, Math.min(newY, maxY));
      // console.log(props.selection.getRangeAt(0));

      windowElement.current.style.left = `${clampedX}px`;
      windowElement.current.style.top = `${clampedY}px`;
    }


    // 如果 keyWord 和 sentence 值相同，可能是选中的 keyWord 在 strong、code 等特殊标签内
    // if (sentence.length <= keyWord.length) {
    //   sentence = props.selection.anchorNode.parentNode.parentNode.innerText
    // }

    setKeyWord(keyWord)
    setSentence(sentence)

    // 设置加载状态
    setIsLoading(true)

    browser.storage.sync.get({ 'currentLanguage': 'English', 'targetLanguage': 'Spanish' }).then((result) => {
      // console.log(result);

      currentLanguage = result.currentLanguage
      targetLanguage = result.targetLanguage

      let systemPrompt = { "role": "system", "content": `As a language expert, please explain the meaning of the given vocabulary in the context of a sentence.
      - Please strictly adhere to the language requested by the user when providing your response.
      - Please answer the question using Markdown syntax, including but not limited to: 
        - Headings: ##, ###
        -	Lists: -, 1. ` }
      let userPrompt = {
        "role": "user", "content": `1. Explanation: Using ${result.currentLanguage} explain the meaning and grammatical function of a word in a sentence. 
        2. Example sentences: Provide ${result.targetLanguage} example sentences with the same meaning or function, along with their translations.
        3. Translation question: For this word, provide 2 ${result.currentLanguage} sentences that need to be translated into ${result.targetLanguage}.
        Please reply "Yes" if you understand.`
      }

      let assistantPrompt = { "role": "assistant", "content": 'Yes' }
      let userPrompt2 = {"role": "user", "content": `Word:"${keyWord}", sentence: "${sentence.length <= keyWord.length ? props.selection.anchorNode.parentNode.parentNode.innerText : sentence}"`}
      
      // 关键字长度较长时，按照句子进行处理
      if (keyWord.length > 20) {

        systemPrompt = { "role": "system", "content": `As an AI language expert, analyze the original sentence and explain the grammar involved.
        - Please strictly adhere to the language requested by the user when providing your response.
      - Please answer the question using Markdown syntax, including but not limited to: 
        - Headings: ##, ###
        -	Lists: -, 1. ` }

        userPrompt = {
          "role": "user", "content": `1. Explanation: Using ${result.currentLanguage} explain the grammar knowledge points
          2. Example sentences: Provide 2 ${result.targetLanguage} example sentences and show their translations
          3. Translation question: Based on the grammar knowledge points mentioned, provide 2 translation test questions that require translating from ${result.currentLanguage} to ${result.targetLanguage}.
          Please reply "Yes" if you understand.`
        }

        userPrompt2 = {"role": "user", "content": `Sentence: "${sentence}"`}


      }

      let prompt = [systemPrompt, userPrompt, assistantPrompt,userPrompt2]


      getGPTMsg(prompt)

    })



  }, [props]);

  // 窗口拖拽时触发
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      // console.log('useEffect return');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);


  // 使用 type 来区分当前请求的是第 1 个答案还是 第 2 个答案，根据不同的 type 渲染不同的 UI
  const getGPTMsg = async (prompt: Array<object>, type = 'as1') => {
    // // console.log(prompt);
    // return
    // console.log('getGPTMsg:');

    // 请求 background 获取数据
    // 使用长连接
    let port = browser.runtime.connect({
      name: 'popup-name'
    })

    // 使用 postMs 发送信息
    port.postMessage({ 'type': 'getGPTMsg', 'messages': prompt })

    // 接收信息
    port.onMessage.addListener(msg => {

      // console.log('port.onMessage.addListener');

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
    // console.log(event);

    // 同时按下 Shirt 时，不提交答案
    if (!event.shiftKey && event.target.defaultValue.replace(/(\r\n|\n|\r)/gm, '') !== '') {
      let prompt = `
      Regarding the test question you provided, please review my response. If there are any errors, kindly point out the reasons for the mistakes and provide the correct answer. My response is: "${event.target.defaultValue}" If my answer is unrelated to the test question, please provide the correct answer directly.
      Target language:${currentLanguage}`
      setIsUserAnswered(true)
      getGPTMsg([{ "role": "assistant", "content": openApiAnser }, { "role": "user", "content": prompt }], 'as2')

    }

  }

  // 事件处理函数，用于阻止事件冒泡
  const handleKeyDown = (event: any) => {
    event.stopPropagation()
  }

  const handleMouseDown = (event: any) => {
    // console.log('PopupCard:handleMouseDown');
    setDragging(true);

    if (windowElement.current) {
      const rect = windowElement.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      windowElement.current.dataset.offsetX = String(offsetX);
      windowElement.current.dataset.offsetY = String(offsetY);
    }

    // setOffset({ x: event.clientX - position.x, y: event.clientY - position.y });
  };

  const handleMouseMove = (event: any) => {
    // // console.log('PopupCard:handleMouseMove');
    // // console.log(dragging);


    if (dragging && windowElement.current) {

      // Use requestAnimationFrame to throttle the mousemove event handling
      // 鼠标相对窗口左上角的偏移
      const offsetX = parseFloat(windowElement.current.dataset.offsetX || '');
      const offsetY = parseFloat(windowElement.current.dataset.offsetY || '');

      const newX = event.clientX - offsetX
      const newY = event.clientY - offsetY

      // Check the boundaries
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const elementWidth = windowElement.current.clientWidth;
      const elementHeight = windowElement.current.clientHeight;

      const minX = 0;
      const minY = 0;
      const maxX = windowWidth - elementWidth;
      const maxY = windowHeight - elementHeight;

      const clampedX = Math.max(minX, Math.min(newX, maxX));
      const clampedY = Math.max(minY, Math.min(newY, maxY));

      // Only update the position if it's within the boundaries
      if (newX >= minX && newX <= maxX && newY >= minY && newY <= maxY) {
        // setPosition({ x: clampedX, y: clampedY });
        windowElement.current.style.left = `${clampedX}px`;
        windowElement.current.style.top = `${clampedY}px`;

      } else {
        // 元素到达边界
        const rect = windowElement.current.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        windowElement.current.dataset.offsetX = String(offsetX);
        windowElement.current.dataset.offsetY = String(offsetY);
      }

    }


  };

  // const getBoundaries = ()=>{

  // }

  const handleMouseUp = () => {
    // // console.log('PopupCard:handleMouseUp');
    setDragging(false);
  };



  // 点击保存到 Anki
  const handleSaveToAnkiBtnClick = () => {
    // console.log('Popup:handleSaveToAnkiBtnClick');

    setAddToAnkiStatus('loading')

    const stc = keyWord.length <= 20 ? sentence : ''

    // 请求 background 将数据保存到 Anki
    const p = {
      "note": {
        "deckName": "Default",
        "modelName": "Basic",
        "fields": {
          "Front": keyWord,
          "Back": '<p>' + stc + '</p>' + openApiAnser + '<a href="' + window.location.href + '">Source</a>'
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

      // console.log(message);

      if (message.error === null) {

        setAddToAnkiStatus('success')

      } else {
        alert(message.error)
        setAddToAnkiStatus('normal')
      }


    }

    function handleError(erro: any) {
      setAddToAnkiStatus('normal')
      // console.log(erro);
    }

  }

  return (
    <div id="LearningEnglish2023"
      ref={windowElement}

      style={{
        left: 10,
        top: 10,
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#F08A24',
          },
        }}
      >

        <Nav handleSaveToAnkiBtnClick={handleSaveToAnkiBtnClick} addToAnkiStatus={addToAnkiStatus} onMouseDown={handleMouseDown} title='Scouter' />

        <div className="contentBox">

          {/* 当前查询的文字 */}
          <Selection title={keyWord} />

          {/* 第一个回答 */}
          {isLoading && !isAnswerDone1 ? <Skeleton active title={false} /> : <div className="openAIAnswer" style={{}}><ReactMarkdown>{openApiAnser}</ReactMarkdown></div>}

          {/* 文本域，用来提交测试题的答案 */}
          {isAnswerDone1 ? <div className="userInput">
            <TextArea rows={3} placeholder="Press the Enter ⏎ key to submit." onPressEnter={onPressEnter} onKeyDown={handleKeyDown} disabled={isUserAnswered} />
          </div> : ''}

          {/* 第二个回答，针对文本域提交的回答进行评价 */}
          {isLoading && !isAnswerDone2 && isAnswerDone1 ? <Skeleton active title={false} /> : <div className="openAIAnswer" style={{}}><ReactMarkdown>{openApiAnser2}</ReactMarkdown></div>}

        </div>
      </ConfigProvider>
    </div>
  );
};