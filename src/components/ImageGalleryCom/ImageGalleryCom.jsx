import React, { useState } from 'react';
import { Image, Row, Col, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const ImageGalleryCom = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    return (
        <Col
            span={10}
            style={{
                marginRight: '10px',
                position: 'sticky',
                top: '20px',
                alignSelf: 'flex-start',
                borderRight: '1px solid #e5e5e5',
                paddingRight: '10px',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}
        >

            <div style={{ position: 'relative', marginBottom: 12 }}>
                <Image
                    src={images[currentIndex]}
                    alt={`Ảnh ${currentIndex}`}
                    width="100%"
                    height={300}
                    style={{ objectFit: 'cover' }}
                />
                <Button
                    icon={<LeftOutlined />}
                    onClick={handlePrev}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        transform: 'translateY(-50%)',
                        background: '#fff',
                        border: 'none',
                    }}
                />
                <Button
                    icon={<RightOutlined />}
                    onClick={handleNext}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: 0,
                        transform: 'translateY(-50%)',
                        background: '#fff',
                        border: 'none',
                    }}
                />
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {images.map((img, index) => (
                    <Image
                        key={index}
                        src={img}
                        width={60}
                        height={60}
                        style={{
                            objectFit: 'cover',
                            border: currentIndex === index ? '2px solid #1890ff' : '1px solid #ddd',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleThumbnailClick(index)}
                    />
                ))}
            </div>
        </Col>
    );
};

export default ImageGalleryCom;
