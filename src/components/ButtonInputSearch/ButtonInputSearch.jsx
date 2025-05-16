import React from "react";
import { } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
    const { size, placeholder, textBtn,
        backgroundInput, backgroundBtn, colorBtn = '#fff'
    } = props;
    return (
        <div style={{ display: 'flex', borderRadius: '0 !important' }}>
            <InputComponent style={{ borderRadius: 0 }}
                placeholder={placeholder}
                size={size}
                allowClear
                styles={{ backgroundColor: backgroundInput }}
            />
            <ButtonComponent 
                styleBtn={{ borderRadius: 0, background: backgroundBtn }}
                size={size} 
                icon={<SearchOutlined />}
                textBtn={textBtn}
                styleTextBtn = {{ color: colorBtn}}
            >
            </ButtonComponent>
        </div>
    )
}

export default ButtonInputSearch;