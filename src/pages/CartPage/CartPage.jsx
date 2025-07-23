import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Spin, Empty, message } from 'antd';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { getCartByUserId } from '../../Service/CartService';
import { useSelector } from 'react-redux';

const CartPage = () => {
    const { Title } = Typography;
    const userId = useSelector(state => state.user.User_Id);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [discountMap, setDiscountMap] = useState({});

    const handleDiscountChange = ({ itemId, originalPrice, discount }) => {
        setDiscountMap(prev => ({
            ...prev,
            [itemId]: {
                originalPrice,
                discount
            }
        }));
    };

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => {
            const custom = discountMap[item._id];
            const originalPrice = item.Cart_Item_Price;
            const quantity = item.Cart_Item_Quantity;
            const finalPrice = custom && custom.discount
                ? originalPrice - Math.round(originalPrice * custom.discount.Discount_Value / 100)
                : originalPrice;

            return sum + finalPrice * quantity;
        }, 0);
    };

    const fetchCart = async () => {
        try {
            const res = await getCartByUserId(userId);
            if (res.status === 'OK') {
                setCartItems(res.data);
            } else {
                message.error('Tải giỏ hàng thất bại');
            }
        } catch (err) {
            message.error('Lỗi khi tải giỏ hàng');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) fetchCart();
    }, [userId]);
    // console.log('cartItems:', cartItems);
    return (
        <div style={{ padding: '20px 120px' }}>

            <Title level={2}>Giỏ hàng của bạn</Title>
            <div style={{ borderBottom: '1px solid #ccc', margin: '16px 0' }} />

            {loading ? (
                <Spin size="large" />
            ) : cartItems.length === 0 ? (
                <Empty description="Giỏ hàng trống" />
            ) : (
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={16}>
                        <CartItem
                            cartItems={cartItems}
                            refreshCart={fetchCart}
                            onDiscountChange={handleDiscountChange}
                        />
                    </Col>
                    <Col xs={24} md={8}>
                        <CartSummary total={calculateTotal()} />
                    </Col>
                </Row>
            )}
        </div>

    );
};

export default CartPage;
