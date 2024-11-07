import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Tag,
  Form,
  Select,
  Button,
  Input,
  Skeleton,
  Tooltip,
} from "antd";

import { FormPropsType, AnkiSettingType } from "../../../types";
import { ankiAction } from "../../../util";
import { useDebouncedCallback } from "use-debounce";

import { DeleteOutlined, StarOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const Anki: React.FC<FormPropsType> = ({ settings, saveOptions }) => {
  const [ankiClientIsopen, setAnkiClientIsopen] = useState<boolean>(true);
  const [ankiDeckNames, setAnkiDeckNames] = useState<Array<string> | "loading">(
    "loading"
  );
  const [ankiModelNames, setAnkiModelNames] = useState<
    Array<string> | "loading"
  >("loading");
  const [ankiModelFieldNames, setAnkiModelFieldNames] = useState<Array<string>>(
    []
  );
  const [fieldsStatus, setFieldsStatus] = useState<
    | {
        status: "loading" | "ready" | "error";
        msg: string;
        index?: number;
      }
    | undefined
  >(undefined);

  const [isScouterNote, setIsScouterNote] = useState<{
    [key: number]: boolean;
  }>({});

  const [form] = Form.useForm();
  // const [formForField] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    (async () => {
      if (settings) {
        // 更新 默认值
        // form.setFieldsValue({
        //   ankiDeckName: settings.ankiDeckName,
        //   ankiNoteName: settings.ankiNoteName,
        // });
        console.log(settings);

        let ankiSettings = settings.ankiSettings;

        
        // 设置默认值
        console.log("设置默认值 ankiSettings:");
        console.log(ankiSettings);

        form.setFieldsValue({
          ankiSettings: ankiSettings,
        });

        // formForField.setFieldsValue({
        //     ankiNoteName: settings.ankiNoteName
        // });

        checkScouterNote();
      }
    })();

    // setIsScouterNote(settings?.ankiNoteName.indexOf("Scouter") > -1);
  }, [settings]);

  useEffect(() => {
    (async () => {
      try {
        // 获取 Note 对应的 fields
        handleModelFieldNames(settings?.ankiNoteName);

        const [deckNamesResult, modelNamesResult] = await Promise.all([
          ankiAction("deckNames", 6),
          ankiAction("modelNames", 6),
        ]);

        // 处理 deckNames 结果
        if (deckNamesResult) {
          const deckNames = (deckNamesResult as any).result;
          setAnkiDeckNames(deckNames);
        }

        // 处理 modelNames 结果
        if (modelNamesResult) {
          const modelNames = (modelNamesResult as any).result;
          setAnkiModelNames(modelNames);
        }
      } catch (error) {
        setAnkiClientIsopen(false);
      }
    })();
  }, [ankiClientIsopen]);

  // Note, Fields 表单修改时
  const handleFieldsFormChange = useDebouncedCallback(
    async (changedFields, allFields) => {
      console.log("onFieldsChange===");
      console.log(changedFields);

      // 如果更改的是 ankiNoteName，则需要更新 Fileds 表单
      if (
        Array.isArray(changedFields[0].name) &&
        changedFields[0].name.includes("ankiNoteName")
      ) {
        // 设置加载状态
        setFieldsStatus({
          status: "loading",
          msg: "",
          index: changedFields[0]["name"][1],
        });

        // 获取 note 对应的 fileds 信息
        const result = await handleModelFieldNames(changedFields[0].value);

        if (!result.error) {
          const modelFieldNames = result.data;
          let filedsNamePath = changedFields[0].name as string[];
          filedsNamePath[filedsNamePath.length - 1] = "ankiFields";
          const filedsValue = modelFieldNames!.map((name) => ({
            [name]: "",
          }));
          console.log(modelFieldNames);
          form.setFieldValue(filedsNamePath, filedsValue);
          setFieldsStatus({
            status: "ready",
            msg: "",
          });
        }
      }
    },
    300
  );

  // 表单修改时
  const handleFormChange = useDebouncedCallback((term?: any) => {
    console.log("handleFormChange========:");
    console.log(form.getFieldsValue());
    // console.log(settings);
    // console.log(term);
    // console.log(term["ankiSettings"][0]);
    let values = form.getFieldsValue();
    // values = values.ankiSettings.filter((item: AnkiSettingType) => {
    //   return item && item.ankiNoteName;
    // });
    // console.log("values:");
    // console.log(values);
    saveOptions(values);
    checkScouterNote();
  }, 300);

  // Scouter 默认 note 不支持编辑
  const checkScouterNote = () => {
    const formValues = form.getFieldsValue().ankiSettings;

    const newIsScouterNote: { [key: number]: boolean } = {};
    formValues.forEach((item: any, index: number) => {
      console.log(item);

      if (item.ankiNoteName) {
        if (item.ankiNoteName.indexOf("Scouter") > -1) {
          // 如果是默认的 Note 则不支持修改 fileds
          newIsScouterNote[index] = true;
        }
      }
      // if (item && item.input1 === "special") {
      //   newIsScouterNote[index] = true;
      // } else {
      //   newIsScouterNote[index] = false;
      // }
    });

    setIsScouterNote(newIsScouterNote);
  };

  // 获取 Note 对应的 fields
  const handleModelFieldNames = async (
    noteName: string
  ): Promise<{ error: boolean; msg?: string; data?: string[] }> => {
    console.log("handleModelFieldNames");

    if (noteName) {
      // 通过 noteName 获取对应的 fileds 信息
      const modelFieldNamesResult: any = await ankiAction(
        "modelFieldNames",
        6,
        {
          modelName: noteName,
        }
      );
      if (modelFieldNamesResult.result) {
        const modelFieldNames = modelFieldNamesResult.result;
        setAnkiModelFieldNames(modelFieldNames);

        console.log("modelFieldNamesResult:");
        console.log(modelFieldNamesResult);
        handleFormChange();
        return { error: false, data: modelFieldNamesResult.result as string[] };

        // 渲染 fields 表单的默认值
        // const fieldsRecord = settings?.ankiFields;
        // if (fieldsRecord) {
        //   // 找到 ankiNoteName 对应的 fields
        //   const targetRecord = fieldsRecord.find(
        //     (item: any) => item.note === noteName
        //   );
        //   const tf = Object.keys(targetRecord.fields).reduce<{
        //     [key: string]: string;
        //   }>((obj, item) => {
        //     const v = targetRecord.fields[item];
        //     obj[item] = v ? v.replace(/<br>/g, "\n") : v;
        //     return obj;
        //   }, {});

        //   if (tf) {
        //     form.setFieldsValue(tf);
        //   }
        // }
      } else {
        alert(modelFieldNamesResult.error);
        return { error: true, msg: modelFieldNamesResult.error };
      }
    }

    return { error: false, data: [] };
  };

  return (
    <>
      {!ankiClientIsopen && (
        <div
          style={{
            color: "#f50",
            border: "1px solid #f50",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "4px",
          }}
        >
          Anki client and related settings not found. Please{" "}
          <a
            style={{ textDecorationLine: "underline" }}
            target="__blank"
            href="https://jiangzilong.notion.site/Use-the-Add-to-Anki-feature-7ab95ff8aa5e419c978e8a2a0a451324"
          >
            configure↗️
          </a>{" "}
          and try again
        </div>
      )}

      <Form
        // onFinish={}
        onValuesChange={handleFormChange}
        onFieldsChange={handleFieldsFormChange}
        form={form}
        labelCol={{ span: 4 }}
        layout="horizontal"
        initialValues={{ items: [{}] }}
      >
        <Form.List name="ankiSettings">
          {(fields, { add, remove, move }) => (
            <div className="flex flex-col gap-4">
              {fields.map(({ key, name, ...restField }, index) => (
                <Card key={key}>
                  {index == 0 && (
                    <Tag
                      className=" mb-6"
                      icon={<StarOutlined />}
                      color="orange"
                    >
                      Default{" "}
                    </Tag>
                  )}
                  <Form.Item
                    {...restField}
                    name={[name, "ankiDeckName"]}
                    label="Deck Name"
                    initialValue={undefined}
                  >
                    <Select
                      placeholder="Anki Deck Name"
                      disabled={!ankiClientIsopen}
                      loading={ankiDeckNames === "loading"}
                    >
                      {ankiDeckNames !== "loading" &&
                        ankiDeckNames.map((item) => (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "ankiNoteName"]}
                    label="Note Name"
                    initialValue={undefined}
                  >
                    <Select
                      placeholder="Anki Note Name"
                      disabled={!ankiClientIsopen}
                      loading={ankiModelNames === "loading"}
                    >
                      {ankiModelNames !== "loading" &&
                        ankiModelNames.map((item) => {
                          return (
                            <Option key={item} value={item}>
                              {" "}
                              {item}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>

                  {fieldsStatus?.status === "loading" &&
                  fieldsStatus?.index === index ? (
                    <Skeleton active />
                  ) : (
                    <Form.List name={[name, "ankiFields"]}>
                      {(subFields, subOpt) => (
                        <>
                          {subFields.map((subField, subIndex) => {
                            const fieldName =
                              Object.keys(
                                form.getFieldValue([
                                  "ankiSettings",
                                  name,
                                  "ankiFields",
                                  subIndex,
                                ]) || {}
                              )[0] || "";

                            return (
                              <Form.Item
                                key={subField.key}
                                name={[subField.name, fieldName]}
                                label={fieldName}
                              >
                                {/* <FieldInput /> */}
                                <TextArea
                                  disabled={isScouterNote[index]}
                                  autoSize={{ minRows: 2, maxRows: 4 }}
                                  placeholder={
                                    isScouterNote[index]
                                      ? "The default note is not editable"
                                      : "{{Selection}}, {{Image}}..."
                                  }
                                />
                              </Form.Item>
                            );
                          })}
                        </>
                      )}
                    </Form.List>
                  )}

                  <div className=" flex flex-row gap-3 justify-end">
                    {fields.length > 1 && (
                      // <Form.Item>
                      <Tooltip title="Delete">
                        <Button
                          className="flex items-center justify-center"
                          onClick={() => remove(name)}
                          // block
                          icon={<DeleteOutlined />}
                        />
                      </Tooltip>
                      // </Form.Item>
                    )}

                    {index !== 0 && (
                      // <Form.Item>
                      <Tooltip title="Set as Default">
                        <Button
                          className="flex items-center justify-center"
                          onClick={() => {
                            move(index, 0);
                            window.scroll({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                          icon={<StarOutlined />}
                        />
                      </Tooltip>
                      // </Form.Item>
                    )}
                  </div>

                  {/* )} */}
                </Card>
              ))}
              <Form.Item>
                <Button
                  className="flex items-center justify-center"
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  block
                >
                  Add
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
      </Form>

      {/* <Form
                // onFinish={}
                onValuesChange={handleFieldsFormChange}
                form={formForField}
                labelCol={{ span: 4 }}
                layout="horizontal"

            > */}

      <div className=" flex">
        <img
          className="w-auto h-auto max-w-xl p-4 object-contain"
          src="images/diagram.png"
        />
        <div className=" mt-11">
          <p className=" mb-3">
            You can customize the content of each field when adding to Anki. You
            can input any string, including the following dynamic variables:
          </p>
          <div className=" list-disc flex flex-col gap-1">
            <h3 className=" font-semibold">{"{{Selection}}"}</h3>
            <p>Selected text</p>

            <h3 className=" font-semibold">{"{{Sentence}}"}</h3>
            <p>Sentence containing the selected text</p>

            <h3 className=" font-semibold">{"{{Audio}}"}</h3>
            <p>Pronunciation of the selected content</p>

            <h3 className=" font-semibold">{"{{Image}}"}</h3>
            <p>Picture</p>

            <h3 className=" font-semibold">{"{{Definition}}"}</h3>
            <p>Definition of the content</p>

            <h3 className=" font-semibold">{"{{Source}}"}</h3>
            <p>Link to the current website</p>

            {/* <li>{"{{Sentence}}: Sentence containing the selected text"}</li> */}
            {/* <li>{"{{Audio}}: Pronunciation of the selected content"}</li> */}
            {/* <li>{"{{Image}}: Picture"}</li> */}
            {/* <li>{"{{Definition}}: Definition of the content"}</li> */}
            {/* <li>{"{{Source}}: Link to the current website"}</li> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Anki;
