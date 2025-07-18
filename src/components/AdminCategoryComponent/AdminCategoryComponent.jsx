import React, { useEffect, useState } from "react";
import {
    Table, Button, Modal, Form, Input, Select, Upload, Space
} from "antd";
import {
    PlusOutlined, UploadOutlined, DeleteOutlined
} from "@ant-design/icons";
import { toast } from "react-toastify";
import {
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory
} from "../../Service/CategoryService";
import { uploadImageToCloudinary } from "../../utils/CloudinaryUpload";
import { useSelector } from "react-redux";

const { Option } = Select;

const AdminCategoryComponent = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const user = useSelector(state => state.user);
    const access_token = user?.access_token || localStorage.getItem("access_token");

    const fetchCategories = async () => {
        setLoading(true);
        const res = await getAllCategory();
        if (res?.status === "OK") {
            setData(res.data);
        } else toast.error("Lỗi tải danh mục!");
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleOpenModal = (record = null) => {
        setIsModalOpen(true);
        if (record) {
            setEditingId(record._id);
            form.setFieldsValue(record);
            setImageUrl(record.Category_Image || "");
        } else {
            form.resetFields();
            setImageUrl("");
            setEditingId(null);
        }
    };

    const handleUpload = async ({ file }) => {
        setUploading(true);
        try {
            const url = await uploadImageToCloudinary(file);
            if (url) {
                setImageUrl(url);
                form.setFieldsValue({ Category_Image: url });
                toast.success("Tải ảnh thành công!");
            }
        } catch {
            toast.error("Tải ảnh thất bại!");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log("Form values:", values);
            const finalData = {
                ...values,
            };

            const res = editingId
                ? await updateCategory(editingId, finalData, access_token)
                : await createCategory(finalData, access_token);

            if (res?.status === "OK") {
                toast.success(editingId ? "Cập nhật thành công!" : "Thêm danh mục thành công!");
                fetchCategories();
                setIsModalOpen(false);
            } else toast.error(res?.message || "Lỗi thao tác!");
        } catch (error) {
            console.log("❌ Form validation error:", error);
            toast.error("Dữ liệu không hợp lệ!");
        }
    };

    const handleDelete = async (id) => {
        const res = await deleteCategory(id, access_token);
        if (res?.status === "OK") {
            toast.success("Xóa thành công!");
            fetchCategories();
        } else toast.error("Xóa thất bại!");
    };

    const columns = [
        { title: "Tên danh mục", dataIndex: "Category_Name" },
        {
            title: "Ảnh",
            dataIndex: "Category_Image",
            render: (img) => img ? (
                <img src={img} alt="category" width={50} height={50} style={{ objectFit: "cover", borderRadius: 4 }} />
            ) : "Không có"
        },
        {
            title: "Trạng thái",
            dataIndex: "Category_Status",
            render: (status) => status === "active" ? "Hoạt động" : "Ngưng hoạt động"
        },
        {
            title: "Thao tác",
            render: (_, record) => (
                <Space>
                    <Button onClick={() => handleOpenModal(record)}>Sửa</Button>
                    <Button danger onClick={() => handleDelete(record._id)}>Xóa</Button>
                </Space>
            )
        }
    ];

    return (
        <div>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleOpenModal()}
                style={{ marginBottom: 16 }}
            >
                Thêm danh mục
            </Button>

            <Table
                rowKey="_id"
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{ pageSize: 8 }}
            />

            <Modal
                open={isModalOpen}
                title={editingId ? "Cập nhật danh mục" : "Thêm danh mục"}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSubmit}
                destroyOnHidden
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="Category_Name"
                        label="Tên danh mục"
                        rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
                    >
                        <Input placeholder="Nhập tên danh mục" />
                    </Form.Item>
                    <Form.Item name="Category_Status" label="Trạng thái" rules={[{ required: true }]}>
                        <Select>
                            <Option value="active">Hoạt động</Option>
                            <Option value="inactive">Ngưng hoạt động</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Ảnh danh mục">
                        <Upload
                            customRequest={handleUpload}
                            showUploadList={false}
                            accept="image/*"
                        >
                            <Button icon={<UploadOutlined />} loading={uploading}>Chọn ảnh</Button>
                        </Upload>
                        {imageUrl && (
                            <img src={imageUrl} alt="preview" width={70} height={70} style={{ marginTop: 10, objectFit: "cover", borderRadius: 4 }} />
                        )}
                    </Form.Item>

                    <Form.Item name="Category_Image" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
};

export default AdminCategoryComponent;
