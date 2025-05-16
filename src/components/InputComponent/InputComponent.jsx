import React from "react";
import { Input } from 'antd';

const InputComponent = ({ size, placeholder,style, ...rests }) => {
    return (
        <Input style={{ borderRadius: 0 }}
            placeholder={placeholder}
            size={size}
            allowClear
            styles={style}
            {...rests}
        />
    )
}

export default InputComponent;