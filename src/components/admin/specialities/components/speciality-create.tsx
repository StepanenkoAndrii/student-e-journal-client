import { Button, Card, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface SpecialityCreateProps {
  goBackToList: () => void;
  handleOnCreateSubmit: any;
}

export function SpecialityCreate({ goBackToList, handleOnCreateSubmit }: SpecialityCreateProps) {
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
          label="Speciality name"
          name="name"
          rules={[
            {
              required: true,
              message: 'speciality name must be provided'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item label="Speciality code" name="number">
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
