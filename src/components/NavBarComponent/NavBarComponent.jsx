import React from "react";
import { WrapperContent, WrapperLabelText, WrapperTextPrice, WrapperTextValue } from "./style";
import { Checkbox, Rate } from "antd";

const NavBarComponent = ({ children }) => {

    const renderContentNav = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option, index) => {
                    return (
                        <WrapperTextValue key={`text-${index}`}>{option}</WrapperTextValue>
                    )
                })
            case 'checkbox':
                return (
                    <Checkbox.Group
                        style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}
                        onChange={onchange}
                    >
                        {options.map((option) => {
                            return (
                                <Checkbox key={`checkbox-${option.value}`} value={option.value}>
                                    {option.label}
                                </Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option, index) => {
                    return (
                        <div key={`star-${index}`} style={{ display: 'flex' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span style={{ fontSize: '12px', marginLeft: '5px' }}>
                                {`Từ ${option} sao`}
                            </span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option, index) => {
                    return (
                        <WrapperTextPrice key={`price-${index}`}>{option}</WrapperTextPrice>
                    )
                })
            default:
                return null;
        }
    }


    return (
        <div style={{ backgroundColor: '#fff' }}>
            <WrapperLabelText>Label</WrapperLabelText>
            <WrapperContent>
                {renderContentNav('text', ['cây nội thất', 'cây bonsai', 'cây hoa cảnh', 'cây phong thủy'])}
            </WrapperContent>

            <WrapperContent>
                {renderContentNav('checkbox', [
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' }
                ])}
            </WrapperContent>

            <WrapperContent>
                {renderContentNav('star', [3, 4, 5])}
            </WrapperContent>

            <WrapperContent>
                {renderContentNav('price', ['dưới 200.000đ', 'từ 200.000-300.000đ',
                    'từ 300.000-500.000đ', 'trên 1.000.000đ'])}
            </WrapperContent>

        </div>
    )
}

export default NavBarComponent;