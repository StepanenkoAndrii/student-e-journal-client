import { Button, Card, Form, Input, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ISubject } from '../../../interfaces/interfaces';

interface TeacherCreateProps {
  goBackToList: () => void;
  handleOnCreateSubmit: any;
  freeSubjects: ISubject[];
}

export function TeacherCreate({
  goBackToList,
  handleOnCreateSubmit,
  freeSubjects
}: TeacherCreateProps) {
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
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Username must be provided'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Password must be provided'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Passwords are not equal'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords are not equal!'));
              }
            })
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
        <Form.Item label="Subjects" name="subjects">
          <Select mode="multiple">
            {freeSubjects.map((subject) => {
              return (
                <Select.Option
                  key={subject.subjectId + subject.type}
                  value={JSON.stringify({
                    subjectId: subject.subjectId,
                    name: subject.name,
                    type: subject.type
                  })}>
                  {`${subject.name} (${subject.type})`}
                </Select.Option>
              );
            })}
          </Select>
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
