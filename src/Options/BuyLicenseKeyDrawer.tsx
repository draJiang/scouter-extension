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
                alignItems: 'center',
                fontSize: '13px'
            }}>

                <h2 style={{ margin: 0 }}>CN¥19.99</h2>
                <div style={{ color: '#333', textAlign: 'center' }}>
                    <p>可输出相当于 1200 篇高中作文的内容</p>
                    {/* <p style={{ marginTop: '6px' }}>gpt-4、claude 等模型可选</p> */}
                </div>


                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <img style={{ width: '50%' }} src={WeChatPay} />
                    </div>
                </div>
                <p style={{ marginBottom: '8px' }}>请在付款时备注<strong>你的邮箱</strong><a style={{ marginLeft: '4px' }} target="__blank" href="https://jiang.lemonsqueezy.com/checkout/buy/848ef9ce-1d0d-42cd-88d6-5e7bc5016c1e">更多支付方式↗️</a></p>
                {/* <p style={{ margin: '0', color: '#666' }}> License Key 会发送到你的邮箱</p> */}
            </div>

            <Divider style={{ marginTop: '20px' }}>常见问题</Divider>

            <div style={{
                color: '#333'
            }}>
                <h4>付费后多久拿到许可证</h4>
                <p>北京时间 12:00 ~ 02:00 会在 30 分钟内发送到你的邮箱</p>
                <h4>许可证会过期吗</h4>
                <p>不会过期，只有当用量使用完后才会失效</p>
                <h4>联系方式</h4>
                <a href="mailto:jzlong666@gmail.com">jzlong666@gmail.com</a>
                <h4>同时填写 License Key 和 自己的 OpenAI Key 会怎么样</h4>
                <p>优先使用自己的 Key</p>
                <h4>如何退款</h4>
                <p>虚拟商品，购买后恕不退换。请谨慎购买。</p>
            </div>
        </div >
    )
}