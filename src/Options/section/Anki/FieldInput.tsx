import React, { useEffect, useState, useRef } from "react";
import { Switch, Form, Select, Button, Input, Skeleton } from 'antd';

const { TextArea } = Input;

const FieldInput = () => {


    return (
        <>
            <TextArea
                autoSize={{ minRows: 2, maxRows: 4 }}
                placeholder="{{Selection}}" />
            {/* <Button>+</Button> */}
        </>
    )

}

export default FieldInput;