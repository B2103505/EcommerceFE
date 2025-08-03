import React, { useEffect, useState } from 'react';
import {
    Table, Select, Space, Button, message, Tag
} from 'antd';
import dayjs from 'dayjs';
import {
    getAllOrders, updateOrder
} from '../../Service/OrderService';
import {
    getAllOrderStatuses,
    getAllPaymentMethods,
    getAllPaymentStatuses
} from '../../Service/UserService';
import { toast } from 'react-toastify';

const { Option } = Select;

const AdminOrderCom = () => {
    const [orders, setOrders] = useState([]);
    const [orderStatuses, setOrderStatuses] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentStatuses, setPaymentStatuses] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchOrders = async (filters) => {
        setLoading(true);
        try {
            const [osRes, pmRes, psRes, orderRes] = await Promise.all([
                getAllOrderStatuses(),
                getAllPaymentMethods(),
                getAllPaymentStatuses(),
                getAllOrders(filters)
            ]);

            const orderStatusList = osRes?.data?.data || [];
            const paymentMethodList = pmRes?.data?.data || [];
            const paymentStatusList = psRes?.data?.data || [];

            if (orderRes?.data?.status === 'OK') {
                const enrichedOrders = orderRes.data.data.map(order => {
                    const orderStatus = orderStatusList.find(s => s._id === order.Order_Status_Id);
                    const paymentMethod = paymentMethodList.find(p => p._id === order.Payment_Method_Id);
                    const paymentStatus = paymentStatusList.find(ps => ps._id === order.Payment_Status_Id);

                    return {
                        ...order,
                        Order_Status_Name: orderStatus?.Order_Status_Name || 'Không rõ',
                        Payment_Method_Name: paymentMethod?.Payment_Method_Name || 'Không rõ',
                        Payment_Status_Name: paymentStatus?.Payment_Status_Name || 'Chưa thanh toán',
                    };
                });

                setOrders(enrichedOrders);
                setOrderStatuses(orderStatusList);
                setPaymentMethods(paymentMethodList);
                setPaymentStatuses(paymentStatusList);
            } else {
                message.error('Lỗi tải đơn hàng');
            }
        } catch (error) {
            message.error('Lỗi hệ thống');
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders(filters);
    }, [filters]);

    const handleUpdateStatus = async (orderId, field, valueId) => {
        try {
            const res = await updateOrder(orderId, { [field]: valueId });
            if (res?.data?.status === 'OK') {
                toast.success('Cập nhật thành công');
                fetchOrders();
            } else {
                toast.error('Cập nhật thất bại');
                console.error(res);
            }
        } catch (error) {
            toast.error('Lỗi hệ thống');
            console.error(error);
        }
    };

    const columns = [
        {
            title: 'Khách hàng',
            dataIndex: 'User_Id',
            render: (user) => user?.User_Email || 'Không rõ'
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'createdAt',
            render: (text) => dayjs(text).format('DD/MM/YYYY HH:mm')
        },
        {
            title: 'Ngày giao dự kiến',
            dataIndex: 'Order_Delivery_Date',
            render: (text) => text ? dayjs(text).format('DD/MM/YYYY') : '-'
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'Order_Total_Amount',
            render: (value) => value.toLocaleString() + '₫'
        },
        {
            title: 'Phí giao hàng',
            dataIndex: 'Order_Fee',
            render: (value) => value.toLocaleString() + '₫'
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'Payment_Method_Id',
            render: (value) => value?.Payment_Method_Name || '-'
        },
        {
            title: 'Trạng thái đơn hàng',
            dataIndex: 'Order_Status_Id',
            render: (value, record) => (
                <Select
                    value={value?._id || undefined}
                    onChange={(val) => handleUpdateStatus(record._id, 'Order_Status_Id', val)}
                    style={{ width: 160 }}
                    placeholder="Chọn trạng thái"
                >
                    {orderStatuses.map(status => (
                        <Option key={status._id} value={status._id}>
                            {status.Order_Status_Name}
                        </Option>
                    ))}
                </Select>
            )
        },
        {
            title: 'Trạng thái thanh toán',
            dataIndex: 'Payment_Status_Id',
            render: (value, record) => (
                <Select
                    value={value?._id || undefined}
                    onChange={(val) => handleUpdateStatus(record._id, 'Payment_Status_Id', val)}
                    style={{ width: 160 }}
                    placeholder="Chọn trạng thái"
                >
                    {paymentStatuses.map(status => (
                        <Option key={status._id} value={status._id}>
                            {status.Payment_Status_Name}
                        </Option>
                    ))}
                </Select>
            )
        }
    ];

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Select
                    placeholder="Trạng thái đơn hàng"
                    allowClear
                    onChange={(val) => handleFilterChange('Order_Status_Id', val)}
                    style={{ width: 200 }}
                >
                    {orderStatuses.map(s => (
                        <Option key={s._id} value={s._id}>{s.Order_Status_Name}</Option>
                    ))}
                </Select>
                <Select
                    placeholder="Phương thức thanh toán"
                    allowClear
                    onChange={(val) => handleFilterChange('Payment_Method_Id', val)}
                    style={{ width: 200 }}
                >
                    {paymentMethods.map(m => (
                        <Option key={m._id} value={m._id}>{m.Payment_Method_Name}</Option>
                    ))}
                </Select>
                <Select
                    placeholder="Trạng thái thanh toán"
                    allowClear
                    onChange={(val) => handleFilterChange('Payment_Status_Id', val)}
                    style={{ width: 200 }}
                >
                    {paymentStatuses.map(s => (
                        <Option key={s._id} value={s._id}>{s.Payment_Status_Name}</Option>
                    ))}
                </Select>
                <Button onClick={() => setFilters({})}>Xóa bộ lọc</Button>
            </Space>
            <Table
                rowKey="_id"
                dataSource={orders}
                columns={columns}
                loading={loading}
                scroll={{ x: true }}
            />
        </div>
    );
};

export default AdminOrderCom;
