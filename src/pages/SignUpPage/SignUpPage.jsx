import React from 'react';
import { Form, Input, Button, message } from 'antd';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import * as UserService from '../../Service/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { toast } from 'react-toastify';

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px);}
  100% { opacity: 1; transform: translateY(0);}
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f7da 0%, #fff8dc 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const SignUpWrapper = styled.div`
  width: 500px;
  max-width: 100%;
  padding: 40px 32px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
  animation: ${fadeInUp} 0.6s ease forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.25);
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  font-family: 'Segoe UI', sans-serif;
  color: #2d552d;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(135deg, #5cb85c 0%, #2e8b57 100%);
  border: none;
  font-weight: bold;
  height: 45px;
  transition: all 0.3s ease;

  &:hover, &:focus {
    background: linear-gradient(135deg, #2e8b57 0%, #5cb85c 100%);
    transform: translateY(-2px);
  }
`;

const StyledLink = styled(Link)`
  color: #2e8b57;
  text-decoration: underline;

  &:hover {
    color: #145214;
  }
`;

const SignUpPage = () => {
    const navigate = useNavigate();

    const mutation = useMutationHooks(data => UserService.SignUpUser(data));

    const onFinish = (values) => {
        mutation.mutate(values, {
            onSuccess: (res) => {
                if (res.status === 'ERR') {
                    toast.error(res.message);
                } else {
                    toast.success('Đăng ký thành công!');
                    setTimeout(() => {
                        navigate('/sign-in');
                    }, 2000);
                }
            }
        });
    };

    return (
        <PageWrapper>
            <SignUpWrapper>
                <Title>Đăng ký tài khoản</Title>
                <Form name="signup-form" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        label="Họ tên"
                        name="User_Fullname"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                        <Input placeholder="Nhập họ tên" style={{ borderRadius: 8, height: 40 }} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="User_Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập Email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder="Nhập email" style={{ borderRadius: 8, height: 40 }} />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="User_PhoneNumber"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            { pattern: /^\d{9,11}$/, message: 'Số điện thoại không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" style={{ borderRadius: 8, height: 40 }} />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="User_Password"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu!' },
                            { min: 6, message: 'Mật khẩu phải từ 6 ký tự!' },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" style={{ borderRadius: 8, height: 40 }} />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirm"
                        dependencies={['User_Password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('User_Password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Nhập lại mật khẩu" style={{ borderRadius: 8, height: 40 }} />
                    </Form.Item>

                    <Form.Item>
                        <StyledButton type="primary" htmlType="submit" block>
                            Đăng ký
                        </StyledButton>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center', color: '#555' }}>
                        Đã có tài khoản? <StyledLink to="/sign-in">Đăng nhập</StyledLink>
                    </Form.Item>
                </Form>
            </SignUpWrapper>
        </PageWrapper>
    );
};

export default SignUpPage;
