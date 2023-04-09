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

  const [playStatus, setPlayStatus] = useState(false);

  // 获取用户设置的语言信息
  let Lang = useCurrentLanguage()!
  const currentLanguage = Lang['current']['name']
  const targetLanguage = Lang['target']['name']

  useEffect(() => {

  }, []);

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
    utterance.lang = languageCodes[targetLanguage]
    console.log(languageCodes[targetLanguage]);

    // 语速
    if (playStatus) {
      // 基数次播放时采用慢速播放，让用户可以听的更清楚
      utterance.rate = 0.7
    } else {
      utterance.rate = 0.9
    }
    setPlayStatus(!playStatus)

    // 开播吧
    speechSynthesis.speak(utterance);

  }

  return (
    <>
      <div id="ScouterSelection">
        <span>{props.text}</span>
        <Button style={{ display: 'inline-block' }} size="small" type="text" icon={<CustomerServiceOutlined />} onClick={speaker} />
      </div>
    </>
  );
};