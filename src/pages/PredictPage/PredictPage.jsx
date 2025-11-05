import React, { useState } from 'react';
import { Upload, Button, Image, Spin, message, Card, Typography, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Paragraph } = Typography;

const PredictPage = () => {
    const [imageFile, setImageFile] = useState(null);
    const [resultImageUrl, setResultImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePredict = async () => {
        if (!imageFile) {
            message.warning('Vui lòng chọn ảnh trước!');
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/predict', formData, {
                responseType: 'blob',
            });

            const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(imageBlob);
            setResultImageUrl(imageUrl);
        } catch (error) {
            console.error('Lỗi khi gửi ảnh đến server:', error);
            message.error('Lỗi khi dự đoán ảnh!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            padding: '40px',
            background: 'linear-gradient(135deg, #d4edda 0%, #fdf6e3 100%)',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Card style={{ width: '100%', maxWidth: 900, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Title level={2} style={{ textAlign: 'center' }}>Nhận diện cây bằng YOLOv8</Title>
                <Paragraph style={{ textAlign: 'center', color: '#555' }}>
                    Chọn ảnh cây cảnh để hệ thống nhận diện và đánh dấu.
                </Paragraph>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                    <Upload
                        accept="image/*"
                        beforeUpload={() => false}
                        maxCount={1}
                        showUploadList={false}
                        onChange={(info) => {
                            const file = info.fileList[0]?.originFileObj;
                            if (file) {
                                setImageFile(file);
                                setResultImageUrl(null);
                            }
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                    <Button
                        type="primary"
                        onClick={handlePredict}
                        disabled={!imageFile}
                        loading={loading}
                        size="large"
                    >
                        Nhận diện
                    </Button>
                </div>

                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                        <Spin tip="Đang nhận diện ảnh..." size="large" />
                    </div>
                )}

                {resultImageUrl && (
                    <div style={{ marginTop: 24 }}>
                        <Row gutter={[16, 16]} justify="center">
                            <Col xs={24} md={12}>
                                <Card title="Ảnh gốc" bordered={false} style={{ textAlign: 'center' }}>
                                    <Image src={URL.createObjectURL(imageFile)} alt="Ảnh gốc" style={{ maxHeight: 300, objectFit: 'contain' }} />
                                </Card>
                            </Col>
                            <Col xs={24} md={12}>
                                <Card title="Ảnh sau khi nhận diện" bordered={false} style={{ textAlign: 'center' }}>
                                    <Image src={resultImageUrl} alt="Kết quả" style={{ maxHeight: 300, objectFit: 'contain' }} />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default PredictPage;
