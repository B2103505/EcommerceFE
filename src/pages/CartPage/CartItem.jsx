import React, { useState } from 'react';
import { List, Button, InputNumber, Card, message } from 'antd';
import { updateCartItem, deleteCartItem } from '../../Service/CartService';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';

const CartItem = ({ cartItems, refreshCart, onDiscountChange }) => {
    const navigate = useNavigate();
    const [selectedDiscounts, setSelectedDiscounts] = useState({});

    const getDiscountedPrice = (originalPrice, discount) => {
        if (!discount || !discount.Discount_Value) return originalPrice;

        const now = new Date();
        const isValid =
            (!discount.Discount_Start_Date || new Date(discount.Discount_Start_Date) <= now) &&
            (!discount.Discount_End_Date || now <= new Date(discount.Discount_End_Date));

        if (!isValid) return originalPrice;

        return originalPrice - Math.round((originalPrice * discount.Discount_Value) / 100);
    };

    const handleQuantityChange = async (itemId, newQty) => {
        try {
            await updateCartItem({ cartItemId: itemId, quantity: newQty });
            window.dispatchEvent(new Event('cartUpdated'));
            refreshCart();
        } catch {
            message.error('Lỗi cập nhật số lượng');
        }
    };

    const handleDelete = async (itemId) => {
        try {
            await deleteCartItem(itemId);
            window.dispatchEvent(new Event('cartUpdated'));
            refreshCart();
        } catch {
            message.error('Lỗi xóa sản phẩm');
        }
    };

    return (
        <List
            dataSource={cartItems}
            renderItem={item => {
                const plant = item.Plant_Id;
                if (!plant || typeof plant !== 'object') return null;

                const discountList = plant.Discount_Ids || [];
                const selectedDiscount = selectedDiscounts[item._id] || null;
                const finalPrice = getDiscountedPrice(item.Cart_Item_Price, selectedDiscount);

                return (
                    <Card style={{ marginBottom: '16px' }}>
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <img
                                        src={plant.Plant_Images?.[0] || 'https://via.placeholder.com/80'}
                                        width={80}
                                        height={80}
                                        style={{ objectFit: 'cover', borderRadius: 8, cursor: 'pointer' }}
                                        alt={plant.Plant_Name}
                                        onClick={() => navigate(`/detail-product/${plant._id}`)}
                                    />
                                }
                                title={
                                    <div
                                        style={{ cursor: 'pointer', color: '#1890ff' }}
                                        onClick={() => navigate(`/detail-product/${plant._id}`)}
                                    >
                                        {plant.Plant_Name}
                                    </div>
                                }
                                description={
                                    <div>
                                        <div>Giá gốc: {item.Cart_Item_Price.toLocaleString()}đ</div>
                                        {selectedDiscount && (
                                            <div style={{ color: 'green' }}>
                                                Giảm {selectedDiscount.Discount_Value}% ⇒ Còn lại: {finalPrice.toLocaleString()}đ
                                            </div>
                                        )}
                                        {discountList.length > 0 && (
                                            <Select
                                                value={selectedDiscounts[item._id]?._id || ''}
                                                onChange={(value) => {
                                                    const selected = discountList.find(dis => dis._id === value);
                                                    setSelectedDiscounts(prev => ({
                                                        ...prev,
                                                        [item._id]: selected || null
                                                    }));
                                                    if (typeof onDiscountChange === 'function') {
                                                        onDiscountChange({
                                                            itemId: item._id,
                                                            quantity: item.Cart_Item_Quantity,
                                                            originalPrice: item.Cart_Item_Price,
                                                            discount: selected || null
                                                        });
                                                    }
                                                }}
                                                style={{ width: 250, marginTop: 8 }}
                                                placeholder="Chọn mã giảm giá"
                                            >
                                                <Select.Option value="">Không áp dụng mã</Select.Option>
                                                {discountList.map(dis => (
                                                    <Select.Option key={dis._id} value={dis._id}>
                                                        {dis.Discount_Name} - {dis.Discount_Value}%
                                                    </Select.Option>
                                                ))}
                                            </Select>

                                        )}
                                    </div>
                                }
                            />
                            <div>
                                <InputNumber
                                    min={1}
                                    defaultValue={item.Cart_Item_Quantity}
                                    onChange={(value) => handleQuantityChange(item._id, value)}
                                />
                                <Button danger onClick={() => handleDelete(item._id)} style={{ marginLeft: 12 }}>
                                    Xoá
                                </Button>
                            </div>
                        </List.Item>
                    </Card>
                );
            }}
        />
    );
};

export default CartItem;
