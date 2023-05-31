import { Button, Form, Input } from 'antd';
import { IStudent } from '../../../../interfaces/interfaces';
import { StudentInfoHeader } from './student-info-header';

interface UpdateStudentProps {
  student: IStudent | null;
  handleOnSubmit: any;
  setPageContentType: any;
  handleStudentDelete: () => void;
  handleStudentUpdate: () => void;
}

export function StudentUpdate({
  student,
  handleOnSubmit,
  setPageContentType,
  handleStudentDelete,
  handleStudentUpdate
}: UpdateStudentProps) {
  const initialValues = {
    ...student!
  };

  return (
    <>
      <StudentInfoHeader
        student={student}
        type={'studentUpdate'}
        setPageContentType={setPageContentType}
        handleStudentDelete={handleStudentDelete}
        handleStudentUpdate={handleStudentUpdate}
      />
      <Form
        className="update-teacher-form"
        initialValues={initialValues}
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 20
        }}
        layout="horizontal"
        onFinish={handleOnSubmit}>
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
