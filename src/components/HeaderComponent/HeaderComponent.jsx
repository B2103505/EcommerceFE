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
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        const isLoggedIn = localStorage.getItem('userToken');

        if (isLoggedIn) {
            navigate('/account-page');
        } else {
            navigate('/sign-in');
        }

        //localStorage.removeItem('userToken'); đăng xuất xóa userToken
    };

    return (
        <div>
            <WrapperHeader gutter={16}>
                <Col span={6}>
                    <WrapperText>Plant indoor</WrapperText>
                </Col>

                <Col span={12}>
                    <ButtonInputSearch
                        size='large'
                        placeholder='input search text'
                        textBtn='Tìm kiếm'
                        backgroundInput='#fff'
                        backgroundBtn='rgb(166, 187, 211)'
                    />
                </Col>

                <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div onClick={handleRedirect} style={{ cursor: 'pointer' }}>
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
                    </div>

                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <Badge count={4} size="small">
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                        </Badge>
                        <WrapperTextSmall>Giỏ hàng</WrapperTextSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    );
}

export default HeaderComponent;