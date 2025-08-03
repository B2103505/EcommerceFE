import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { uploadImageToCloudinary } from "../../utils/CloudinaryUpload";
import { toast } from "react-toastify";
import { Upload, Button, Form, Input, Rate, Row, Col, Card } from "antd";
import React from 'react';

const MyReviewForm = ({ onSubmit, initialReview }) => {
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(initialReview?.Review_Image || "");
    const [form] = Form.useForm();

    const handleUpload = async ({ file }) => {
        setUploading(true);
        try {
            const url = await uploadImageToCloudinary(file);
            setImageUrl(url);
            toast.success("Tải ảnh thành công!");
        } catch (err) {
            toast.error("Tải ảnh thất bại!");
        } finally {
            setUploading(false);
        }
    };

    const handleFinish = (values) => {
        onSubmit({
            Review_Comment: values.Review_Comment,
            Review_Rate: values.Review_Rate,
            Review_Images: imageUrl ? [imageUrl] : [], // gửi mảng ảnh
        });
        form.resetFields();
        setImageUrl("");
    };

    useEffect(() => {
        if (initialReview) {
            form.setFieldsValue({
                Review_Comment: initialReview?.Review_Comment,
                Review_Rate: initialReview?.Review_Rate,
            });
            setImageUrl(initialReview.Review_Image || "");
        }
    }, [initialReview]);

    return (
        <Card title="Gửi đánh giá của bạn" style={{ marginBottom: 24, borderRadius: 8 }} bordered={false}>
            <Form
                form={form}
                onFinish={handleFinish}
                layout="vertical"
                style={{ maxWidth: 600 }}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="Review_Rate"
                            label="Chất lượng sản phẩm"
                            rules={[{ required: true, message: "Vui lòng chọn số sao!" }]}
                        >
                            <Rate />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            name="Review_Comment"
                            label="Nội dung đánh giá"
                            rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}>
                            <Input.TextArea rows={4} placeholder="Viết cảm nhận của bạn về sản phẩm..." />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Ảnh minh họa (tùy chọn)">
                            <Upload
                                customRequest={handleUpload}
                                showUploadList={false}
                                accept="image/*"
                            >
                                <Button icon={<UploadOutlined />} loading={uploading}>
                                    {imageUrl ? "Thay ảnh" : "Tải ảnh lên"}
                                </Button>
                            </Upload>

                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt="preview"
                                    width={100}
                                    height={100}
                                    style={{
                                        marginTop: 12,
                                        objectFit: "cover",
                                        borderRadius: 8,
                                        border: "1px solid #d9d9d9",
                                        transition: "transform 0.3s",
                                    }}
                                    onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                                />
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Button type="primary" htmlType="submit" block>
                            Gửi đánh giá
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default MyReviewForm;
