import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, InputNumber, DatePicker, Space, Popconfirm, message, Input } from 'antd';
import { getAllDiscounts, createDiscount, updateDiscount, deleteDiscount } from '../../Service/DiscountService';
import dayjs from 'dayjs';

const AdminDiscountCom = () => {
    const [form] = Form.useForm();
    const [discounts, setDiscounts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDiscount, setEditingDiscount] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDiscounts = async () => {
        const res = await getAllDiscounts();
        if (res?.status === 'OK') setDiscounts(res.data);
    };

    useEffect(() => {
        fetchDiscounts();
    }, []);

    const openModal = (record = null) => {
        setEditingDiscount(record);
        if (record) {
            form.setFieldsValue({
                Discount_Name: record.Discount_Name,
                Discount_Value: record.Discount_Value,
                Discount_Start_Date: dayjs(record.Discount_Start_Date),
                Discount_End_Date: dayjs(record.Discount_End_Date),
            });
        } else {
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const payload = {
                ...values,
                Discount_Start_Date: values.Discount_Start_Date?.toISOString(),
                Discount_End_Date: values.Discount_End_Date?.toISOString(),
            };

            setLoading(true);
            if (editingDiscount) {
                await updateDiscount(editingDiscount._id, payload);
                message.success('Cập nhật thành công');
            } else {
                await createDiscount(payload);
                message.success('Thêm thành công');
            }
            setLoading(false);
            setIsModalOpen(false);
            fetchDiscounts();
        } catch (err) {
            console.error(err);
            message.error('Lỗi khi lưu thông tin');
        }
    };

    const handleDelete = async (id) => {
        await deleteDiscount(id);
        message.success('Đã xóa');
        fetchDiscounts();
    };

    const columns = [
        {
            title: 'Tên chương trình',
            dataIndex: 'Discount_Name',
        },
        {
            title: 'Giá trị giảm (%)',
            dataIndex: 'Discount_Value',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'Discount_Start_Date',
            render: (text) => dayjs(text).format('DD/MM/YYYY'),
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'Discount_End_Date',
            render: (text) => dayjs(text).format('DD/MM/YYYY'),
        },
        {
            title: 'Hành động',
            render: (_, record) => (
                <Space>
                    <Button onClick={() => openModal(record)}>Sửa</Button>
                    <Popconfirm title="Xóa mục này?" onConfirm={() => handleDelete(record._id)}>
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 16 }}>
                Thêm giảm giá
            </Button>
            <Table rowKey="_id" dataSource={discounts} columns={columns} />

            <Modal
                title={editingDiscount ? 'Sửa giảm giá' : 'Thêm giảm giá'}
                visible={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
                confirmLoading={loading}
                destroyOnClose
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Tên chương trình"
                        name="Discount_Name"
                        rules={[{ required: true, message: 'Không được để trống!' }]}
                    >
                        <Input placeholder="Nhập tên chương trình giảm giá" />
                    </Form.Item>

                    <Form.Item
                        label="Giá trị giảm (%)"
                        name="Discount_Value"
                        rules={[{ required: true, message: 'Không được để trống!' }]}
                    >
                        <InputNumber min={0} max={100} addonAfter="%" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Ngày bắt đầu" name="Discount_Start_Date">
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                    <Form.Item label="Ngày kết thúc" name="Discount_End_Date">
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AdminDiscountCom;
