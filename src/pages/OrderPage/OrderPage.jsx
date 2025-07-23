import React, { useEffect, useState } from 'react';
import { Card, Select, Typography, Button, Spin, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GhnAddressCom from '../../components/GhnAddressCom/GhnAddressCom';
import { toast } from "react-toastify";

const OrderPage = () => {
    const { Title } = Typography;
    const navigate = useNavigate();
    const userId = useSelector(state => state.user.User_Id);
    const user = useSelector((state) => state.user);
    const [discountMap, setDiscountMap] = useState({});
    const [address, setAddress] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedAddressType, setSelectedAddressType] = useState('HOME');
    const [shippingAddress, setShippingAddress] = useState(null);
    const [selectedDiscounts, setSelectedDiscounts] = useState({});
    const [addressInfo, setAddressInfo] = useState({
        Address_Fullname: user.User_Fullname || "",
        Address_Phone: user.User_PhoneNumber || "",
        Address_Detail_Address: "",
    });

    useEffect(() => {
        if (user?.User_Fullname || user?.User_PhoneNumber) {
            setAddressInfo((prev) => ({
                ...prev,
                Address_Fullname: user.User_Fullname || "",
                Address_Phone: user.User_PhoneNumber || "",
            }));
        }
    }, [user]);

    const totalAmount = cartItems.reduce((sum, item) => {
        return sum + item.Cart_Item_Price * item.Cart_Item_Quantity;
    }, 0);

    const fetchInitData = async () => {
        try {
            const [addressRes, cartRes, paymentRes] = await Promise.all([
                axios.get(`/api/address/get/${userId}`),
                axios.get(`/api/cart/${userId}`),
                axios.get(`/api/user/payment-methods`)
            ]);

            if (addressRes.data.status === 'OK') setAddress(addressRes.data.data);
            if (cartRes.data.status === 'OK') setCartItems(cartRes.data.data);
            if (paymentRes.data.status === 'OK') setPaymentMethods(paymentRes.data.data);
        } catch (err) {
            console.error(err);
            toast.error('Lỗi khi tải dữ liệu đặt hàng!');
        } finally {
            setLoading(false);
        }
    };

    const handleDiscountChange = ({ itemId, quantity, originalPrice, discount }) => {
        setDiscountMap(prev => ({
            ...prev,
            [itemId]: {
                quantity,
                originalPrice,
                discount,
            }
        }));
    };

    const getFinalPrice = () => {
        return cartItems.reduce((total, item) => {
            const discount = selectedDiscounts[item._id]?.Discount_Value || 0;
            const originalPrice = item.Cart_Item_Price;
            const finalUnitPrice = originalPrice - Math.round(originalPrice * discount / 100);
            const lineTotal = finalUnitPrice * item.Cart_Item_Quantity;

            return total + lineTotal;
        }, 0);
    };


    const handleOrderSubmit = async () => {
        if (!selectedPayment) {
            return toast.warning('Vui lòng chọn phương thức thanh toán!');
        }

        // Kiểm tra dữ liệu nhập
        const { Address_Fullname, Address_Phone, Address_Detail_Address } = addressInfo;
        if (!Address_Fullname || !Address_Phone || !Address_Detail_Address) {
            return toast.warning('Vui lòng nhập đầy đủ thông tin giao hàng!');
        }

        try {
            const orderDetails = cartItems.map(item => ({
                Plant_Id: item.Plant_Id._id || item.Plant_Id,
                Order_Detail_Quantity: item.Cart_Item_Quantity,
                Order_Item_Price: item.Cart_Item_Price,
                Discount_Id: selectedDiscounts[item._id]?._id || null
            }));

            const res = await axios.post(`/api/order`, {
                User_Id: userId,
                Address_Id: selectedAddressType === 'HOME' ? address?._id : shippingAddress?._id,
                Payment_Method_Id: selectedPayment,
                Order_Details: orderDetails,
                Order_Total: getFinalPrice(),
                Address_Fullname,
                Address_Phone,
                Address_Detail_Address
            });

            if (res.data.status === 'OK') {
                toast.success('Đặt hàng thành công!');
                navigate('/order');
            } else {
                toast.error(res.data.toast || 'Đặt hàng thất bại!');
            }
        } catch (err) {
            console.error(err);
            toast.error('Lỗi khi gửi đơn hàng!');
        }
    };

    useEffect(() => {
        if (userId) fetchInitData();
    }, [userId]);

    return (
        <div style={{ padding: '24px 120px' }}>
            <Title level={2}>Xác nhận đơn hàng</Title>
            {loading ? (
                <Spin />
            ) : (
                <>
                    <Card title="Chọn loại địa chỉ" style={{ marginBottom: 20 }}>
                        <Select
                            defaultValue="HOME"
                            style={{ width: 300 }}
                            onChange={(val) => setSelectedAddressType(val)}
                        >
                            <Select.Option value="HOME">Địa chỉ mặc định</Select.Option>
                            <Select.Option value="SHIPPING">Địa chỉ khác</Select.Option>
                        </Select>

                        {selectedAddressType === 'HOME' ? (
                            address ? (
                                <>
                                    <p><strong>{address.Address_Type}</strong></p>
                                    <p>{address.Address_Province_Name}, {address.Address_District_Name}, {address.Address_WardName}</p>
                                    <p>{address.Address_Detail_Address}</p>
                                </>
                            ) : (
                                <p>Chưa có địa chỉ. Vui lòng cập nhật trước khi đặt hàng.</p>
                            )
                        ) : (
                            <GhnAddressCom onSubmit={(addr) => setShippingAddress(addr)} />
                        )}
                    </Card>

                    <Card title="Thông tin giao hàng" style={{ marginBottom: 20 }}>
                        <Input
                            placeholder="Họ và tên"
                            value={addressInfo.Address_Fullname}
                            onChange={(e) =>
                                setAddressInfo((prev) => ({ ...prev, Address_Fullname: e.target.value }))
                            }
                        />

                        <Input
                            placeholder="Số điện thoại"
                            value={addressInfo.Address_Phone}
                            onChange={(e) =>
                                setAddressInfo((prev) => ({ ...prev, Address_Phone: e.target.value }))
                            }
                        />
                        <Input.TextArea
                            rows={3}
                            placeholder="Địa chỉ chi tiết"
                            value={addressInfo.Address_Detail_Address}
                            onChange={(e) =>
                                setAddressInfo({
                                    ...addressInfo,
                                    Address_Detail_Address: e.target.value,
                                })
                            }
                        />
                    </Card>


                    <Card title="Sản phẩm trong giỏ" style={{ marginBottom: 20 }}>
                        {cartItems.map(item => {
                            const discount = discountMap[item._id]?.discount?.Discount_Value || 0;
                            const price = item.Cart_Item_Price;
                            const finalPrice = price - Math.round(price * discount / 100);

                            return (
                                <Card
                                    key={item._id}
                                    style={{ marginBottom: 12 }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <img
                                            src={item.Plant_Id?.Plant_Images?.[0] || ''}
                                            alt={item.Plant_Id?.Plant_Name}
                                            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                                        />

                                        <div style={{ flex: 1 }}>
                                            <h4>{item.Plant_Id?.Plant_Name}</h4>
                                            <p>Giá gốc: {item.Cart_Item_Price.toLocaleString()} VNĐ</p>
                                            <p>Số lượng: {item.Cart_Item_Quantity}</p>

                                            {selectedDiscounts[item._id] ? (
                                                <>
                                                    <p>Giảm giá: {selectedDiscounts[item._id].Discount_Value}%</p>
                                                    <p style={{ color: 'green', fontWeight: 'bold' }}>
                                                        Giá sau giảm: {(item.Cart_Item_Price - Math.round(item.Cart_Item_Price * selectedDiscounts[item._id].Discount_Value / 100)).toLocaleString()} VNĐ
                                                    </p>
                                                </>
                                            ) : (
                                                <p style={{ fontWeight: 'bold' }}>Không áp dụng giảm giá</p>
                                            )}

                                            <Select
                                                value={selectedDiscounts[item._id]?._id || ''}
                                                onChange={(value) => {
                                                    const selected = item.Plant_Id.Discount_Ids.find(dis => dis._id === value);
                                                    setSelectedDiscounts(prev => ({
                                                        ...prev,
                                                        [item._id]: selected || null
                                                    }));
                                                }}
                                                style={{ width: 250, marginTop: 8 }}
                                                placeholder="Chọn mã giảm giá"
                                            >
                                                <Select.Option value="">Không áp dụng mã</Select.Option>
                                                {item.Plant_Id.Discount_Ids?.map(dis => (
                                                    <Select.Option key={dis._id} value={dis._id}>
                                                        {dis.Discount_Name} - {dis.Discount_Value}%
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                </Card>

                            );
                        })}
                        <p><strong>Tổng cộng sau giảm giá:</strong> {getFinalPrice().toLocaleString()} VNĐ</p>

                    </Card>

                    <Card title="Phương thức thanh toán">
                        <Select
                            style={{ width: 300 }}
                            placeholder="Chọn phương thức"
                            onChange={value => setSelectedPayment(value)}
                        >
                            {paymentMethods.map(method => (
                                <Select.Option key={method._id} value={method._id}>
                                    {method.Payment_Method_Name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Card>

                    <div style={{ marginTop: 20 }}>
                        <Button type="primary" onClick={handleOrderSubmit}>
                            Xác nhận đặt hàng
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderPage;
