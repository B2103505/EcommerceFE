import React from 'react';
import { Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(167, 235, 167, 0.74), rgb(201, 223, 201));
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ForgotWrapper = styled.div`
  width: 400px;
  padding: 32px;
  backdrop-filter: blur(8px);
  background: rgb(138, 170, 93);
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

const ForgotPasswordPage = () => {
    const onFinish = (values) => {
        console.log('Forgot password request:', values);
        // call API forgot password ở đây nếu cần
        message.success('Đã gửi yêu cầu đặt lại mật khẩu. Vui lòng kiểm tra email!');
    };

    return (
        <PageWrapper>
            <ForgotWrapper>
                <Title>Quên mật khẩu</Title>
                <Form
                    name="forgot-password-form"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label={<span style={{ color: '#fff' }}>Email</span>}
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập Email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder="Nhập email đã đăng ký" />
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
                            Gửi yêu cầu
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center', color: '#fff' }}>
                        Đã nhớ mật khẩu? <Link to="/sign-in" style={{ color: '#fff', textDecoration: 'underline' }}>Đăng nhập</Link>
                    </Form.Item>
                </Form>
            </ForgotWrapper>
        </PageWrapper>
    );
};

export default ForgotPasswordPage;
