import React, { useState } from 'react';
import { Form, Input, Select, Button, Row, Col, Card } from 'antd';
import { searchAdvancedPlants } from '../Service/PlantService';
import CardComponent from '../components/CardComponent/CardComponent';

const { Option } = Select;

const SearchAdvancedForm = ({ onSearchResult }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSearch = async (values) => {
        const { priceOrder, ratingOrder, ...filters } = values;

        let sortField = 'Plant_Name';
        let sortOrder = 'asc';

        if (priceOrder) {
            sortField = 'Plant_Price';
            sortOrder = priceOrder;
        } else if (ratingOrder) {
            sortField = 'Plant_averageRating';
            sortOrder = ratingOrder;
        }

        const payload = {
            page: 1,
            limit: 8,
            sortField,
            sortOrder,
            filters
        };

        setLoading(true);
        try {
            const data = await searchAdvancedPlants(payload);
            onSearchResult?.(data.plants || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSearch}
            >
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item name="Plant_Name" label="Tên cây">
                            <Input placeholder="Nhập tên..." />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="Plant_Leaf_Shape" label="Hình dáng lá">
                            <Select allowClear placeholder="Chọn hình dáng">
                                <Option value="Lá tròn">Lá tròn</Option>
                                <Option value="Lá dài">Lá dài</Option>
                                <Option value="Lá kim">Lá kim</Option>
                                <Option value="Lá xoăn">Lá xoăn</Option>
                                <Option value="Lá trái tim">Lá trái tim</Option>
                                <Option value="Lá dẻ quạt">Lá dẻ quạt</Option>
                                <Option value="Lá mác">Lá mác</Option>
                                <Option value="Lá bầu dục">Lá bầu dục</Option>
                                <Option value="Lá hình thoi">Lá hình thoi</Option>
                                <Option value="Lá chẻ">Lá chẻ</Option>
                                <Option value="Lá hình chân vịt">Lá hình chân vịt</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="Suitable_Space" label="Không gian phù hợp">
                            <Select mode="multiple" allowClear placeholder="Chọn không gian">
                                <Option value="Bàn làm việc">Bàn làm việc</Option>
                                <Option value="Phòng khách">Phòng khách</Option>
                                <Option value="Ban công">Ban công</Option>
                                <Option value="Hành lang">Hành lang</Option>
                                <Option value="Phòng ngủ">Phòng ngủ</Option>
                                <Option value="Nhà tắm">Nhà tắm</Option>
                                <Option value="Cửa sổ">Cửa sổ</Option>
                                <Option value="Kệ sách">Kệ sách</Option>
                                <Option value="Văn phòng">Văn phòng</Option>
                                <Option value="Tiền sảnh">Tiền sảnh</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="Plant_Size" label="Kích thước">
                            <Select allowClear placeholder="Chọn size">
                                <Option value="Rất nhỏ">Rất nhỏ</Option>
                                <Option value="Nhỏ">Nhỏ</Option>
                                <Option value="Trung bình">Trung bình</Option>
                                <Option value="Lớn">Lớn</Option>
                                <Option value="Rất lớn">Rất lớn</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="priceOrder" label="Sắp xếp theo giá">
                            <Select allowClear placeholder="Chọn thứ tự">
                                <Option value="asc">Giá tăng dần</Option>
                                <Option value="desc">Giá giảm dần</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item name="ratingOrder" label="Sắp xếp theo đánh giá">
                            <Select allowClear placeholder="Chọn thứ tự">
                                <Option value="desc">Rating cao đến thấp</Option>
                                <Option value="asc">Rating thấp đến cao</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                </Row>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Tìm kiếm
                </Button>
            </Form>
        </>
    );
};

export default SearchAdvancedForm;
