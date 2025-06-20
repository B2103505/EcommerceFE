import React from "react";
import { Badge, Col } from 'antd'
import {
    WrapperHeader, WrapperText,
    WrapperHeaderAccount, WrapperTextSmall
} from "./style";
import {
    CaretDownOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";

const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader gutter={16}>
                <Col span={4}>
                    <WrapperText>Plant indoor</WrapperText>
                </Col>
                <Col span={14}>
                    <ButtonInputSearch
                        size='large'
                        placeholder='input search text'
                        textBtn='Tìm kiếm'
                        backgroundInput='#fff'
                        backgroundBtn='rgb(166, 187, 211)'
                    />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <WrapperHeaderAccount>
                        <UserOutlined style={{ fontSize: '30px' }} />
                        <div>
                            <span>Đăng ký / Đăng nhập</span>
                            <div>
                                <span>Tài khoản</span>
                                <CaretDownOutlined />
                            </div>
                        </div>
                    </WrapperHeaderAccount>
                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <Badge count={4} size="small">
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                        </Badge>
                        <WrapperTextSmall>Giỏ hàng</WrapperTextSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent;