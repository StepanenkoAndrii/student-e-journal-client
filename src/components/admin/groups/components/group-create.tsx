import { Button, Card, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface GroupCreateProps {
  goBackToList: () => void;
  handleOnCreateSubmit: any;
}

export function GroupCreate({ goBackToList, handleOnCreateSubmit }: GroupCreateProps) {
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
          label="Group name"
          name="name"
          rules={[
            {
              required: true,
              message: 'group name must be provided'
            }
          ]}>
          <Input />
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
