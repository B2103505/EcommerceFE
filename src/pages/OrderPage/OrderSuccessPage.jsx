import React from 'react';
import { Result, Button } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');
    const navigate = useNavigate();

    return (
        <Result
            status="success"
            title="Thanh toán thành công!"
            subTitle={`Đơn hàng của bạn (ID: ${orderId}) đã được thanh toán thành công.`}
            extra={[
                <Button type="primary" key="home" onClick={() => navigate('/')}>
                    Về trang chủ
                </Button>,
                <Button key="orders" onClick={() => navigate('/my-orders')}>
                    Xem đơn hàng
                </Button>,
            ]}
        />
    );
};

export default OrderSuccessPage;
