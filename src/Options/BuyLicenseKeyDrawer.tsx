import React, { useEffect } from "react";

import { Divider } from 'antd';

import AliPay from '../assets/AliPay.png'
import WeChatPay from '../assets/WeChatPay.png'

export function BuyLicenseKeyDrawer() {


    useEffect(() => {

    })


    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

                <h2>CN¥29.99/月</h2>

                <div style={{
                    display: 'flex'
                }}>
                    <div style={{ flex: '1', marginRight: '10px' }}>
                        <img style={{ width: '100%' }} src={WeChatPay} />
                    </div>
                    <div style={{ flex: '1' }}>
                        <img style={{ width: '100%' }} src={AliPay} />
                    </div>
                </div>
                <p>请在付款时备注：<code>scouter - 你的邮箱</code></p>
            </div>

            <Divider style={{ marginTop: '20px' }}>常见问题</Divider>

            <div style={{
                color: '#333'
            }}>
                <h4>付费后多久拿到许可证</h4>
                <p>北京时间 12:00 ~ 02:00 通常会在 30 分钟内发送到你的邮箱</p>
                <h4>联系方式</h4>
                <a href="mailto:jzlong666@gmail.com">jzlong666@gmail.com</a>
                <h4>如何退款</h4>
                <p>虚拟商品，购买后恕不退换。请谨慎购买。</p>
            </div>
        </div >
    )
}