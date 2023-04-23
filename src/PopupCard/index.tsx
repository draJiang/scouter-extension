import browser from 'webextension-polyfill'

import React, { useEffect, useState, useRef, useContext } from "react";
// import ReactDOM from "react-dom";

import ReactMarkdown from 'react-markdown'
import breaks from 'remark-breaks';


import { Nav } from "../Components/Nav"
import { Images } from "../Components/Images"

import { Selection } from "./Selection"
import { ErroTips } from "./ErroTips"

import { Skeleton, Input, ConfigProvider, theme, message, Result, Select, Form, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import settingGuide from '../assets/settingGuide.png'

import { useCurrentLanguage } from '../lib/locale'

import "./index.css"

let currentLanguage: string
let targetLanguage: string

const { TextArea } = Input;

export function PopupCard(props: any) {

  const [messages, setMessages] = useState<Array<{ content: string, role: string, loading: boolean }>>([])
  const [images, setImages] = useState([])

  const [openApiAnser, setopenApiAnser] = useState('');
  const [openApiAnser2, setopenApiAnser2] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  // standby,normal,loading,success
  const [addToAnkiStatus, setAddToAnkiStatus] = useState<string>('standby');


  const [isAnswerDone, setAnswerDone] = useState(false);

  const [isApiErro, setIsApiErro] = useState(false);

  const [isAnswerInputed, setIsAnswerInputed] = useState(false);

  const [keyWord, setKeyWord] = useState('');
  const [sentence, setSentence] = useState('');


  // 窗口拖拽逻辑
  const [dragging, setDragging] = useState(false);
  // const [position, setPosition] = useState({ x: 10, y: 10 });
  // const [offset, setOffset] = useState({ x: 0, y: 0 });

  const windowElement = useRef<HTMLDivElement>(null);
  const messagesList = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const [form] = Form.useForm();

  // const [conversationList, setConversationList] = useState<{ type: string, isLoading: boolean, content: string }[]>([{ 'type': 'ai', 'isLoading': true, 'content': '' }]);

  let Lang = useCurrentLanguage()!

  currentLanguage = Lang['current']['name']
  targetLanguage = Lang['target']['name']


  useEffect(() => {

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

    // 如果历史记录中存在记录，则不重复请求 API，直接显示历史记录的信息
    browser.storage.sync.get({ "history": [] }).then((item) => {
      // console.log(item.history);

      // 如果记录已存在，则不重复保存
      let bingo = false
      for (let i = 0; i < item.history.length; i++) {
        let obj = item.history[i]
        if (obj.keyWord === keyWord && obj.sentence === sentence) {

          if ('role' in obj) {

          } else {
            // 旧版本中因为没有存储 role ，直接显示历史数据时会导致后续流程异常
            bingo = false
            break
          }

          bingo = true

          // 直接显示历史记录中的回答
          setMessages(prevMessages => {

            const lastMessage = prevMessages[prevMessages.length - 1];
            const updatedLastMessage = {
              ...lastMessage,
              role: obj.role,
              content: obj.answer,
              loading: false
            };

            return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

          })

          setIsLoading(false)
          setAnswerDone(true)
          setAddToAnkiStatus('normal')
          break
        }
      }

      if (!bingo) {

        let systemPrompt = {
          "role": "system", "content": `作为语言老师，给你一个单词和句子，你需要：
          - 说明单词的词性
          - 解释单词在句子中的含义
          - 提供例句
          - 提供简单的翻译题
          
          让我们一步一步来，如果你是 A 语言的老师使用 B 语言教学。
          - 说明部分需要使用 B 语言。
          - 提供 A 语言的例句并显示其 B 语言的翻译。
          - 翻译题显示 B 语言的句子，要求翻译为 A 语言，句子尽量简单，翻译后的句子需要包含上述单词。
          - ## 表示标题，你需要使用 B 语言表示。
          
          ---
          例子：
          
          用户输入：
          单词：called
          句子：This syntax is called “destructuring”

          示例回复：
          
          called 是一个动词的过去分词形式，也可以作为形容词或名词使用。
          
          ## 在句子中的含义
          这里的 called 是一个被动语态的形式，表示“被称作”或“被叫做”的意思。句子的意思是“这种语法结构被称作‘解构’”。
          
          ## 例句
          
          - The movie is called “The Godfather”. - 这部电影叫做“教父”
          - I was called to the principal’s office this morning. - 我今天早上被叫去校长办公室了。
          
          ## 翻译题
          - 我刚刚打电话给我的姐姐。
          - 她的朋友们都叫她 "小兔子"。
          
          ---
          
          A 语言：${Lang['target']['name']}
          B 语言：${Lang['current']['name']}`
        }

        let userPrompt = {
          "role": "user", "content": `Word:"${keyWord}", sentence: "${sentence.length <= keyWord.length ? props.selection.anchorNode.parentNode.parentNode.innerText : sentence}"
          `
        }

        // 关键字长度较长时，按照句子进行处理
        if (keyWord.length > 20) {

          systemPrompt = {
            "role": "system", "content": `作为语言老师，给你一个句子，你需要：
            - 解释句子的语法知识
            - 提供例句
            - 提供测试题测试学生的理解程度。
            
            让我们一步一步来，如果你是 A 语言的老师使用 B 语言教学。
            - 翻译部分需要翻译为 B 语言。
            - 分析**用户提供的句子**
            - 提供 A 语言的例句并显示其 B 语言的翻译。
            
            
            下面是一个案例：
            用户提供的句子：My parents are busier than my grandparents.
            
            ## 翻译
            我的父母比我的祖父母更忙。
            
            ## 分析
            - 主语：[My parents]
            - 谓语：[are busier]
            - 比较结构：[than my grandparents]
            
            ## 例句
            1. My sister is smarter than my brother. - 我妹妹比我哥哥更聪明。
            2. This car is faster than that one. - 这辆车比那辆车跑得快。
            
            ## 练习题
            1. 翻译句子。
            The new restaurant is much busier than the old one.
            2. 把下面的句子改写为否定句和疑问句。
            My sister is taller than my brother.
            
            ---
            
            现在你是一名${Lang['target']['name']}老师，使用${Lang['current']['name']}教学。`
          }

          // userPrompt = {
          //   "role": "user", "content": `1. ${Lang['current']['Prompt2']['translate']} 2. Explanation: ${Lang['current']['Prompt2']['explanation']} 
          //     3. Example sentences: Provide 2 ${Lang['target']['name']} example sentences and show their translations. 
          //     4. Translation question: Based on the grammar knowledge points mentioned, Provide 2 simple test questions to translate the ${Lang['current']['name']} sentences into ${Lang['target']['name']}
          //     Please reply "Yes" if you understand.`
          // }

          userPrompt = {
            "role": "user", "content": `Sentence: "${keyWord}"`
          }


        }

        let prompt = [systemPrompt, userPrompt]


        // console.log(keyWord);


        getGPTMsg(prompt, 'as1', keyWord)

      }

    })

    // console.log(messagesList);

    messagesList.current?.addEventListener("scroll", handleScroll);
    return () => {
      // console.log('useEffect return');
      messagesList.current?.removeEventListener("scroll", handleScroll);
    };



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

    // console.log('openApiAnser:');

    // console.log(openApiAnser);
    // console.log(messages);

    // 只保留消息记录的第 1 条
    if (messages.length > 0) {

      // 将查询记录保存起来
      const newHistory = { 'keyWord': keyWord, 'sentence': sentence, 'role': messages[0]['role'], 'answer': messages[0]['content'], 'source': window.location.href }


      if (keyWord !== '' && sentence !== '' && messages[0]['content'] !== '') {
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
            newHistoryList.splice(10)
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

    }

  }, [isAnswerDone]);


  // 使用 type 来区分当前请求的是第 1 个答案还是 第 2 个答案，根据不同的 type 渲染不同的 UI
  const getGPTMsg = async (prompt: any, type?: string, keyWord?: string) => {

    type = type || 'as1';
    keyWord = keyWord || '';

    setIsLoading(true)
    setAddToAnkiStatus('standby')

    // 请求 background 获取数据
    // 使用长连接
    let port = browser.runtime.connect({
      name: 'popup-name'
    })

    // 在消息历史中插入新记录
    setMessages(prevMessages => [...prevMessages, { 'content': '', 'role': 'assistant', 'loading': true }])

    // 使用 postMs 发送信息
    port.postMessage({ 'type': 'getGPTMsg', 'messages': prompt, 'keyWord': keyWord })

    // 接收信息
    port.onMessage.addListener(msg => {

      // console.log('port.onMessage.addListener');

      // 请求 GPT 数据失败
      if (msg.status === 'erro') {

        // type === 'as2' ? setopenApiAnser2(msg.content) : setopenApiAnser(msg.content)
        setIsLoading(false)
        setAddToAnkiStatus('normal')

        setMessages(prevMessages => {

          const lastMessage = prevMessages[prevMessages.length - 1];
          // const newMsgList = lastMessage
          const updatedLastMessage = {
            ...lastMessage,
            content: msg.content,
            loading: false
          };
          // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
          return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

        })

        if (msg.content.indexOf('API Key error') > -1) {
          setIsApiErro(true)
        }

        scrollToBottom()

        // setIsLoading(false)
      }

      // 请求 GPT 数据成功且数据流结束传输
      if (msg.status === 'end') {

        // 记录消息回答完毕（触发保存历史记录）
        setAnswerDone(true)

        setAddToAnkiStatus('normal')
        setIsLoading(false)

      }

      // 请求 GPT 数据成功且数据流开始传输
      if (msg.status === 'begin') {

        type === 'as2' ? setopenApiAnser2('') : setopenApiAnser('')

        console.log('begin');

      }

      // 请求 GPT 数据成功且数据流传输中
      if (msg.status === 'process') {

        setMessages(prevMessages => {

          const lastMessage = prevMessages[prevMessages.length - 1];
          const newMsgList = lastMessage
          const updatedLastMessage = {
            ...lastMessage,
            content: newMsgList.content + msg.content,
            loading: false
          };
          // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
          return [...prevMessages.slice(0, prevMessages.length - 1), updatedLastMessage];

        })


        scrollToBottom()

      }

      if (msg.type === 'sendImgData') {
        console.log('sendImgData');

        if ('imgs' in msg) {
          // console.log('unsplashSearchPhotos');
          console.log('imgs:');
          console.log(msg);
          setImages(msg.imgs)
        }
      }


    })

  };

  // 发送消息
  const handleSendMessage = (values: any) => {

    // console.log(values);
    let prompt = `${Lang['current']['Prompt3']['validation']}"${values.msg}"`

    // 清空文本框
    form.resetFields();
    // 禁用发送按钮
    setIsAnswerInputed(false)


    // 将用户发言发送到消息记录中
    setMessages(prevMessages => {

      const updatedLastMessage = {
        role: 'user',
        content: values.msg,
        'loading': false
      };
      // const newMsgList = [...prevMessages.slice(0, prevMessages.length - 1), lastMessage]
      return [...prevMessages, updatedLastMessage];

    });

    // console.log(messages);

    const msgHistory = messages.slice(-5).map((item) => { return { 'role': item.role, 'content': item.content } })

    getGPTMsg([...msgHistory, { "role": "user", "content": values.msg }], 'as2')

    setTimeout(() => {
      scrollToBottom(true)
    }, 10);


  }

  // 文本框下敲击按键时
  const handleKeyDown = (event: any) => {
    // 阻止事件冒泡
    // console.log('handleKeyDown');

    event.stopPropagation()

    if (event.keyCode === 13 && !event.shiftKey) {


      // 敲击回车键
      if (!isLoading && isAnswerInputed) {
        // 非加载状态、GPT 消息发送完毕时用户可发送消息
        handleSendMessage({ 'msg': event.target.value })
      } else {
        event.preventDefault();
      }

    }
  }

  const handleFormKeyDown = (event: any) => {
    // console.log('handleFormKeyDown');

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

    if (event.target.value.length > 0) {
      setIsAnswerInputed(true)
    } else {
      setIsAnswerInputed(false)
    }
  }

  // 点击保存到 Anki
  const handleSaveToAnkiBtnClick = () => {

    setAddToAnkiStatus('loading')

    let container = ''
    let images = ''
    const stc = keyWord.length <= 20 ? sentence : ''

    if (windowElement.current) {
      // console.log(windowElement.current);
      container = windowElement.current.innerHTML
      container = windowElement.current.getElementsByClassName('messages')[0].innerHTML
      container = container.replace(/style=/g, '');
      
      images = windowElement.current.getElementsByClassName('images')[0].innerHTML

    }

    // 请求 background 将数据保存到 Anki
    const p = {
      "note": {
        "deckName": "Default",
        "modelName": "Basic",
        "fields": {
          "Front": keyWord,
          "Back": '<p>' + stc + '</p>' + images + container + '<a href="' + window.location.href + '">Source</a>'
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


  function scrollToBottom(canSroll: boolean = false) {

    if (messagesList.current !== null) {
      const isAtBottom = messagesList.current?.scrollTop + messagesList.current.clientHeight >= messagesList.current.scrollHeight - 1;

      // console.log('isAtBottom:');
      // console.log(isAtBottom);


      if (isAtBottom || canSroll) {
        // 位于底部，需要自动滚动
        messagesList.current.scrollTop = messagesList.current.scrollHeight;

      }
    }


  }

  function handleScroll() {

    if (messagesList.current !== null) {
      const isAtBottom = messagesList.current?.scrollTop + messagesList.current.clientHeight >= messagesList.current.scrollHeight - 0.5;
      if (isAtBottom) {
        // 已经位于底部，不需要自动滚动
        console.log('isAtBottom');
        return;
      } else {
        // scrollToBottom()
      }
    }
    // 未位于底部，不执行自动滚动
  }

  return (
    <div id="LearningEnglish2023"
      ref={windowElement}

      style={{
        left: 10,
        top: 10,
        color: 'rgba(0, 0, 0, 0.88)',
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

        <div className='flex-grow flex flex-col overflow-scroll'>
          <div className='flex-grow overflow-scroll'
            ref={messagesList}
            style={{ paddingTop: '44px' }}
          >

            <Selection text={keyWord} />

            <Images images={images} />

            <div
              className='messages'
              style={{
                lineHeight: '1.7em',
                wordWrap: 'break-word'
              }}
            >
              {messages.map((item) => {

                return <div className='p-4' style={item.role === 'user' ? { backgroundColor: '#F5F5F5' } : {}}>
                  <Skeleton loading={item.loading} active={true} title={false}>

                    <ReactMarkdown remarkPlugins={[breaks]} children={item.content} />

                  </Skeleton>

                </div>


                {/* return item.loading ? <div className='p-4'><Skeleton active={true} rows={1} title={false} /></div> : <div className='p-4' style={item.role === 'user' ? { backgroundColor: '#F5F5F5' } : {}}><ReactMarkdown remarkPlugins={[breaks]} children={item.content} />{isApiErro ? <img src={settingGuide} /> : ''}</div> */ }
              }



              )}
              <div className='p-4'>
                {isApiErro ? <img src={settingGuide} style={{
                  borderRadius: '4px'
                }} /> : ''}
              </div>

            </div>
          </div>
        </div>

        <div className='w-full'
          ref={inputRef}
          style={{ borderTop: '1px solid rgba(5, 5, 5, .06)' }}
        >
          <Form
            form={form}
            onFinish={handleSendMessage}
            onKeyDown={handleFormKeyDown}
            layout='inline'
            style={{ alignItems: 'center' }}
            className='p-2'
          >
            <Form.Item
              name="msg"
              style={{ margin: '0', flexGrow: '1' }}
            >
              <TextArea
                placeholder="Send a message"
                bordered={false}
                autoSize={{ minRows: 1, maxRows: 2 }}
                // onChange={handleInputChange}
                style={{
                  caretColor: '#F08A24',
                }}
                onKeyDown={handleKeyDown} onInput={onTextAreaInput}

              />

            </Form.Item>

            <Form.Item
              style={{ marginRight: '0' }}
            >
              <Button
                type="text"
                htmlType="submit"
                disabled={isLoading || !isAnswerInputed}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                icon={<SendOutlined />}
              />

            </Form.Item>

            <Form.Item
              style={{ margin: '0' }}
            >

            </Form.Item>
          </Form>
        </div>

      </ConfigProvider >

      {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="48" height="48"
            viewBox="0 0 48 48">
            <path fill="#78909c" d="M40,7v34c0,2.76-2.24,5-5,5H13c-2.76,0-5-2.24-5-5V7c0-2.76,2.24-5,5-5h22C37.76,2,40,4.24,40,7z"></path><path fill="#455a64" d="M40,26.63V41c0,2.76-2.24,5-5,5H13c-2.76,0-5-2.24-5-5V15.8C20.8,17.39,31.98,21.28,40,26.63z"></path><path fill="none" stroke="#1d323a" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M40,7	v34c0,2.76-2.24,5-5,5H13c-2.76,0-5-2.24-5-5V7c0-2.76,2.24-5,5-5h22C37.76,2,40,4.24,40,7z"></path><polygon fill="#42a5f5" points="32.987,7.58 33.194,11.285 36.365,13.215 32.905,14.558 32.049,18.169 29.703,15.293 26.004,15.596 28.014,12.476 26.583,9.051 30.172,9.999"></polygon><path fill="#42a5f5" d="M21.094,22.107l3.15,4.828c0.09,0.138,0.242,0.223,0.406,0.227l5.763,0.142	c0.414,0.01,0.637,0.491,0.377,0.814l-3.618,4.488c-0.103,0.128-0.137,0.299-0.09,0.457l1.646,5.525	c0.118,0.397-0.27,0.758-0.657,0.61l-5.386-2.054c-0.154-0.059-0.327-0.038-0.462,0.056l-4.746,3.273	c-0.341,0.235-0.804-0.023-0.783-0.437l0.289-5.757c0.008-0.164-0.065-0.322-0.196-0.422l-4.579-3.502	c-0.329-0.252-0.227-0.772,0.173-0.88l5.565-1.504c0.159-0.043,0.286-0.161,0.341-0.317l1.915-5.437	C20.341,21.823,20.868,21.76,21.094,22.107z"></path><polygon fill="none" stroke="#f7f7f7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" points="32.987,7.58 33.194,11.285 36.365,13.215 32.905,14.558 32.049,18.169 29.703,15.293 26.004,15.596 28.014,12.476 26.583,9.051 30.172,9.999"></polygon><path fill="none" stroke="#f7f7f7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M21.094,22.107l3.15,4.828c0.09,0.138,0.242,0.223,0.406,0.227l5.763,0.142c0.414,0.01,0.637,0.491,0.377,0.814l-3.618,4.488	c-0.103,0.128-0.137,0.299-0.09,0.457l1.646,5.525c0.118,0.397-0.27,0.758-0.657,0.61l-5.386-2.054	c-0.154-0.059-0.327-0.038-0.462,0.056l-4.746,3.273c-0.341,0.235-0.804-0.023-0.783-0.437l0.289-5.757	c0.008-0.164-0.065-0.322-0.196-0.422l-4.579-3.502c-0.329-0.252-0.227-0.772,0.173-0.88l5.565-1.504	c0.159-0.043,0.286-0.161,0.341-0.317l1.915-5.437C20.341,21.823,20.868,21.76,21.094,22.107z"></path>
          </svg> */}

    </div >

  );
};