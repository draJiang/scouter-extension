import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { Button } from 'antd';

import { CheckCircleTwoTone } from '@ant-design/icons';

interface NoticeProps {
    type: string;
    message: string;
    actionName: string;
    action: () => void;
}

function Notice({ type, message, actionName, action }: NoticeProps) {

    const [visible, setVisible] = useState(true);

    useEffect(() => {

        if (visible) {
            // 显示 5s 后自动隐藏
            const timer = setTimeout(() => {
                hide();
            }, 5000);
            return () => clearTimeout(timer);
        }

    }, []);

    const show = () => {
        setVisible(true);
    }

    const hide = () => {
        // setVisible(false);
    }

    return (<>{visible && < div className="notice p-2 " style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        position: 'absolute',
        top: '44px',
        zIndex: '999',

    }
    }>
        <div
            className="py-2 px-4 rounded-xl shadow-xl
             border-solid border-2 border-green-600
             flex flex-row items-center bg-green-50 w-full"
        >

            <div style={{
                display: 'flex',
                flexGrow: '1'
            }}>
                <div className="mr-2">
                    {type === 'info' && <CheckCircleTwoTone twoToneColor="#059669" />}
                    {type === 'success' && <CheckCircleTwoTone twoToneColor="#059669" />}
                    {type === 'error' && <CheckCircleTwoTone twoToneColor="#059669" />}
                </div>
                <div>
                    {message}
                </div>
            </div>

            <div className="rightBtnBox">
                {actionName && <Button className="p-1" type="text" onClick={action}>{actionName}</Button>}
            </div>

        </div>
    </div >}
    </>)
}

export default Notice