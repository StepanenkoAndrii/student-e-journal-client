// import { useState } from 'react';
// import './App.css';
// import { Button, Checkbox, Col, Form, Input, Layout, Row, Typography } from 'antd';
// import { green } from '@ant-design/colors';

// function App() {
//   const layout = {
//     labelCol: {
//       span: 8
//     },
//     wrapperCol: {
//       span: 16
//     }
//   };
//   const tailLayout = {
//     wrapperCol: {
//       offset: 8,
//       span: 16
//     }
//   };

//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);

//   const onFinish = (values: any) => {
//     console.log('Success:', values);
//     setLoading(true);
//     // perform login logic here
//   };

//   const onFinishFailed = (errorInfo: any) => {
//     console.log('Failed:', errorInfo);
//   };

//   const onForgotPassword = () => {
//     // redirect to forgot password page
//   };

//   const onRegister = () => {
//     // redirect to register page
//   };

//   return (
//     <Layout style={{ backgroundColor: green[3] }}>
//       <Form
//         {...layout}
//         form={form}
//         name="basic"
//         initialValues={{
//           remember: true
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}>
//         <Typography.Title level={3}>Log in</Typography.Title>

//         <Form.Item
//           label="Username"
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your username!'
//             }
//           ]}>
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your password!'
//             }
//           ]}>
//           <Input.Password />
//         </Form.Item>

//         <Form.Item
//           name="remember"
//           valuePropName="checked"
//           wrapperCol={{
//             offset: 8,
//             span: 16
//           }}>
//           <Checkbox>Remember me</Checkbox>
//         </Form.Item>

//         <Form.Item {...tailLayout}>
//           <Button type="primary" htmlType="submit" loading={loading}>
//             Log in
//           </Button>
//         </Form.Item>

//         <Row justify="space-between">
//           <Col>
//             <Typography.Text onClick={onForgotPassword} style={{ cursor: 'pointer' }}>
//               Forgot password?
//             </Typography.Text>
//           </Col>
//           <Col>
//             <Typography.Text onClick={onRegister} style={{ cursor: 'pointer' }}>
//               Register
//             </Typography.Text>
//           </Col>
//         </Row>
//       </Form>
//     </Layout>
//   );
// }

// // return (
// //   <>
// //     <Layout style={{ backgroundColor: '#f0f2f5' }}>
// //       <Layout.Content>
// //         <Form
// //           name="normal_login"
// //           className="login-form"
// //           initialValues={{ remember: true }}
// //           // onFinish={onFinish}
// //         >
// //           <Form.Item
// //             name="username"
// //             rules={[{ required: true, message: 'Please input your Username!' }]}>
// //             <Input placeholder="Username" />
// //           </Form.Item>
// //           <Form.Item
// //             name="password"
// //             rules={[{ required: true, message: 'Please input your Password!' }]}>
// //             <Input type="password" placeholder="Password" />
// //           </Form.Item>
// //           <Form.Item>
// //             <Form.Item name="remember" valuePropName="checked" noStyle>
// //               <Checkbox>Remember me</Checkbox>
// //             </Form.Item>
// //             <a className="login-form-forgot" href="">
// //               Forgot password
// //             </a>
// //           </Form.Item>
// //           <Form.Item>
// //             <Button type="primary" htmlType="submit" className="login-form-button">
// //               Log in
// //             </Button>
// //             Or <a href="">register now!</a>
// //           </Form.Item>
// //         </Form>
// //       </Layout.Content>
// //     </Layout>
// //   </>
// // );
// // }

// export default App;
