import React, { useEffect, useState } from "react";
import {
    Table, Button, Modal, Form, Input, Select, InputNumber, Upload, Space
} from "antd";
import {
    PlusOutlined, UploadOutlined, DeleteOutlined
} from "@ant-design/icons";
import { getAllCategory } from "../../Service/CategoryService";
import {
    createPlant, updatePlant, deletePlant, getAllPlant
} from "../../Service/PlantService";
import { uploadImageToCloudinary } from "../../utils/CloudinaryUpload";
import { toast } from "react-toastify";
import AdminPlantComponent from "../../components/AdminPlantComponent/AdminPlantComponent";
import { useSelector } from "react-redux";
import MDEditor from '@uiw/react-md-editor';
import { getValidDiscounts } from '../../Service/DiscountService'

const { Option } = Select;

const AdminPlantPage = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlantId, setEditingPlantId] = useState(null);
    const [previewImages, setPreviewImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState({
        current: 1,
        pageSize: 8,
        total: 0
    });
    const [searchText, setSearchText] = useState('');
    const user = useSelector(state => state.user);
    const access_token = user?.access_token || localStorage.getItem("access_token");
    const [filterField, setFilterField] = useState("Plant_Name");
    const [description, setDescription] = useState("");
    const [discounts, setDiscounts] = useState([]);

    const leafShapes = [
        "Lá kim", "Lá tròn", "Lá dài", "Lá xoăn", "Lá trái tim", "Lá dẻ quạt",
        "Lá mác", "Lá bầu dục", "Lá hình thoi", "Lá chẻ", "Lá hình chân vịt"
    ];
    const leafColors = [
        "Xanh đậm", "Xanh nhạt", "Xanh sọc", "Xanh vàng", "Xanh lục",
        "Xanh ánh bạc", "Xanh tím", "Xanh pha đỏ", "Xanh ánh đồng", "Xanh rêu"
    ];
    const growthForms = [
        "Thẳng đứng", "Rủ xuống", "Dạng bụi", "Leo", "Tán rộng", "Dạng rosette (hoa thị)",
        "Thân bò", "Thân đứng", "Tán ô", "Dạng thân thảo"
    ];
    const plantSizes = [
        "Rất nhỏ (mini)", "Nhỏ", "Trung bình", "Lớn", "Rất lớn (trên 2m)"
    ];
    const suitableSpaces = [
        "Bàn làm việc", "Phòng khách", "Ban công", "Hành lang", "Phòng ngủ",
        "Nhà tắm", "Cửa sổ", "Kệ sách", "Quán cà phê", "Văn phòng", "Tiền sảnh"
    ];
    const suitableLights = [
        "Ánh sáng trực tiếp", "Ánh sáng gián tiếp", "Bóng râm", "Ánh sáng yếu",
        "Gần cửa sổ", "Dưới đèn huỳnh quang", "Ánh sáng buổi sáng", "Ánh sáng tán xạ"
    ];
    const foliageDensities = [
        "Rất thưa", "Thưa", "Trung bình", "Dày", "Rất dày", "Siêu rậm rạp"
    ];
    const fetchPlants = async (params = { page: 1, limit: 8 }) => {
        setLoading(true);
        const res = await getAllPlant(params);
        if (res?.status === "OK") {
            setData(res.data);
            setPaginationInfo({
                current: params.page,
                pageSize: params.limit,
                total: res.total
            });
        } else toast.error("Lỗi tải danh sách cây");
        setLoading(false);
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                await fetchPlants({ page: 1, limit: 8 });

                const [categoryRes, discountRes] = await Promise.all([
                    getAllCategory(),
                    getValidDiscounts()
                ]);

                console.log("categoryRes", categoryRes);
                console.log("discountRes", discountRes);

                if (categoryRes?.status === "OK") {
                    setCategories(categoryRes.data);
                } else {
                    toast.error("Lỗi tải danh mục");
                }

                if (discountRes?.status === "OK") {
                    setDiscounts(discountRes.data);
                } else {
                    toast.error("Lỗi tải mã giảm giá");
                }

            } catch (error) {
                console.error("Lỗi khi fetch dữ liệu ban đầu:", error);
            }
        };

        fetchInitialData();
    }, []);


    const handleTableChange = (pagination) => {
        fetchPlants({
            page: pagination.current,
            limit: pagination.pageSize,
            filterKey: searchText ? "Plant_Name" : undefined,
            filterValue: searchText || undefined
        });
    };

    const handleOpenModal = (record = null) => {
        setIsModalOpen(true);
        if (record) {
            setEditingPlantId(record._id);
            setDescription(record.Plant_Description || "");
            form.setFieldsValue({
                ...record,
                Category_Id: Array.isArray(record.Category_Id) ? record.Category_Id : [record.Category_Id],
                Discount_Ids: Array.isArray(record.Discount_Ids) ? record.Discount_Ids : []
            });
            setPreviewImages(record.Plant_Images || []);
        } else {
            form.resetFields();
            setDescription("");
            setPreviewImages([]);
            setEditingPlantId(null);
        }
    };

    const handleUpload = async ({ file }) => {
        if (previewImages.length >= 5) {
            toast.warning("Chỉ được tải tối đa 5 ảnh!");
            return;
        }

        setUploading(true);
        try {
            const url = await uploadImageToCloudinary(file);
            if (url) {
                setPreviewImages((prev) => [...prev, url]);
                toast.success("Tải ảnh thành công!");
            }
        } catch (error) {
            toast.error("Tải ảnh thất bại!");
        } finally {
            setUploading(false);
        }
    };
    const handleDeleteImage = (index) => {
        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const finalData = {
                ...values,
                Plant_Images: previewImages,
                Plant_Description: description
            };

            setIsModalOpen(false);

            const res = editingPlantId
                ? await updatePlant(editingPlantId, finalData, access_token)
                : await createPlant(finalData, access_token);

            if (res?.status === "OK") {
                toast.success(editingPlantId ? "Cập nhật thành công!" : "Thêm cây thành công!");
                fetchPlants();
                setIsModalOpen(false);
            } else {
                toast.error(res?.message || "Lỗi thao tác!");
            }
        } catch (err) {
            toast.error("Dữ liệu không hợp lệ!");
        }
    };

    const handleDelete = async (id) => {
        const res = await deletePlant(id, access_token);
        if (res?.status === "OK") {
            toast.success("Xóa cây thành công!");
            fetchPlants();
        } else toast.error("Xóa thất bại!");
    };

    const columns = [
        { title: "Tên cây", dataIndex: "Plant_Name" },
        { title: "Giá", dataIndex: "Plant_Price" },
        { title: "Số lượng", dataIndex: "Plant_Quantity" },
        {
            title: "Hình ảnh",
            dataIndex: "Plant_Images",
            render: (images) =>
                images?.length ? (
                    <img src={images[0]} alt="plant" width={60} height={60} style={{ objectFit: "cover", borderRadius: 4 }} />
                ) : "Không có"
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

            <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleOpenModal()}
                >
                    Thêm cây
                </Button>

                <Select
                    value={filterField}
                    onChange={setFilterField}
                    style={{ width: 160 }}
                >
                    <Option value="Plant_Name">Tên cây</Option>
                    <Option value="Plant_Status">Trạng thái</Option>
                    <Option value="Category_Id">Danh mục</Option>
                </Select>

                <Input.Search
                    placeholder={`Tìm kiếm theo ${filterField === "Plant_Name" ? "tên cây" : filterField === "Plant_Status" ? "trạng thái" : "danh mục"}`}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onSearch={(value) => {
                        fetchPlants({
                            page: 1,
                            limit: paginationInfo.pageSize,
                            filterKey: filterField,
                            filterValue: value
                        });
                    }}
                    style={{ width: 300 }}
                    allowClear
                />
            </div>



            <Table
                rowKey="_id"
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={paginationInfo}
                onChange={handleTableChange}
            />

            <Modal
                open={isModalOpen}
                title={editingPlantId ? "Cập nhật cây" : "Thêm cây"}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSubmit}
                width={600}
                destroyOnHidden
            >

                <Form layout="vertical" form={form}>
                    <Form.Item name="Plant_Name" label="Tên cây" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="Plant_Scientific_Name" label="Tên khoa học">
                        <Input />
                    </Form.Item>
                    <Form.Item name="Plant_Other_Name" label="Tên gọi khác">
                        <Input />
                    </Form.Item>

                    <Form.Item name="Plant_Leaf_Shape" label="Hình dáng lá">
                        <Select placeholder="Chọn hình dáng lá">
                            {leafShapes.map(shape => (
                                <Option key={shape} value={shape}>{shape}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="Plant_Leaf_Color" label="Màu lá">
                        <Select placeholder="Chọn màu lá">
                            {leafColors.map(color => (
                                <Option key={color} value={color}>{color}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="Plant_Growth_Form" label="Dáng cây">
                        <Select placeholder="Chọn dáng cây">
                            {growthForms.map(form => (
                                <Option key={form} value={form}>{form}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="Plant_Size" label="Kích thước">
                        <Select placeholder="Chọn kích thước">
                            {plantSizes.map(size => (
                                <Option key={size} value={size}>{size}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="Plant_Context" label="Không gian phù hợp">
                        <Select placeholder="Chọn không gian">
                            {suitableSpaces.map(space => (
                                <Option key={space} value={space}>{space}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="Plant_Light" label="Ánh sáng phù hợp">
                        <Select placeholder="Chọn ánh sáng">
                            {suitableLights.map(light => (
                                <Option key={light} value={light}>{light}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="Plant_Foliage_Density" label="Mật độ tán lá">
                        <Select placeholder="Chọn mật độ tán lá">
                            {foliageDensities.map(densi => (
                                <Option key={densi} value={densi}>{densi}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="Plant_Description"
                        rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                    >
                        <div data-color-mode="light">
                            <MDEditor
                                value={description}
                                onChange={setDescription}
                                height={300}
                            />
                        </div>
                    </Form.Item>

                    <Form.Item name="Plant_Price" label="Giá (VND)" rules={[{ required: true }]}>
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item name="Plant_Quantity" label="Số lượng" rules={[{ required: true }]}>
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item name="Plant_Status" label="Trạng thái" rules={[{ required: true }]}>
                        <Select placeholder="Chọn trạng thái">
                            <Select.Option value="available">Còn hàng</Select.Option>
                            <Select.Option value="unavailable">Hết hàng</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="Category_Ids" label="Danh mục">
                        <Select
                            mode="multiple"
                            placeholder="Chọn danh mục"
                        >
                            {categories.map(cat => (
                                <Option key={cat._id} value={cat._id}>
                                    {cat.Category_Name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="Discount_Ids" label="Mã giảm giá áp dụng">
                        <Select
                            mode="multiple"
                            placeholder="Chọn mã giảm giá"
                            optionLabelProp="label"
                            allowClear
                        >
                            {discounts.map(discount => (
                                <Option
                                    key={discount._id}
                                    value={discount._id}
                                    label={discount.Discount_Name}
                                >
                                    {discount.Discount_Name} - Giảm {discount.Discount_Value}%
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Tải ảnh cây">
                        <Upload
                            customRequest={handleUpload}
                            multiple
                            showUploadList={false}
                            accept="image/*"
                            disabled={uploading || previewImages.length >= 5}
                        >
                            <Button icon={<UploadOutlined />} loading={uploading}>
                                {uploading ? "Đang tải..." : "Chọn ảnh"}
                            </Button>
                        </Upload>

                        <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 10 }}>
                            {previewImages.map((url, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <img
                                        src={url}
                                        alt="preview"
                                        width={70}
                                        height={70}
                                        style={{ objectFit: "cover", borderRadius: 4 }}
                                    />
                                    <Button
                                        danger
                                        shape="circle"
                                        size="small"
                                        icon={<DeleteOutlined />}
                                        style={{
                                            position: "absolute",
                                            top: -8,
                                            right: -8,
                                            padding: 0
                                        }}
                                        onClick={() => handleDeleteImage(index)}
                                    />
                                </div>
                            ))}
                        </div>

                        {previewImages.length >= 5 && (
                            <div style={{ color: "red", marginTop: 4 }}>Đã đạt giới hạn 5 ảnh</div>
                        )}
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    );
};

export default AdminPlantPage;
