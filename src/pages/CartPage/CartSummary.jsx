import React from 'react';
import { Card, Statistic, Button } from 'antd';

const CartSummary = ({ total }) => (
    <Card title="Tổng kết giỏ hàng" bordered>
        <Statistic title="Tổng tiền" value={total} suffix="VNĐ" />
        <Button type="primary" block style={{ marginTop: '20px' }}>
            Tiến hành đặt hàng
        </Button>
    </Card>
);

export default CartSummary;
