import React, { useState } from "react";
import { Col, Image, Row } from "antd";
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import MarkdownIt from 'markdown-it';
import { addToCart } from '../../Service/CartService'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import {
    WrapperAddress,
    WrapperInputNumber,
    WrapperPriceProduct,
    WrapperPriceTextProduct,
    WrapperQuantityProduct,
    WrapperStyleNameProduct,
    WrapperStyleTextSell,
} from "./style";

const DetailProductComponent = ({ data }) => {
    const {
        Plant_Name,
        Plant_Scientific_Name,
        Plant_Other_Name,
        Plant_Leaf_Shape,
        Plant_Leaf_Color,
        Plant_Growth_Form,
        Plant_Size,
        Plant_Context,
        Plant_Light,
        Plant_Foliage_Density,
        Plant_Sold,
        Plant_averageRating,
        Plant_Price,
        Plant_Description,
        Plant_Quantity,
        Plant_Images,
    } = data;
    const mdParser = new MarkdownIt();
    const [quantity, setQuantity] = useState(1);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const userId = useSelector(state => state.user.User_Id);
    const defaultImage = 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png';

    const handleAddToCart = async () => {
        if (!data?._id || !quantity) {
            toast.warning('Thiếu thông tin sản phẩm hoặc số lượng');
            return;
        }

        try {
            const res = await addToCart({
                User_Id: userId,
                Plant_Id: data._id,
                quantity,
            });
            window.dispatchEvent(new Event('cartUpdated'));
            if (res.status !== 'ERROR') {
                toast.success('🛒 Đã thêm sản phẩm vào giỏ hàng!');
            } else {
                toast.error(res.message || '❌ Không thể thêm vào giỏ hàng');
            }
        } catch (err) {
            console.error('Lỗi khi thêm vào giỏ hàng:', err);
            toast.error('❌ Đã xảy ra lỗi hệ thống');
        }
    };

    const handlePrevImage = () => {
        setMainImageIndex((prev) => (prev > 0 ? prev - 1 : Plant_Images.length - 1));
    };

    const handleNextImage = () => {
        setMainImageIndex((prev) => (prev < Plant_Images.length - 1 ? prev + 1 : 0));
    };

    const onChangeQuantity = (value) => {
        setQuantity(value);
    };

    return (
        <Row style={{ padding: '16px', background: '#fff' }}>
            <Col
                span={10}
                style={{
                    paddingRight: '10px',
                    position: 'sticky',
                    top: '20px',
                    alignSelf: 'flex-start',
                    height: 'fit-content'
                }}
            >
                {Plant_Images && Plant_Images.length > 0 && (
                    <>
                        <div style={{ position: 'relative', marginBottom: '10px' }}>
                            <Image
                                src={Plant_Images?.[mainImageIndex] || defaultImage}
                                alt="Ảnh chính"
                                width="100%"
                                height={500}
                                style={{ objectFit: 'cover' }}
                            />
                            <button onClick={handlePrevImage} style={arrowStyle('left')}>←</button>
                            <button onClick={handleNextImage} style={arrowStyle('right')}>→</button>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {Plant_Images.map((img, index) => (
                                <Image
                                    key={index}
                                    src={img}
                                    width={60}
                                    height={60}
                                    preview={false}
                                    style={{
                                        objectFit: 'cover',
                                        border: index === mainImageIndex ? '2px solid #1890ff' : '1px solid #ddd',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setMainImageIndex(index)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </Col>

            <Col span={13}>
                <WrapperStyleNameProduct>{Plant_Name}</WrapperStyleNameProduct>
                <div>
                    <span>{Plant_averageRating?.toFixed(1) || "0.0"} <StarFilled style={{ color: 'gold' }} /></span>
                    <span style={{ marginLeft: '10px' }}>| Đã bán {Plant_Sold || 0}</span>
                </div>

                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>
                        {Plant_Price?.toLocaleString('vi-VN')}đ
                    </WrapperPriceTextProduct>
                </WrapperPriceProduct>

                <WrapperAddress>
                    <span>Giao đến </span>
                    <span className="address">Ninh Kiều, Cần Thơ</span>
                    <span className="change-address"> - Đổi địa chỉ</span>
                </WrapperAddress>

                <div style={{ margin: '16px 0', padding: '16px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                    <div style={{ marginBottom: '10px' }}>Số lượng</div>
                    <WrapperQuantityProduct>
                        <button style={{ border: 'none', background: 'transparent' }}
                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>
                            <MinusOutlined style={{ fontSize: '20px' }} />
                        </button>
                        <WrapperInputNumber
                            min={1}
                            max={Plant_Quantity || 10}
                            value={quantity}
                            onChange={onChangeQuantity}
                            size="small"
                        />

                        <button style={{ border: 'none', background: 'transparent' }}
                            onClick={() => setQuantity(prev => Math.min(10, prev + 1))}>
                            <PlusOutlined style={{ fontSize: '20px' }} />
                        </button>
                    </WrapperQuantityProduct>
                </div>

                <div style={{ marginTop: 16 }}>
                    <ButtonComponent
                        textBtn="Đặt hàng"
                        size={40}
                        styleBtn={{ background: 'green', color: '#fff', width: 220 }}
                        styleTextBtn={{ color: '#fff' }}
                    />
                    <ButtonComponent
                        textBtn="Thêm vào giỏ hàng"
                        size={40}
                        styleBtn={{
                            background: '#fff',
                            border: '1px solid blue',
                            width: 220,
                            marginLeft: 16
                        }}
                        styleTextBtn={{ color: 'blue' }}
                        onClick={handleAddToCart}
                    />

                </div>

                {/* 🌿 Thông tin chi tiết thêm */}
                <div style={{ marginTop: '30px', lineHeight: 1.8 }}>
                    <h3>Thông tin chi tiết</h3>
                    <p><strong>Tên khoa học:</strong> {Plant_Scientific_Name || 'Không có'}</p>
                    <p><strong>Tên gọi khác:</strong> {Plant_Other_Name || 'Không có'}</p>
                    <p><strong>Hình dạng lá:</strong> {Plant_Leaf_Shape || 'Không có'}</p>
                    <p><strong>Màu sắc lá:</strong> {Plant_Leaf_Color || 'Không có'}</p>
                    <p><strong>Hình thái tăng trưởng:</strong> {Plant_Growth_Form || 'Không có'}</p>
                    <p><strong>Kích thước:</strong> {Plant_Size || 'Không có'}</p>
                    <p><strong>Không gian phù hợp:</strong> {Plant_Context || 'Không có'}</p>
                    <p><strong>Ánh sáng yêu cầu:</strong> {Plant_Light || 'Không có'}</p>
                    <p><strong>Mật độ tán lá:</strong> {Plant_Foliage_Density || 'Không có'}</p>
                </div>

                <div style={{ marginTop: '24px', lineHeight: 1.6 }}>
                    <h3>Mô tả</h3>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: mdParser.render(Plant_Description || 'Không có mô tả')
                        }}
                    />
                </div>
            </Col>
        </Row>
    );
};

const arrowStyle = (position) => ({
    position: 'absolute',
    top: '50%',
    [position]: 0,
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.8)',
    border: 'none',
    padding: '4px 8px',
    cursor: 'pointer',
    fontSize: 18
});

export default DetailProductComponent;
