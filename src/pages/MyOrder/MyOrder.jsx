import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, Tag, Collapse } from 'antd';
import { getOrdersByUser, getOrderById } from '../../Service/OrderService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const statusColors = {
    'Chờ xác nhận': 'gold',
    'Đã xác nhận': 'blue',
    'Đang giao hàng': 'purple',
    'Hoàn thành': 'green',
    'Đã hủy': 'red'
};

const paymentStatusColors = {
    'Chưa thanh toán': 'orange',
    'Đã thanh toán': 'green'
};

const MyOrder = () => {
    const userId = useSelector(state => state.user.User_Id);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getOrdersByUser(userId);
                if (res?.data?.status === 'OK') {
                    const orderList = res.data.data;
                    const detailedOrders = await Promise.all(
                        orderList.map(async (order) => {
                            const detailRes = await getOrderById(order._id);
                            if (detailRes?.data?.status === 'OK') {
                                return {
                                    ...detailRes.data.data.order,
                                    Order_Details: detailRes.data.data.details
                                };
                            }
                            return null;
                        })
                    );

                    setOrders(detailedOrders.filter(Boolean));
                }
            } catch (err) {
                toast.error('Không thể tải đơn hàng');
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchOrders();
    }, [userId]);

    return (
        <div style={{ padding: '24px 100px' }}>
            <Title level={2}>Đơn hàng của tôi</Title>
            {loading ? (
                <Spin />
            ) : orders.length === 0 ? (
                <Text>Không có đơn hàng nào.</Text>
            ) : (
                orders.map(order => (
                    <Card
                        key={order._id}
                        title={`Mã đơn: ${order._id}`}
                        style={{ marginBottom: 20 }}
                    >
                        <p><strong>Ngày đặt:</strong> {new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                        <p>
                            <strong>Trạng thái đơn hàng:</strong>{' '}
                            <Tag color={statusColors[order.Order_Status_Id?.Order_Status_Name] || 'default'}>
                                {order.Order_Status_Id?.Order_Status_Name}
                            </Tag>
                        </p>
                        <p>
                            <strong>Trạng thái thanh toán:</strong>{' '}
                            <Tag color={paymentStatusColors[order.Payment_Status_Id?.Payment_Status_Name] || 'default'}>
                                {order.Payment_Status_Id?.Payment_Status_Name}
                            </Tag>
                        </p>
                        <p><strong>Phương thức thanh toán:</strong> {order.Payment_Method_Id?.Payment_Method_Name}</p>
                        <p><strong>Tổng tiền:</strong> {order.Order_Total_Amount?.toLocaleString()} VNĐ</p>
                        <p><strong>Phí vận chuyển:</strong> {order.Order_Fee?.toLocaleString()} VNĐ</p>

                        <p><strong>Giao tới:</strong> {order.Address_Id?.Address_WardName}, {order.Address_Id?.Address_District_Name}, {order.Address_Id?.Address_Province_Name}</p>

                        <Collapse>
                            <Panel header="Chi tiết sản phẩm" key="1">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {order.Order_Details?.map(item => (
                                        <div
                                            key={item._id}
                                            style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
                                            onClick={() => navigate(`/detail-product/${item.Plant_Id?._id}`)}
                                        >
                                            <img
                                                src={item.Plant_Id?.Plant_Images?.[0]}
                                                alt={item.Plant_Id?.Plant_Name}
                                                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                                            />
                                            <div>
                                                <div><strong>{item.Plant_Id?.Plant_Name}</strong></div>
                                                <div>Số lượng: {item.Order_Detail_Quantity}</div>
                                                <div>Giá: {item.Order_Item_Price?.toLocaleString()} VNĐ</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Panel>
                        </Collapse>
                    </Card>
                ))
            )}
        </div>
    );
};

export default MyOrder;
