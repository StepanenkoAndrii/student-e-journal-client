import { useState } from 'react';
import './login.css';
import { Button, Form, Input, Layout, Typography } from 'antd';
import AnchorLink from 'antd/es/anchor/AnchorLink';
import { useNavigate } from 'react-router-dom';

export function Login() {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    const response = await fetch('/api/authentication/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });

    const responseData = await response.json();

    if (responseData.role === 'Admin') navigate('/admin');
    else if (responseData.role === 'Teacher') navigate('/teacher');
    else navigate('/notFound');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout style={{ backgroundColor: '#fff' }} className="login-layout">
      <Form
        form={form}
        name="login-form"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Typography.Title level={1} className="login-title">
          Login
        </Typography.Title>

        <Form.Item
          className="login-form-item"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!'
            }
          ]}>
          <Input placeholder="Username" className="login-input" />
        </Form.Item>

        <Form.Item
          className="login-form-item"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}>
          <Input.Password type="password" placeholder="Password" className="login-input" />
        </Form.Item>

        <Form.Item className="login-form-item" name="forgot">
          <AnchorLink
            className="login-anchor-forgot-password"
            title="Forgot your password?"
            href="#"
          />
        </Form.Item>

        <Form.Item className="login-form-item">
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}
