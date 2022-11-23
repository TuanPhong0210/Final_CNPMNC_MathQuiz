import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Layout,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  Space,
  Spin,
  Alert,
  message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

// apis
import { LoginParams } from '../apis/accountApi';
// config
import { apiConfig } from '../config';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/path';

const { Title } = Typography;

interface LoginState {
  isLoading: boolean;
  error: string | undefined;
}

const Login = () => {
  const [form] = Form.useForm();
  const { resetFields } = form;
  const { login } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    error: undefined,
  });

  const onFinish = async (values: LoginParams) => {
    try {
      setState({
        isLoading: true,
        error: undefined,
      });
      const name = await login({
        ...values,
        service: apiConfig.service || '',
      });
      message.success(`Welcome back, ${name}`);
      navigate(PATH_DASHBOARD.root);
      setState({
        ...state,
        isLoading: false,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        resetFields();
        setState({
          isLoading: false,
          error: error.response?.statusText,
        });
      }
    }
  };
  const onFocus = () => {
    state.error &&
      setState({
        ...state,
        error: undefined,
      });
  };
  return (
    <RootStyled>
      <Spin spinning={state.isLoading}>
        <Space direction="vertical" style={{ width: '400px', padding: '20px 50px' }}>
          <Title level={3} style={{ textAlign: 'center' }}>
            Math Quiz - Management
          </Title>
          <Form form={form} onFinish={onFinish} onFocus={onFocus}>
            <Form.Item name="account_code" hasFeedback>
              <Input prefix={<UserOutlined />} placeholder="Account code" />
            </Form.Item>
            <Form.Item
              name="password"
              hasFeedback
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Checkbox>Remember me</Checkbox>
                <a className="login-form-forgot" href="/">
                  Forgot password
                </a>
              </Space>
            </Form.Item>
            {state.error && (
              <Alert
                message={state.error}
                type="error"
                showIcon
                closable
                style={{ marginBottom: '10px' }}
              />
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Spin>
    </RootStyled>
  );
};

const RootStyled = styled(Layout)({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default Login;
