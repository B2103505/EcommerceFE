import React, { useEffect, useState } from 'react';
import { Badge, Col, Popover } from 'antd'
import {
    WrapperHeader, WrapperText,
    WrapperHeaderAccount, WrapperTextSmall,
    WrapperTextPopupUser
} from "./style";
import {
    CaretDownOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../Service/UserService'
import { resetUser } from '../../redux/slice/userSlice'
import { getCartByUserId } from '../../Service/CartService'

const HeaderComponent = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [cartCount, setCartCount] = useState(0);
    const userId = useSelector(state => state.user.User_Id);
    console.log('user', userId)

    // useEffect(() => {
    //     const fetchCart = async () => {
    //         try {
    //             if (!userId) return;
    //             const res = await getCartByUserId(userId);
    //             if (res?.status === 'OK' && Array.isArray(res.data)) {
    //                 const totalQty = res.data.reduce((sum, item) => {
    //                     return sum + Number(item.Cart_Item_Quantity);
    //                 }, 0);
    //                 setCartCount(totalQty);
    //             }
    //         } catch (err) {
    //             console.error('Error fetching cart:', err);
    //         }
    //     };

    //     fetchCart();
    // }, [userId]);

    useEffect(() => {
        const fetchCart = async () => {
            if (!userId) return;
            const res = await getCartByUserId(userId);
            if (res?.status === 'OK' && Array.isArray(res.data)) {
                const totalQty = res.data.reduce((sum, item) => sum + Number(item.Cart_Item_Quantity), 0);
                setCartCount(totalQty);
            }
        };

        const handleCartChange = () => {
            fetchCart();
        };

        window.addEventListener('cartUpdated', handleCartChange);

        // Initial fetch
        if (userId) {
            fetchCart();
        }

        return () => {
            window.removeEventListener('cartUpdated', handleCartChange);
        };
    }, [userId]);

    const handleLogout = async () => {
        // setLoading(true)
        await UserService.LogoutUser()
        localStorage.removeItem('access_token');
        dispatch(resetUser())
        navigate('/');
        // setLoading(false)
    }

    const handleGetDetail = async () => {
        console.log('detail user', user)
        navigate('/profile-user')
    }

    const content = () => {
        return (
            <div>
                {user?.isPermis && (
                    <WrapperTextPopupUser onClick={() => navigate('/system/admin')}>Quản lý hệ thống</WrapperTextPopupUser>
                )}
                <WrapperTextPopupUser onClick={handleGetDetail}>Thông tin người dùng</WrapperTextPopupUser>
                <WrapperTextPopupUser onClick={handleLogout}>Đăng xuất</WrapperTextPopupUser>
            </div>
        )
    }
    const handleRedirect = () => {
        navigate('/sign-in');
    };

    const handleCart = () => {
        navigate('/cart');
    };

    return (
        <div>
            <WrapperHeader gutter={16}>
                <Col span={6} onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}>
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
                    <div style={{ cursor: 'pointer' }}>
                        <WrapperHeaderAccount>
                            <UserOutlined style={{ fontSize: '30px' }} />
                            {user?.User_Fullname ? (
                                <>
                                    <Popover content={content} trigger='click'>
                                        <div>{user.User_Fullname}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleRedirect}>
                                    <span>Đăng ký / Đăng nhập</span>
                                    <div>
                                        <span>Tài khoản</span>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}
                        </WrapperHeaderAccount>
                    </div>

                    <div
                        style={{ display: 'flex', gap: '5px', alignItems: 'center', cursor: 'pointer' }}
                        onClick={handleCart}
                    >
                        <Badge count={cartCount} size="small" showZero>
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