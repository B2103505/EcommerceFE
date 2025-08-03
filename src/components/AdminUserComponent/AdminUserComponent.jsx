import React, { useEffect, useState } from "react";
import {
    Table, Button, Modal, Form, Input, Space, Popconfirm, message, Select
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { WrapperHeader } from "./style";
import * as UserService from "../../Service/UserService";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

const { Option } = Select;

const AdminUserComponent = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const [currentUserId, setCurrentUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user);
    const access_token = user?.access_token || localStorage.getItem("access_token")

    // Pagination state
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
    });

    const fetchUsers = async (page = 1, pageSize = 5) => {
        setLoading(true);
        try {
            const res = await UserService.getAllUser(page, pageSize, user?.access_token);
            if (res?.status === "OK") {
                setUsers(res.data);
                setPagination({
                    current: res.pageCurr,
                    pageSize,
                    total: res.total,
                });
            }
        } catch (error) {
            toast.error("Lỗi khi tải danh sách người dùng");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleTableChange = (pagination) => {
        fetchUsers(pagination.current, pagination.pageSize);
    };

    const handleAdd = () => {
        form.resetFields();
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setCurrentUserId(record._id);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const res = await UserService.deleteUser(id, access_token);
            if (res?.status === "OK") {
                toast.success("Xóa thành công");
                fetchUsers(pagination.current, pagination.pageSize);
            }
        } catch (error) {
            toast.error("Xóa thất bại");
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (isEditing) {
                const res = await UserService.updateUser(currentUserId, values, user?.access_token);
                if (res?.status === "OK") {
                    toast.success("Cập nhật thành công");
                } else {
                    toast.error("Cập nhật thất bại");
                }
            } else {
                const res = await UserService.createUser(values);
                if (res?.status === "OK") {
                    toast.success("Thêm người dùng thành công");
                } else {
                    toast.error("Thêm thất bại");
                }
            }
            setIsModalOpen(false);
            fetchUsers(pagination.current, pagination.pageSize);
        } catch (err) {
            toast.error("Có lỗi xảy ra!");
        }
    };

    const columns = [
        { title: "Họ tên", dataIndex: "User_Fullname", key: "User_Fullname" },
        { title: "Email", dataIndex: "User_Email", key: "User_Email" },
        { title: "password", dataIndex: "User_Password", key: "User_Password" },
        { title: "SĐT", dataIndex: "User_PhoneNumber", key: "User_PhoneNumber" },
        {
            title: "Quyền",
            dataIndex: "Role_Id",
            key: "Role_Id",
            render: (role) => role?.Role_Name || 'Không rõ'
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button type="link" danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
                style={{ marginBottom: 16 }}
            >
                Thêm người dùng
            </Button>
            <Table
                rowKey="_id"
                dataSource={users}
                columns={columns}
                bordered
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
            />

            <Modal
                title={isEditing ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSubmit}
                okText={isEditing ? "Cập nhật" : "Thêm"}
            >
                <Form layout="vertical" form={form}>
                    <Form.Item
                        label="Họ tên"
                        name="User_Fullname"
                        rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="User_Email"
                        rules={[{ required: true, type: "email", message: "Email không hợp lệ!" }]}
                    >
                        <Input disabled={isEditing} />
                    </Form.Item>

                    {!isEditing && (
                        <Form.Item
                            label="Mật khẩu"
                            name="User_Password"
                            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    )}

                    <Form.Item
                        label="Số điện thoại"
                        name="User_PhoneNumber"
                        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Quyền"
                        name="Role_Id"
                        rules={[{ required: true, message: "Vui lòng chọn quyền!" }]}
                    >
                        <Select placeholder="Chọn quyền">
                            <Option value="686d164d833c9c6a3a7729e6">Admin</Option>
                            <Option value="686d164d833c9c6a3a7729e9">Employee</Option>
                            <Option value="686d164e833c9c6a3a7729ec">User</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminUserComponent;
