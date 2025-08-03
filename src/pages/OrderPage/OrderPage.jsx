import React, { useEffect, useState } from 'react';
import { Card, Select, Typography, Button, Spin, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GhnAddressCom from '../../components/GhnAddressCom/GhnAddressCom';
import { toast } from "react-toastify";
import { calculateShippingFee, getExpectedDeliveryTime } from '../../Service/GHNService'
import { clearCart } from '../../Service/CartService'

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
    const [shippingFee, setShippingFee] = useState(0);
    const [expectedDelivery, setExpectedDelivery] = useState(null);

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

    useEffect(() => {
        const fetchShippingFee = async () => {
            const rawAddress =
                selectedAddressType === 'HOME'
                    ? address
                    : shippingAddress;

            const baseAddress =
                rawAddress
                    ? selectedAddressType === 'HOME'
                        ? {
                            ...rawAddress,
                            District_Id: rawAddress.Address_District_Id,
                            WardCode: rawAddress.Address_WardCode,
                        }
                        : rawAddress
                    : null;

            const fromDistrictId = 1572;
            const getAvailableServiceId = async (fromDistrictId, toDistrictId) => {
                try {
                    const res = await axios.post(`/api/ghn/available-services`, {
                        from_district: fromDistrictId,
                        to_district: toDistrictId,
                    });

                    const services = res.data?.data;
                    return services?.[0]?.service_id || null;
                } catch (error) {
                    console.error("Không lấy được service_id khả dụng:", error);
                    return null;
                }
            };

            if (baseAddress?.District_Id && baseAddress?.WardCode) {
                const serviceId = await getAvailableServiceId(1572, baseAddress.District_Id);

                if (!serviceId) {
                    console.warn("Không có service khả dụng cho tuyến này.");
                    return;
                }

                const feeData = await calculateShippingFee(
                    baseAddress.District_Id,
                    baseAddress.WardCode,
                    serviceId);

                if (feeData && feeData.total) {
                    setShippingFee(feeData.total);

                    const leadtime = await getExpectedDeliveryTime(
                        fromDistrictId,
                        baseAddress.District_Id,
                        serviceId,
                        baseAddress.WardCode
                    );

                    if (leadtime) {
                        setExpectedDelivery(new Date(leadtime * 1000));
                    } else {
                        setExpectedDelivery(null);
                    }

                }
            }
        };

        fetchShippingFee();
    }, [shippingAddress, address, selectedAddressType]);

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

        const mergedAddress = {
            ...(selectedAddressType === 'HOME' ? address : shippingAddress),
            ...(addressInfo || {})
        };

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
                Address_Id: mergedAddress?._id || null,
                Payment_Method_Id: selectedPayment,
                Order_Details: orderDetails,
                Order_Total: getFinalPrice() + shippingFee,  // tổng tiền bao gồm phí ship
                Order_Fee: shippingFee,
                Order_Delivery_Date: expectedDelivery,

                Address_Fullname: mergedAddress?.Address_Fullname,
                Address_Phone: mergedAddress?.Address_Phone,
                Address_Detail_Address: mergedAddress?.Address_Detail_Address,
                Address_Province_Id: mergedAddress?.Province_Id,
                Address_Province_Name: mergedAddress?.Province_Name,
                Address_District_Id: mergedAddress?.District_Id,
                Address_District_Name: mergedAddress?.District_Name,
                Address_WardCode: mergedAddress?.WardCode,
                Address_WardName: mergedAddress?.WardName
            });

            if (res.data.status === 'OK') {

                toast.success('Đặt hàng thành công!');
                await clearCart(userId);
                const orderId = res.data.data.order._id;
                const totalAmount = getFinalPrice() + shippingFee;

                const selectedMethod = paymentMethods.find(m => m._id === selectedPayment);
                if (selectedMethod?.Payment_Method_Name === 'Thanh toán online') {
                    const paymentRes = await axios.post('/api/vnpay/create_payment_url', {
                        amount: totalAmount,
                        orderId: orderId,
                    });

                    if (paymentRes.data) {
                        window.location.href = paymentRes.data;
                        return;
                    } else {
                        toast.error('Không thể tạo link thanh toán VNPay!');
                    }
                }
                navigate('/')

            } else {
                toast.error(res.data.message || 'Đặt hàng thất bại!');
            }
        } catch (err) {
            console.error(err);
            toast.error('Lỗi khi gửi đơn hàng!');
        }
    };

    useEffect(() => {
        if (userId) fetchInitData();
    }, [userId]);

    const hasExceedingItems = cartItems.some(item => item.Cart_Item_Quantity > (item.Plant_Id?.Plant_Quantity || 0));

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
                                </>
                            ) : (
                                <p>Chưa có địa chỉ. Vui lòng cập nhật trước khi đặt hàng.</p>
                            )
                        ) : (
                            <GhnAddressCom onSelect={(addr) => setShippingAddress(addr)} />
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
                            const discount = selectedDiscounts[item._id]?.Discount_Value || 0;

                            const price = item.Cart_Item_Price;
                            const finalPrice = price - Math.round(price * discount / 100);
                            const availableQuantity = item.Plant_Id?.Plant_Quantity || 0;
                            const isExceed = item.Cart_Item_Quantity > availableQuantity;

                            return (
                                <Card
                                    key={item._id}
                                    style={{
                                        marginBottom: 12,
                                        border: isExceed ? '1px solid red' : undefined,
                                        backgroundColor: isExceed ? '#fff1f0' : undefined
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <img
                                            src={item.Plant_Id?.Plant_Images?.[0] || ''}
                                            alt={item.Plant_Id?.Plant_Name}
                                            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                                        />

                                        <div style={{ flex: 1 }}>
                                            <h4>{item.Plant_Id?.Plant_Name}</h4>
                                            <p>Giá gốc: {price.toLocaleString()} VNĐ</p>
                                            <p>Số lượng đặt: {item.Cart_Item_Quantity}</p>
                                            <p>Còn lại trong kho: {availableQuantity}</p>

                                            {isExceed && (
                                                <p style={{ color: 'red', fontWeight: 'bold' }}>
                                                    ⚠️ Số lượng đặt vượt quá tồn kho!
                                                </p>
                                            )}

                                            {selectedDiscounts[item._id] ? (
                                                <>
                                                    <p>Giảm giá: {selectedDiscounts[item._id].Discount_Value}%</p>
                                                    <p style={{ color: 'green', fontWeight: 'bold' }}>
                                                        Giá sau giảm: {finalPrice.toLocaleString()} VNĐ
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
                        <p><strong>Phí giao hàng:</strong> {shippingFee.toLocaleString()} VNĐ</p>
                        <p><strong>Tổng thanh toán:</strong> {(getFinalPrice() + shippingFee).toLocaleString()} VNĐ</p>
                        {expectedDelivery && (
                            <p><strong>Dự kiến giao:</strong> {expectedDelivery.toLocaleDateString('vi-VN')}</p>
                        )}
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
                        <Button
                            type="primary"
                            onClick={handleOrderSubmit}
                            disabled={hasExceedingItems}
                        >
                            Xác nhận đặt hàng
                        </Button>
                        {hasExceedingItems && (
                            <p style={{ color: 'red', marginTop: 8 }}>
                                ⚠️ Một số sản phẩm vượt quá số lượng tồn kho. Vui lòng điều chỉnh trước khi đặt hàng.
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderPage;
