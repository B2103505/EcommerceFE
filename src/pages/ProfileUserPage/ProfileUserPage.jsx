import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Avatar, message } from 'antd';
import * as UserService from '../../Service/UserService';
import { updateUser } from '../../redux/slice/userSlice';
import { PageWrapper, ProfileWrapper, Title } from './style';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { toast } from 'react-toastify';
import { uploadImageToCloudinary } from '../../utils/CloudinaryUpload'
import GhnAddressCom from '../../components/GhnAddressCom/GhnAddressCom';
import MapAddressCom from '../../components/MapAddressCom/MapAddressCom';

const UserProfilePage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const mutation = useMutationHooks(({ User_Id, data, access_token }) => UserService.updateUser(User_Id, data, access_token));
    const [addressData, setAddressData] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState('');

    const handleUploadAvatar = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const url = await uploadImageToCloudinary(file);
            form.setFieldsValue({ User_Avatar: url });
            setAvatarUrl(url);
            toast.success('Tải ảnh thành công!');
        } catch (err) {
            toast.error('Tải ảnh thất bại!');
        }
    };

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const res = await UserService.getAddressByUserId(user?.User_Id);
                console.log('address', res)
                if (res.status === 'OK') {
                    setAddressData(res.data);
                }
            } catch (error) {
                console.error('Lỗi lấy địa chỉ:', error);
            }
        };

        if (user?.User_Id) {
            fetchAddress();
        }
    }, [user?.User_Id]);


    useEffect(() => {
        if (user && addressData) {
            form.setFieldsValue({
                User_Fullname: user.User_Fullname,
                User_PhoneNumber: user.User_PhoneNumber,
                User_Avatar: user.User_Avatar,
                Address_Province_Id: addressData.Address_Province_Id,
                Address_District_Id: addressData.Address_District_Id,
                Address_WardCode: addressData.Address_WardCode,
            });

            setAvatarUrl(user.User_Avatar || '');
        }
    }, [user, addressData, form]);

    const handleUpdate = async (values) => {
        const { User_Address, ...addressFields } = values;

        mutation.mutate(
            { User_Id: user?.User_Id, data: values, access_token: user?.access_token, },
            {
                onSuccess: async (res) => {
                    if (res.status === 'ERR') {
                        toast.error(res.message || 'Cập nhật thất bại!');
                    } else {
                        try {
                            await UserService.createAddress({
                                User_Id: user?.User_Id,
                                Address_Detail: User_Address,
                                ...addressFields, // các trường: Province_Id, Name, ...
                            });

                            toast.success('Cập nhật thông tin & địa chỉ thành công!');
                            dispatch(updateUser({ ...user, ...values }));
                        } catch (err) {
                            console.error(err);
                            toast.warning('Thông tin đã cập nhật, nhưng lưu địa chỉ thất bại!');
                        }
                    }
                },
                onError: (err) => {
                    console.error(err);
                    toast.error('Lỗi khi cập nhật thông tin!');
                },
            }
        );
    };

    // console.log('user', user)

    return (
        <PageWrapper>
            <ProfileWrapper>
                <Title>Hồ sơ cá nhân</Title>

                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <Avatar
                        size={100}
                        src={avatarUrl || 'https://via.placeholder.com/150'}
                    />
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpdate}
                >
                    <Form.Item
                        label="Họ tên"
                        name="User_Fullname"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                        <Input placeholder="Nhập họ tên" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="User_PhoneNumber"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            { pattern: /^\d{9,11}$/, message: 'Số điện thoại không hợp lệ!' }
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <GhnAddressCom
                        onSelect={({ Province_Id, Province_Name, District_Id, District_Name, WardCode, WardName }) => {
                            form.setFieldsValue({
                                Address_Province_Id: Province_Id,
                                Address_Province_Name: Province_Name,
                                Address_District_Id: District_Id,
                                Address_District_Name: District_Name,
                                Address_WardCode: WardCode,
                                Address_WardName: WardName
                            });
                        }}
                        initialValue={{
                            Province_Id: addressData?.Address_Province_Id,
                            Province_Name: addressData?.Address_Province_Name,
                            District_Id: addressData?.Address_District_Id,
                            District_Name: addressData?.Address_District_Name,
                            WardCode: addressData?.Address_WardCode,
                            WardName: addressData?.Address_WardName
                        }}
                    />


                    <Form.Item name="Address_Province_Id" hidden><Input /></Form.Item>
                    <Form.Item name="Address_Province_Name" hidden><Input /></Form.Item>
                    <Form.Item name="Address_District_Id" hidden><Input /></Form.Item>
                    <Form.Item name="Address_District_Name" hidden><Input /></Form.Item>
                    <Form.Item name="Address_WardCode" hidden><Input /></Form.Item>
                    <Form.Item name="Address_WardName" hidden><Input /></Form.Item>

                    <Form.Item
                        label="Link ảnh đại diện"
                        name="User_Avatar"
                        rules={[{ type: 'url', message: 'Link ảnh không hợp lệ!' }]}
                    >
                        <Input placeholder="https://..." />
                    </Form.Item>

                    <Form.Item label="Tải ảnh mới">
                        <input type="file" accept="image/*" onChange={handleUploadAvatar} />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </ProfileWrapper>
        </PageWrapper>
    );
};

export default UserProfilePage;


