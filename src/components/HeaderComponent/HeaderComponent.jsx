import React, { useEffect, useState } from 'react';
import { Badge, Popover } from 'antd'
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined, CameraOutlined } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../Service/UserService'
import { resetUser } from '../../redux/slice/userSlice'
import { getCartByUserId } from '../../Service/CartService'

import {
    WrapperHeader, LogoText, HeaderRight, UserInfo, SmallText, PopupItem, IconWrapper, SearchWrapper
} from "./style";

const HeaderComponent = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [cartCount, setCartCount] = useState(0);
    const userId = user?.User_Id;

    useEffect(() => {
        const fetchCart = async () => {
            if (!userId) return;
            const res = await getCartByUserId(userId);
            if (res?.status === 'OK' && Array.isArray(res.data)) {
                const totalQty = res.data.reduce((sum, item) => sum + Number(item.Cart_Item_Quantity), 0);
                setCartCount(totalQty);
            }
        };
        const handleCartChange = () => fetchCart();
        window.addEventListener('cartUpdated', handleCartChange);

        if (userId) fetchCart();
        return () => window.removeEventListener('cartUpdated', handleCartChange);
    }, [userId]);

    const handleLogout = async () => {
        await UserService.LogoutUser()
        localStorage.removeItem('access_token');
        dispatch(resetUser())
        navigate('/');
    }

    const content = () => (
        <div>
            <PopupItem onClick={() => navigate('/profile-user')}>Thông tin người dùng</PopupItem>
            <PopupItem onClick={() => navigate('/my-order')}>Quản lý đơn hàng</PopupItem>
            <PopupItem onClick={handleLogout}>Đăng xuất</PopupItem>
            {user?.isPermis && (
                <PopupItem onClick={() => navigate('/system/admin')}>Quản lý hệ thống</PopupItem>
            )}
        </div>
    );

    return (
        <WrapperHeader>
            <LogoText onClick={() => navigate('/')}>Plant Indoor</LogoText>

            <SearchWrapper>
                <ButtonInputSearch
                    size='large'
                    placeholder='Tìm kiếm cây cảnh...'
                    textBtn='Tìm kiếm'
                    backgroundInput='#fff'
                    backgroundBtn='rgb(166, 187, 211)'
                    style={{ width: '100%' }}
                    onSearch={(keyword) => {
                        if (keyword?.trim()) navigate('/search', { state: { keyword } });
                    }}
                />
            </SearchWrapper>


            <HeaderRight>
                {user?.User_Fullname ? (
                    <Popover content={content} trigger='click' placement="bottomRight">
                        <UserInfo>
                            <UserOutlined style={{ fontSize: '28px' }} />
                            <span>{user.User_Fullname}</span>
                            <CaretDownOutlined />
                        </UserInfo>
                    </Popover>
                ) : (
                    <UserInfo onClick={() => navigate('/sign-in')}>
                        <UserOutlined style={{ fontSize: '28px' }} />
                        <span>Đăng nhập / Đăng ký</span>
                        <CaretDownOutlined />
                    </UserInfo>
                )}

                <IconWrapper onClick={() => navigate('/predict')}>
                    <CameraOutlined style={{ fontSize: '28px', color: '#fff' }} />
                    <SmallText>Nhận dạng</SmallText>
                </IconWrapper>

                {user?.User_Fullname && (
                    <IconWrapper onClick={() => navigate('/cart')}>
                        <Badge count={cartCount} size="small">
                            <ShoppingCartOutlined style={{ fontSize: '28px', color: '#fff' }} />
                        </Badge>
                        <SmallText>Giỏ hàng</SmallText>
                    </IconWrapper>
                )}
            </HeaderRight>
        </WrapperHeader>
    );
};

export default HeaderComponent;
