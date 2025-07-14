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

const UserProfilePage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const mutation = useMutationHooks(({ User_Id, data, access_token }) => UserService.updateUser(User_Id, data, access_token));
    const { data } = mutation
    const [avatarUrl, setAvatarUrl] = useState('');

    const handleUploadAvatar = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const url = await uploadImageToCloudinary(file);
            form.setFieldsValue({ User_Avatar: url });
            setAvatarUrl(url); // ✅ cập nhật avatar mới
            toast.success('Tải ảnh thành công!');
        } catch (err) {
            toast.error('Tải ảnh thất bại!');
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            User_Fullname: user.User_Fullname,
            User_PhoneNumber: user.User_PhoneNumber,
            User_Avatar: user.User_Avatar,
            User_Address: user.User_Address,
        });

        setAvatarUrl(user.User_Avatar || '');
    }, [user, form]);


    const handleUpdate = async (values) => {
        // mutation.mutate({ User_Id: user?.User_Id, data: values });
        mutation.mutate({ User_Id: user?.User_Id, data: values }, {
            onSuccess: (res) => {
                if (res.status === 'ERR') {
                    toast.error(res.message || 'Cập nhật thất bại!');
                } else {
                    toast.success('Cập nhật thông tin thành công!');
                    dispatch(updateUser({ ...user, ...values }));
                }
            },
            onError: (err) => {
                console.error(err);
                toast.error('Lỗi khi cập nhật thông tin!');
            },
        }
        );
    };

    console.log('user', user)

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

                    <Form.Item
                        label="Địa chỉ"
                        name="User_Address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input placeholder="Nhập địa chỉ" />
                    </Form.Item>

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


