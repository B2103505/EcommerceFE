import React, { useState } from 'react';
import { Result, Button, message } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderFailedPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const retryPayment = async () => {
    try {
      setLoading(true);
      // Gọi lại API tạo link thanh toán
      const res = await axios.post('http://localhost:3001/api/vnpay/create_payment_url', {
        orderId: orderId,
      });

      const { data } = res;
      if (data && data.paymentUrl) {
        window.open(data.paymentUrl, '_blank');
      } else {
        toast.error('Không thể tạo lại link thanh toán.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Lỗi khi tạo lại link thanh toán.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Result
      status="error"
      title="Thanh toán thất bại"
      subTitle={`Có lỗi xảy ra khi thanh toán cho đơn hàng ID: ${orderId}.`}
      extra={[
        <Button type="primary" key="retry" loading={loading} onClick={retryPayment}>
          Thử lại thanh toán
        </Button>,
        <Button key="home" onClick={() => navigate('/')}>
          Về trang chủ
        </Button>,
      ]}
    />
  );
};

export default OrderFailedPage;
