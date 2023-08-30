import React, { useEffect, useState, useRef } from "react";
import { Tag } from 'antd';

export function ProTag() {
    return (
        <Tag style={{
            height: '80%',
            display: 'flex',
            alignItems: 'center',
            margin: '0',
            lineHeight: 'inherit'
        }} color="orange">Pro</Tag>
    )
}