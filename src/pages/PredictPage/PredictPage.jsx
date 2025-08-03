import React, { useState } from 'react';
import { Upload, Button, Image, Spin, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const PredictPage = () => {
    const [imageFile, setImageFile] = useState(null);
    const [resultImageUrl, setResultImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUploadChange = ({ file }) => {
        setImageFile(file.originFileObj);
        setResultImageUrl(null); // reset ảnh cũ nếu chọn ảnh mới
    };

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
                responseType: 'blob', // nhận file ảnh từ Flask
            });

            // Tạo URL blob từ ảnh trả về
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
        <div style={{ padding: 24 }}>
            <h2>Nhận diện cây bằng YOLOv8</h2>

            <Upload
                accept="image/*"
                beforeUpload={() => false}
                maxCount={1}
                showUploadList={true}
                onChange={(info) => {
                    const file = info.fileList[0]?.originFileObj;
                    if (file) {
                        setImageFile(file);
                        setResultImageUrl(null); // reset nếu chọn ảnh mới
                    }
                }}
            >
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>


            <Button
                type="primary"
                onClick={handlePredict}
                disabled={!imageFile}
                loading={loading}
                style={{ marginTop: 16 }}
            >
                Nhận diện
            </Button>

            {loading && (
                <div style={{ marginTop: 24 }}>
                    <Spin tip="Đang nhận diện ảnh..." />
                </div>
            )}

            {resultImageUrl && (
                <div style={{ marginTop: 24 }}>
                    <h3>Ảnh sau khi nhận diện:</h3>
                    <Image src={resultImageUrl} alt="Kết quả" width={500} />
                </div>
            )}
        </div>
    );
};

export default PredictPage;
