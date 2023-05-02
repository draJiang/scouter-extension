import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// import LanguageDetect from "languagedetect";


import { Button } from 'antd';

import { useCurrentLanguage } from '../lib/locale'
import { languageCodes } from "../lib/lang"

import {
  CustomerServiceOutlined
} from '@ant-design/icons';

interface SelectionProps {
  text: string;
}



export function Selection(props: SelectionProps) {

  const [targetLanguage, setTargetLanguage] = useState('English');
  const [playStatus, setPlayStatus] = useState(false);

  // 获取用户设置的语言信息
  let Lang = useCurrentLanguage()!


  useEffect(() => {
    setTargetLanguage(Lang['target']['name'])

    browser.storage.onChanged.addListener(onStorageChange)

    return () => {
      browser.storage.onChanged.removeListener(onStorageChange)
    };


  }, [props]);

  // 语音播报
  const speaker = () => {

    // 识别语言
    // const lngDetector = new LanguageDetect();
    // lngDetector.setLanguageType('iso2')
    // console.log(lngDetector.detect(props.text, 2));

    // 暂停上一次播报任务
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(props.text);

    // 语种
    utterance.lang = languageCodes[targetLanguage as keyof typeof languageCodes];
    // console.log(languageCodes[targetLanguage as keyof typeof languageCodes]);
    // console.log(targetLanguage);

    // 语速
    if (playStatus) {
      // 基数次播放时采用慢速播放，让用户可以听的更清楚
      utterance.rate = 0.6
    } else {
      utterance.rate = 0.85
    }
    setPlayStatus(!playStatus)

    // 开播吧
    speechSynthesis.speak(utterance);

  }

  const onStorageChange = (changes: any, area: any) => {

    // console.log(changes);

    // 更新目标语言
    if ('targetLanguage' in changes) {
      // console.log('changes');
      // console.log(changes['targetLanguage']['newValue']);
      setTargetLanguage(changes['targetLanguage']['newValue'])
    }

  }


  return (
    <>
      <div id="ScouterSelection" className='p-4'
        style={{
          paddingBottom: '0.4em'
        }}
      >
        <span>{props.text}</span>
        <Button style={{
          display: 'inline-block',
          position: 'relative',
          bottom: '2px'
        }}
          size="small" type="text" icon={<CustomerServiceOutlined />} onClick={speaker} />
      </div>
    </>
  );
};