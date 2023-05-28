import { Button, Form, Input, Select } from 'antd';
import { ISubject, ITeacher } from '../../../interfaces/interfaces';
import { TeacherInfoHeader } from './teacher-info-header';

interface UpdateTeacherProps {
  teacher: ITeacher | null;
  freeSubjects: ISubject[];
  // eslint-disable-next-line no-unused-vars
  handleOnSubmit: (values: any) => Promise<void>;
  setPageContentType: any;
  handleTeacherDelete: () => void;
  handleTeacherUpdate: () => void;
}

export function TeacherUpdate({
  teacher,
  freeSubjects,
  handleOnSubmit,
  setPageContentType,
  handleTeacherDelete,
  handleTeacherUpdate
}: UpdateTeacherProps) {
  const initialValues = {
    ...teacher!,
    subjects: teacher!.subjects!.map((subject) =>
      JSON.stringify({
        subjectId: subject.subjectId,
        name: subject.name,
        type: subject.type
      })
    )
  };

  const freeAndTeacherSubjects: ISubject[] = [...teacher!.subjects!, ...freeSubjects];

  return (
    <>
      <TeacherInfoHeader
        teacher={teacher}
        type={'teacherUpdate'}
        setPageContentType={setPageContentType}
        handleTeacherDelete={handleTeacherDelete}
        handleTeacherUpdate={handleTeacherUpdate}
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
        <Form.Item label="Secondary phone number" name="phoneNumber2">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Subjects" name="subjects">
          <Select mode="multiple">
            {freeAndTeacherSubjects.map((subject) => {
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
