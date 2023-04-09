import browser from 'webextension-polyfill'

import React, { useEffect, useState, useRef, useContext } from "react";
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import ReactDOM from "react-dom";
import ReactMarkdown from 'react-markdown'

import "../index.css"

import { Nav } from "../Components/Nav"

import { Options } from "../Options"

import { Selection } from "./Selection"
import { ErroTips } from "./ErroTips"

import { Divider, Skeleton, Input, ConfigProvider, theme, message, Result, Select, Form, Button } from 'antd';

const { TextArea } = Input;

import SettingGuide from "../assets/settingGuide.png"

import { useCurrentLanguage } from '../lib/locale'



let currentLanguage: string
let targetLanguage: string

export function PopupCard(props: any) {

  const [openApiAnser, setopenApiAnser] = useState('');
  const [openApiAnser2, setopenApiAnser2] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  // standby,normal,loading,success
  const [addToAnkiStatus, setAddToAnkiStatus] = useState<string>('standby');


  const [isAnswerDone1, setAnswerDone1] = useState(false);
  const [isUserAnswered, setIsUserAnswered] = useState(false);
  const [isAnswerDone2, setAnswerDone2] = useState(false);

  const [isErro, setIsErro] = useState(false);

  const [isAnswerInputed, setIsAnswerInputed] = useState(false);

  const [keyWord, setKeyWord] = useState('');
  const [sentence, setSentence] = useState('');

  // 窗口拖拽逻辑
  const [dragging, setDragging] = useState(false);
  // const [position, setPosition] = useState({ x: 10, y: 10 });
  // const [offset, setOffset] = useState({ x: 0, y: 0 });

  const windowElement = useRef<HTMLDivElement>(null);

  const [form] = Form.useForm<{ answer: string }>();
  const answerValue = Form.useWatch('answer', form);

  // const [conversationList, setConversationList] = useState<{ type: string, isLoading: boolean, content: string }[]>([{ 'type': 'ai', 'isLoading': true, 'content': '' }]);

  let Lang = useCurrentLanguage()!

  currentLanguage = Lang['current']['name']
  targetLanguage = Lang['target']['name']


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
      const newY = props.selection.anchorNode.parentElement.offsetTop + props.selection.anchorNode.parentElement.clientHeight + 20

      const clampedX = Math.max(minX, Math.min(newX, maxX));
      const clampedY = Math.max(minY, Math.min(newY, maxY));
      // console.log(props.selection.getRangeAt(0));

      windowElement.current.style.left = `${clampedX}px`;
      windowElement.current.style.top = `${clampedY}px`;
    }

    setKeyWord(keyWord)
    setSentence(sentence)

    // 设置加载状态
    // setIsLoading(true)

    console.log('Lang:');
    console.log(Lang);

    // 如果历史记录中存在记录，则不重复请求 API，直接显示历史记录的信息
    browser.storage.sync.get({ "history": [] }).then((item) => {
      console.log(item.history);

      // 如果记录已存在，则不重复保存
      let bingo = false
      for (let i = 0; i < item.history.length; i++) {
        let obj = item.history[i]
        if (obj.keyWord === keyWord && obj.sentence === sentence) {
          bingo = true
          // 直接显示历史记录中的回答
          setIsLoading(false)
          setopenApiAnser(obj.answer)
          setAnswerDone1(true)
          setAddToAnkiStatus('normal')
          break
        }
      }

      if (!bingo) {

        let systemPrompt = {
          "role": "system", "content": `As a language expert.
          - Please strictly adhere to the language requested by the user when providing your response.
          - Please answer the question using Markdown syntax, including but not limited to: 
            - Headings: ##, ###
            -	Lists: -, 1. 
            No additional language` }
        let userPrompt = {
          "role": "user", "content": `1. Using ${Lang['current']['name']} explanatory part of speech
            2. Explanation: ${Lang['current']['Prompt1']['explanation']}. 
            3. Example sentences: Provide ${Lang['target']['name']} example sentences with the same meaning or function, along with their translations.
            4. Translation question: Based on the word, Provide 2 simple sentences to translate the ${Lang['current']['name']} sentences into ${Lang['target']['name']}.
            Please reply "Yes" if you understand.`
        }

        let assistantPrompt = { "role": "assistant", "content": 'Yes' }
        let userPrompt2 = {
          "role": "user", "content": `Word:"${keyWord}", sentence: "${sentence.length <= keyWord.length ? props.selection.anchorNode.parentNode.parentNode.innerText : sentence}"
          `
        }


        // 关键字长度较长时，按照句子进行处理
        if (keyWord.length > 20) {

          systemPrompt = {
            "role": "system", "content": `As an AI language expert, translate the sentence, analyze the original sentence and explain the grammar involved.
            - Please strictly adhere to the language requested by the user when providing your response.
          - Please answer the question using Markdown syntax, including but not limited to: 
            - Headings: ##, ###
            -	Lists: -, 1. 
            No additional language` }

          userPrompt = {
            "role": "user", "content": `1. ${Lang['current']['Prompt2']['translate']} 2. Explanation: ${Lang['current']['Prompt2']['explanation']} 
              3. Example sentences: Provide 2 ${Lang['target']['name']} example sentences and show their translations. 
              4. Translation question: Based on the grammar knowledge points mentioned, Provide 2 simple test questions to translate the ${Lang['current']['name']} sentences into ${Lang['target']['name']}
              Please reply "Yes" if you understand.`
          }

          userPrompt2 = {
            "role": "user", "content": `Sentence: "${keyWord}"`
          }


        }

        let prompt = [systemPrompt, userPrompt, assistantPrompt, userPrompt2]


        getGPTMsg(prompt)

      }

    })

    // browser.storage.sync.get({ 'currentLanguage': 'English', 'targetLanguage': 'Spanish' }).then((result) => {
    // console.log(result);






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

  // 保存历史记录
  useEffect(() => {
    // 在 openApiAnser 更新后将其保存到浏览器存储中
    // 将查询记录保存起来
    const newHistory = { 'keyWord': keyWord, 'sentence': sentence, 'answer': openApiAnser, 'source': window.location.href }

    if (keyWord !== '' && sentence !== '' && openApiAnser !== '') {
      browser.storage.sync.get({ "history": [] }).then((item) => {

        console.log(item.history);

        let newHistoryList: any = []
        let bingo = false
        newHistoryList.push(newHistory)
        if (Array.isArray(item.history)) {

          // 如果记录已存在，则不重复保存
          for (let i = 0; i < item.history.length; i++) {
            let obj = item.history[i]
            if (obj.keyWord === newHistory['keyWord'] && obj.sentence === newHistory['sentence']) {
              bingo = true
              break
            }
          }

          newHistoryList = item.history
          newHistoryList.unshift(newHistory)
          newHistoryList.splice(50)
        }

        if (!bingo) {
          browser.storage.sync.set(
            {
              history: newHistoryList
            }
          ).then(() => {
          })
        }

      })
    }



  }, [isAnswerDone1]);


  // 使用 type 来区分当前请求的是第 1 个答案还是 第 2 个答案，根据不同的 type 渲染不同的 UI
  const getGPTMsg = async (prompt: Array<object>, type = 'as1') => {
    // // console.log(prompt);
    // return
    // console.log('getGPTMsg:');


    setIsLoading(true)

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
        if (msg.content.indexOf('API Key error') > -1) {
          setIsErro(true)
        }

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
  const onPressEnter = (values: any) => {
    // console.log(event);
    console.log(values);
    let prompt = `${Lang['current']['Prompt3']['validation']}"${values.answer}"`
    setIsUserAnswered(true)
    getGPTMsg([{ "role": "user", "content": prompt }], 'as2')

  }

  // 文本框下敲击按键时
  const handleKeyDown = (event: any) => {
    // 阻止事件冒泡
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
      // newX >= minX && newX <= maxX && newY >= minY && newY <= maxY
      if (true) {
        // setPosition({ x: clampedX, y: clampedY });
        windowElement.current.style.left = `${clampedX}px`;
        windowElement.current.style.top = `${clampedY}px`;

      } else {
        // 元素到达边界
        // const rect = windowElement.current.getBoundingClientRect();
        // const offsetX = event.clientX - rect.left;
        // const offsetY = event.clientY - rect.top;
        // windowElement.current.dataset.offsetX = String(offsetX);
        // windowElement.current.dataset.offsetY = String(offsetY);
      }

    }


  };

  const handleMouseUp = () => {
    // // console.log('PopupCard:handleMouseUp');
    setDragging(false);
  };

  // 文本框值变化时
  const onTextAreaInput = (event: any) => {

    if (event.target.value.length > 3) {
      setIsAnswerInputed(true)
    } else {
      setIsAnswerInputed(false)
    }
  }

  // 点击保存到 Anki
  const handleSaveToAnkiBtnClick = () => {



    // return 

    // console.log('Popup:handleSaveToAnkiBtnClick');

    setAddToAnkiStatus('loading')

    let container = ''
    const stc = keyWord.length <= 20 ? sentence : ''

    if (windowElement.current) {
      console.log(windowElement.current);
      container = windowElement.current.innerHTML
      container = windowElement.current.getElementsByClassName('openAIAnswer')[0].innerHTML
    }

    // 请求 background 将数据保存到 Anki
    const p = {
      "note": {
        "deckName": "Default",
        "modelName": "Basic",
        "fields": {
          "Front": keyWord,
          "Back": '<p>' + stc + '</p>' + container + '<a href="' + window.location.href + '">Source</a>'
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
          <Selection text={keyWord} />



          {/* 第一个回答 */}
          {isLoading && !isAnswerDone1 ? <Skeleton active title={false} /> : <div className="openAIAnswer" style={{}}><ReactMarkdown>{openApiAnser}</ReactMarkdown></div>}

          {/* 文本域，用来提交测试题的答案 */}
          {isAnswerDone1 ? <div className="userInput" style={
            {
              padding: '10px',
              borderRadius: '2px',
              // border:'1px solid #f0f0f0'
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }>
            <Form
              onFinish={onPressEnter}
              layout='vertical'
              form={form}
              style={{ textAlign: 'right' }}
            >
              <Form.Item
                name="answer"
                style={{ margin: '0 0 10px 0' }}
              // label="Your Answer"
              // initialValue={openApiKey}
              // help="Should be combination of numbers & alphabets"
              >
                <TextArea rows={3} placeholder="Your Answer(Exercises to help you learn better)" onKeyDown={handleKeyDown} onInput={onTextAreaInput} disabled={isUserAnswered} />
              </Form.Item>
              <Form.Item
                style={{ margin: '0' }}
              >
                <Button
                  // type="primary"
                  htmlType="submit"
                  size='small'
                  disabled={isUserAnswered || !isAnswerInputed}
                >Submit</Button>
              </Form.Item>
            </Form>

            {/* 第二个回答，针对文本域提交的回答进行评价 */}
            {isLoading && !isAnswerDone2 && isAnswerDone1 ? <Skeleton active title={false} /> : <div className="openAIAnswer" style={{}}><ReactMarkdown>{openApiAnser2}</ReactMarkdown></div>}

          </div> : ''}

          {isErro ? <img src={SettingGuide} style={{ width: '100%', borderRadius: '4px' }} /> : ''}


        </div>
      </ConfigProvider>
    </div>
  );
};