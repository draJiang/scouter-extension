import browser, { contextMenus } from "webextension-polyfill";

import React, {
  useEffect,
  useState,
  useRef,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import ReactDOM from "react-dom";

import * as amplitude from "@amplitude/analytics-browser";
import Nav from "./Nav";

import General from "./section/General";
import AI from "./section/AI";
import Pro from "./section/Pro";
import Anki from "./section/Anki";
import Youtube from "./section/Youtube";

import { StyleProvider } from "@ant-design/cssinjs";
import { Tabs, ConfigProvider, Layout } from "antd";
import type { TabsProps } from "antd";

import {
  ThunderboltTwoTone,
  CheckCircleTwoTone,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { getUserInfo } from "../util";

import { getSettings, saveOptions } from "./util";

import { UserInfoContext } from "../lib/userInfo";

import "./index.css";
import "../index.css";

import { lang } from "../lib/lang";

import type { RadioChangeEvent } from "antd";

import { userInfoType } from "../types";

interface BalanceResponse {
  data: {
    limit_remaining: number;
  };
}

// const languageData: LanguageObject = lang;

export const Options = () => {
  // interface UserContextType {
  //   userInfo: userInfoType;
  //   setUserInfo: Dispatch<SetStateAction<userInfoType>>;
  // }

  const defaultUserInfo = {
    userId: "",
    verified: false,
    contextMenu: false,
    contextMenuBlackList: "",
    showYoutubeButton: true,
    contentEditable: false,
  };
  // const UserContext = createContext<UserContextType>({ userInfo: defaultUserInfo, setUserInfo: () => { } });
  const [userInfo, setUserInfo] = useState<userInfoType>(defaultUserInfo);

  const [settings, setSettings] = useState<Record<string, any> | undefined>();

  const divElement = useRef<HTMLDivElement>(null);

  const tabItems = [
    {
      name: "General",
      content: <General settings={settings} saveOptions={thisSaveOptions} />,
    },
    {
      name: "Anki",
      content: <Anki settings={settings} saveOptions={thisSaveOptions} />,
    },
    {
      name: "AI",
      content: <AI settings={settings} saveOptions={thisSaveOptions} />,
    },
    {
      name: "YouTube",
      content: <Youtube settings={settings} saveOptions={thisSaveOptions} />,
    },
    {
      name: "⚡Pro",
      content: <Pro settings={settings} saveOptions={thisSaveOptions} />,
    },
  ];

  const thisGetUserStatus = (): Promise<userInfoType> => {
    return new Promise((resolve, reject) => {
      getUserInfo().then((userInfo: userInfoType) => {
        // 更新 UI
        // setVerified(userInfo.verified)

        resolve(userInfo);
      });
    });
  };

  useEffect(() => {
    (async () => {
      // 获取配置信息
      const items = await getSettings();
      setSettings(items);

      const userInfo: userInfoType = await thisGetUserStatus();
      setUserInfo(userInfo);
      const userId = userInfo.userId;

      // 数据埋点
      amplitude.init(process.env.AMPLITUDE_KEY as string, userId, {
        defaultTracking: {
          pageViews: false,
          sessions: false,
        },
      });

      amplitude.track("openOptions");
    })();
  }, []);

  async function thisSaveOptions(values: any) {
    //保存设置
    saveOptions(values);

    // 获取键值对
    const entries = Object.entries(values);

    // 遍历键值对
    for (const [key, value] of entries) {
      if (key === "newLicenseKey") {
        // 更新订阅状态
        const userInfo = await thisGetUserStatus();
        setUserInfo(userInfo);
      }
    }

    // 更新
    const items = await getSettings();
    setSettings(items);
  }

  return (
    <UserInfoContext.Provider value={{ user: userInfo, anki: null }}>
      <div className="flex flex-col items-center h-screen">
        <Nav />

        <div id="MyOptions" ref={divElement} className=" flex-1">
          <ConfigProvider
            theme={{
              // algorithm: theme.defaultAlgorithm,
              token: {
                colorPrimary: "#F08A24",
                colorLink: "#F08A24",
                colorLinkHover: "#ffc478",
                colorLinkActive: "#c96914",
              },
            }}
          >
            <Tabs
              className="w-full h-full grow"
              tabPosition={"left"}
              items={tabItems.map((item, i) => {
                const id = String(i + 1);
                return {
                  label: item.name,
                  key: id,
                  children: item.content,
                };
              })}
            />
          </ConfigProvider>
        </div>
      </div>
    </UserInfoContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <StyleProvider>
      <Options />
    </StyleProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
