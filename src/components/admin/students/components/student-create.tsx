import { Button, Card, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface StudentCreateProps {
  goBackToList: () => void;
  handleOnCreateSubmit: any;
}

export function StudentCreate({ goBackToList, handleOnCreateSubmit }: StudentCreateProps) {
  return (
    <>
      <Card className="card-header">
        <Button
          className="teacher-button back-button"
          icon={<ArrowLeftOutlined />}
          onClick={goBackToList}
        />
      </Card>
      <Form
        className="update-teacher-form"
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 20
        }}
        layout="horizontal"
        onFinish={handleOnCreateSubmit}>
        <Form.Item
          label="First name"
          name="name"
          rules={[
            {
              required: true,
              message: 'first name must be provided'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Second name"
          name="surname"
          rules={[
            {
              required: true,
              message: 'Second name (surname) must be provided'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Email must be provided'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Phone number must be provided'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item label="Secondary phone" name="phoneNumber2">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item className="item-row-button">
          <Button type="primary" htmlType="submit" className="submit-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
