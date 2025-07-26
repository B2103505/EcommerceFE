import React from 'react';
import { Card, Statistic, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ total }) => {
    const navigate = useNavigate();

    const handleOrder = () => {
        navigate('/order');
    };

    return (
        <Card title="Tổng kết giỏ hàng" bordered>
            <Statistic title="Tổng tiền" value={total} suffix="VNĐ" />
            <Button type="primary" block style={{ marginTop: '20px' }} onClick={handleOrder}>
                Tiến hành đặt hàng
            </Button>
        </Card>
    );
};

export default CartSummary;
