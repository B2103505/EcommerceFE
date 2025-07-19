import React from "react";
import { Button } from 'antd';

const ButtonComponent = ({ size, styleBtn, styleTextBtn, textBtn, ...rests }) => {
    const { bordered, ...cleanedRests } = rests;
    return (
        <Button style={styleBtn}
            size={size}
            {...rests}>
            <span style={styleTextBtn}>{textBtn}</span>
        </Button>
    )
}

export default ButtonComponent;