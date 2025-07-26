// import React from "react";
// import { } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
// import InputComponent from "../InputComponent/InputComponent";
// import ButtonComponent from "../ButtonComponent/ButtonComponent";

// const ButtonInputSearch = (props) => {
//     const { size, placeholder, textBtn,
//         backgroundInput, backgroundBtn, colorBtn = '#fff'
//     } = props;
//     return (
//         <div style={{ display: 'flex', borderRadius: '0 !important' }}>
//             <InputComponent style={{ borderRadius: 0 }}
//                 placeholder={placeholder}
//                 size={size}
//                 allowClear
//                 styles={{ backgroundColor: backgroundInput }}
//             />
//             <ButtonComponent 
//                 styleBtn={{ borderRadius: 0, background: backgroundBtn }}
//                 size={size} 
//                 icon={<SearchOutlined />}
//                 textBtn={textBtn}
//                 styleTextBtn = {{ color: colorBtn}}
//             >
//             </ButtonComponent>
//         </div>
//     )
// }

// export default ButtonInputSearch;

import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
    const {
        size,
        placeholder,
        textBtn,
        backgroundInput,
        backgroundBtn,
        colorBtn = '#fff',
        onSearch
    } = props;

    const [value, setValue] = useState('');

    const handleClick = () => {
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <InputComponent
                style={{ borderRadius: 0 }}
                placeholder={placeholder}
                size={size}
                allowClear
                value={value}
                onChange={(e) => setValue(e.target.value)}
                styles={{ backgroundColor: backgroundInput }}
            />
            <ButtonComponent
                onClick={handleClick}
                styleBtn={{ borderRadius: 0, background: backgroundBtn }}
                size={size}
                icon={<SearchOutlined />}
                textBtn={textBtn}
                styleTextBtn={{ color: colorBtn }}
            />
        </div>
    );
};

export default ButtonInputSearch;
