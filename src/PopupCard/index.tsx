import React, { useEffect, useState } from "react";
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import ReactDOM from "react-dom";

import "../index.css"

import { Nav } from "../Components/Nav"

import { Options } from "../Options"

import { Selection } from "./Selection"
import { ErroTips } from "./ErroTips"

import { Divider, Skeleton, Input } from 'antd';

const { TextArea } = Input;

export function PopupCard(props: any) {

  const [openApiAnser, setopenApiAnser] = useState('');
  const [openApiAnser2, setopenApiAnser2] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [isAnswerDone1, setAnswerDone1] = useState(false);
  const [isAnswerDone2, setAnswerDone2] = useState(false);

  const [keyWord, setKeyWord] = useState('');

  // const [conversationList, setConversationList] = useState<{ type: string, isLoading: boolean, content: string }[]>([{ 'type': 'ai', 'isLoading': true, 'content': '' }]);



  useEffect(() => {
    // New Task
    console.log('## PopupCard useEffect')

    // 初始化
    setAnswerDone1(false)
    setAnswerDone2(false)
    setopenApiAnser2('')

    // 当前选中的文字
    let keyWord = props.selection.toString()
    setKeyWord(keyWord)
    // 选中文字所在的段落
    let sentens = props.selection.anchorNode.data

    let prompt = `我想学习有关'${keyWord}'相关的英语知识
    * 请解释'${keyWord}'在下面句子中的作用
    * 请使用 CEFR A2 级别的英语解释单词（注意这个解释要用英文）
    * 使用图像记忆法描述单词
    * 请提供 3 个例句。
    * 最后提供'${keyWord}'相关的 2 道测试题，要求将中文短句翻译为英文，(你作为 AI 模型不要提供测试题的答案)。\
    这个句子是：'${sentens}'
    请用下面的格式回复：
    <词性>（如果是单词）<使用中文解释> <使用英文解释>
    # 图像记忆：
    <图像记忆法描述>
    # 例句：
    <例句>
    # 测试：
    <测试题>
    `

    getGPTMsg(prompt)
    console.log(props);

  }, [props]);

  const getGPTMsg = async (prompt: string, type = 'as1') => {
    console.log('getGPTMsg:');

    // 设置加载状态
    setIsLoading(true)

    // 请求 background 获取数据
    // 使用长连接
    // 使用长连接
    let port = chrome.runtime.connect({
      name: 'popup-name'
    })

    // 使用postMs 发送信息
    port.postMessage({ 'type': 'getGPTMsg', 'msg': '给 background 传递信息~', 'prompt': prompt })

    // 接收信息
    port.onMessage.addListener(msg => {

      if (msg.status === 'erro') {
        type === 'as2' ? setopenApiAnser2(msg.content) : setopenApiAnser(msg.content)
      }

      if (msg.status === 'end') {

        type === 'as2' ? setAnswerDone2(true) : setAnswerDone1(true)

      }

      if (msg.status === 'begin') {

        type === 'as2' ? setopenApiAnser2('') : setopenApiAnser('')
        setIsLoading(false)

      }

      if (msg.status === 'process') {
        // 渲染内容
        if (type === 'as2') {
          setopenApiAnser2(oa => oa += msg.content)
        } else {
          setopenApiAnser(oa => oa += msg.content)
        }
      }


    })



  };

  // 提交答案
  const onPressEnter = (event: any) => {
    console.log(event);

    const a = 'hello'
    // 同时按下 Shirt 时，不提交答案
    if (!event.shiftKey && event.target.defaultValue.replace(/(\r\n|\n|\r)/gm, '') !== '') {
      let prompt = `请检查我的语法和单词是否有误："${event.target.defaultValue} "`

      console.log(prompt);

      getGPTMsg(prompt, 'as2')
    }

  }

  return (
    <div id="LearningEnglish2023">

      <Nav title='Scouter' />
      <div className="contentBox">
        <Selection title={keyWord} />

        {/* <Divider style={{ margin: '10px 0' }} /> */}

        {isLoading && !isAnswerDone1 ? <Skeleton active /> : <div className="openAIAnswer" style={{ whiteSpace: 'pre-wrap' }}>
          {openApiAnser.replace(/\n\n/g, "\n").replace(/(^\s*)|(\s*$)/g, "")}
        </div>}

        {isAnswerDone1 ? <div className="userInput">
          <TextArea rows={3} placeholder="Press the Enter ⏎ key to submit." onPressEnter={onPressEnter} disabled={isLoading || isAnswerDone2} />
        </div> : ''}

        {isLoading && !isAnswerDone2 && isAnswerDone1 ? <Skeleton active /> : <div className="openAIAnswer" style={{ whiteSpace: 'pre-wrap' }}>
          {openApiAnser2.replace(/\n\n/g, "\n").replace(/(^\s*)|(\s*$)/g, "")}
        </div>}

        {/* <Options /> */}
      </div>
    </div>
  );
};

function ConversationItem(props: any) {
  console.log('hello');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('## ConversationItem useEffect');
    console.log(props);

  }, [props]);

  return (

    <li>{props.isLoading ?
      <Skeleton active /> : props.type === 'ai' ?
        props.content : <HumanInput content={props.content} />}</li>
  )

}

function HumanInput(props: any) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('## ConversationItem useEffect');
    console.log(props);

  }, [props]);

  return (
    <span>human input</span>
  )

}