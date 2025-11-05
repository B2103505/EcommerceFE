import React from 'react';
import { Form, Input, Button } from 'antd';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import * as UserService from '../../Service/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slice/userSlice';
import { jwtDecode } from 'jwt-decode';

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

const LoginWrapper = styled.div`
  width: 400px;
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

const SignInPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mutation = useMutationHooks(data => UserService.LoginUser(data));

    const onFinish = (values) => {
        mutation.mutate(values, {
            onSuccess: (res) => {
                if (res.status === 'ERR') {
                    toast.error(res.message);
                } else {
                    toast.success('Đăng nhập thành công!');
                    setTimeout(() => {
                        navigate('/');
                        localStorage.setItem('access_token', JSON.stringify(res?.access_token));
                        if (res?.access_token) {
                            const decoded = jwtDecode(res?.access_token);
                            if (decoded?.id) {
                                handleGetDetailsUser(decoded?.id, res?.access_token);
                            }
                        }
                    }, 500);
                }
            }
        });
    };

    const handleGetDetailsUser = async (id, token) => {
        const respn = await UserService.getDetailUser(id, token);
        dispatch(updateUser({ ...respn?.data, access_token: token }));
    };

    return (
        <PageWrapper>
            <LoginWrapper>
                <Title>Đăng nhập</Title>
                <Form name="login-form" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        label="Email"
                        name="User_Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập Email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input
                            placeholder="Nhập email của bạn"
                            style={{ borderRadius: 8, height: 40 }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="User_Password"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu!' },
                            { min: 6, message: 'Mật khẩu phải từ 6 ký tự!' },
                        ]}
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu"
                            style={{ borderRadius: 8, height: 40 }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <StyledButton type="primary" htmlType="submit" block>
                            Đăng nhập
                        </StyledButton>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
                        <StyledLink to="/forgot-password">Quên mật khẩu?</StyledLink>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center', color: '#555' }}>
                        Chưa có tài khoản? <StyledLink to="/sign-up">Đăng ký ngay</StyledLink>
                    </Form.Item>
                </Form>
            </LoginWrapper>
        </PageWrapper>
    );
};

export default SignInPage;
