import React, { useEffect, useState, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Switch, Form, Input } from "antd";
import { FormPropsType } from "../../../types";

const { TextArea } = Input;

interface ContextMenuType extends FormPropsType {
  showImage?: boolean;
}

export const ContextMenu: React.FC<ContextMenuType> = ({
  settings,
  saveOptions,
  style,
  showImage = true,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    const loadData = async () => {
      console.log(settings);

      if (settings) {
        // 更新 默认值
        form.setFieldsValue({
          contextMenu: settings.contextMenu,
          contextMenuBlackList: settings.contextMenuBlackList,
        });
      }
    };

    loadData();
  }, [settings]);

  const handleFormChange = useDebouncedCallback((term: string) => {
    saveOptions(term);
  }, 300);

  return (
    <>
      <Form
        onValuesChange={handleFormChange}
        form={form}
        labelCol={{ span: 4 }}
        layout={style ? style["layout"] : "horizontal"}
      >
        <Form.Item
          name="contextMenu"
          valuePropName="checked"
          label="🚀Context Menu"
          extra={
            showImage ? (
              <div>
                <p>Display the menu when you select any text</p>
                <img
                  className=" w-full max-w-lg border rounded-sm"
                  src="images/contextMenu.png"
                />
              </div>
            ) : (
              ""
            )
          }
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="contextMenuBlackList"
          label="Black list"
          extra={<div></div>}
        >
          <TextArea
            placeholder="https://sspai.com&#10;flomoapp.com"
          />
        </Form.Item>
      </Form>
    </>
  );
};
