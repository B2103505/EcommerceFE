import React from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import * as UserService from '../../Service/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import { toast } from 'react-toastify';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg,rgb(117, 238, 117),rgb(154, 165, 154));
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginWrapper = styled.div`
  width: 400px;
  padding: 32px;
  backdrop-filter: blur(8px);
  background: rgb(156, 221, 186);
  border: 1px solid rgba(39, 101, 56, 0.4);
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

const SignInPage = () => {

    // const mutation = useMutation({
    //     mutationFn: data => UserService.LoginUser(data)
    // })

    const mutation = useMutationHooks(data => UserService.LoginUser(data))

    const onFinish = (values) => {
        // console.log('Login info:', values);
        
        mutation.mutate(values, {
            onSuccess: (res) => {
                console.log('res', res.status)
                if (res.status === 'ERR') {
                    toast.error(res.message);
                } else {
                    toast.success('Đăng nhập thành công!');
                }
            }
        });
    };



    return (
        <PageWrapper>
            <LoginWrapper>
                <Title>Đăng nhập</Title>
                <Form
                    name="login-form"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label={<span style={{ color: '#fff' }}>Email</span>}
                        name="User_Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập Email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder="Nhập email của bạn" />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ color: '#fff' }}>Mật khẩu</span>}
                        name="User_Password"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu!' },
                            { min: 6, message: 'Mật khẩu phải từ 6 ký tự!' },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
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
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
                        <Link to="/forgot-password"
                            style={{ color: '#fff', textDecoration: 'underline' }}>
                            Quên mật khẩu?
                        </Link>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center', color: '#fff' }}>
                        Chưa có tài khoản? <Link to="/sign-up"
                            style={{ color: '#fff', textDecoration: 'underline' }}
                        >Đăng ký ngay</Link>
                    </Form.Item>

                </Form>
            </LoginWrapper>
        </PageWrapper>
    );
};

export default SignInPage;
