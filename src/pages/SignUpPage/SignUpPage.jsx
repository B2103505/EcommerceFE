import React from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg,rgb(117, 238, 117),rgb(154, 165, 154));
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpWrapper = styled.div`
  width: 500px;
  padding: 32px;
  backdrop-filter: blur(8px);
  background: rgb(156, 221, 186);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  color: #fff;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
`;

const SignUpPage = () => {
    const onFinish = (values) => {
        console.log('Register info:', values);
        // call API register ở đây
    };

    return (
        <PageWrapper>
            <SignUpWrapper>
                <Title>Đăng ký tài khoản</Title>
                <Form
                    name="signup-form"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label={<span style={{ color: '#fff' }}>Họ tên</span>}
                        name="fullname"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                        <Input placeholder="Nhập họ tên của bạn" />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ color: '#fff' }}>Email</span>}
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập Email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder="Nhập email của bạn" />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ color: '#fff' }}>Số điện thoại</span>}
                        name="phone"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            { pattern: /^\d{9,11}$/, message: 'Số điện thoại không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ color: '#fff' }}>Mật khẩu</span>}
                        name="password"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu!' },
                            { min: 6, message: 'Mật khẩu phải từ 6 ký tự!' },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ color: '#fff' }}>Xác nhận mật khẩu</span>}
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Nhập lại mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{
                                background: 'rgba(61,110,53,0.8)',
                                borderColor: 'rgba(61,110,53,0.8)',
                                fontWeight: 'bold',
                            }}
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center', color: '#fff' }}>
                        Đã có tài khoản? <Link to="/sign-in" style={{ color: '#fff', textDecoration: 'underline' }}>Đăng nhập</Link>
                    </Form.Item>
                </Form>
            </SignUpWrapper>
        </PageWrapper>
    );
};

export default SignUpPage;
