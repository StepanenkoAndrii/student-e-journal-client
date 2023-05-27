import { Avatar, Button, Card, Form, Input, Select } from 'antd';
import { ITeacherProps } from '../../interfaces/interfaces';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { ISubject } from '../../interfaces/interfaces';

export function TeacherInfo({ teacher, setPageContentType, setPickedTeacher }: ITeacherProps) {
  const [teacherInfoPageContentType, setTeacherInfoPageContentType] = useState('teacherInfo');
  const [freeSubjects, setFreeSubjects] = useState<ISubject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      fetch(`/api/teacher-subjects/free`)
        .then((response) => response.json())
        .then((responseData) => {
          setFreeSubjects(responseData);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(`Error getting free subjects`, error);
        });
    }
  }, [isLoading]);

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

  const TeacherInfoContent = (() => {
    switch (teacherInfoPageContentType) {
      case 'teacherInfo':
      default:
        return (
          <Card className="form-card">
            <CustomCardRow currValue={0} />
            <CustomCardRow currValue={1} />
            <CustomCardRow currValue={2} />
            <CustomCardRow currValue={3} />
            <CustomCardRow currValue={4} />
            <CustomCardRow currValue={5} />
            <CustomCardRow currValue={6} />
            <CustomCardRow currValue={7} />
            <CustomCardRow currValue={8} />
          </Card>
        );

      case 'updateTeacherInfo':
        return (
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
            onFinish={onFinish}>
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
        );
    }
  })();

  function CustomCardRow({ currValue }: any) {
    const keys = [
      'First name',
      'Second name',
      'Roles',
      'Username',
      'Email',
      'Phone number',
      'Secondary phone number',
      'Description',
      'Subjects'
    ];

    const values = [
      teacher!.name,
      teacher!.surname,
      teacher!.subjects
        ? teacher!
            .subjects!.map((subject) => {
              return subject.type;
            })
            .join(', ')
        : 'Unknown',
      teacher!.username,
      teacher!.email,
      teacher!.phoneNumber,
      teacher!.phoneNumber2 ?? 'No secondary phone',
      teacher!.description ?? 'No description',
      teacher!.subjects
        ? teacher!
            .subjects!.map((subject) => {
              return `${subject.name} (${subject.type})`;
            })
            .join(', ')
        : 'No subjects yet'
    ];

    return (
      <Card className="card-row">
        <Card.Grid hoverable={false} className="key-card">
          {keys[currValue]}
        </Card.Grid>
        <Card.Grid hoverable={false} className="value-card">
          {values[currValue]}
        </Card.Grid>
      </Card>
    );
  }

  function goBack(type: string) {
    if (type === 'teacherInfo') {
      setPageContentType('allTeachers');
      setPickedTeacher(null);
    } else {
      setTeacherInfoPageContentType('teacherInfo');
    }
  }

  async function handleTeacherDeletion() {
    console.log('deleting teacher');
  }

  async function handleTeacherUpdate() {
    console.log('setTeacherInfoPageContentType');

    setTeacherInfoPageContentType('updateTeacherInfo');
  }

  async function onFinish(values: any) {
    const updatedValues = {
      ...values,
      profileId: teacher!.profileId
    };
    delete updatedValues.subjects;

    fetch(`/api/users/${teacher!.userId}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedValues),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error updating user`, error);
    });

    console.log(values.subjects?.map((subject: any) => JSON.parse(subject)));

    const updatedSubjects = {
      subjects: values.subjects?.map((subject: any) => JSON.parse(subject)),
      teacherId: teacher!.userId
    };

    fetch(`/api/teacher-subjects`, {
      method: 'PATCH',
      body: JSON.stringify(updatedSubjects),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error updating teacher subjects`, error);
    });

    const updatedTeacher = {
      ...updatedValues,
      userId: teacher!.userId,
      subjects: values.subjects?.map((subject: any) => JSON.parse(subject))
    };

    setPickedTeacher(updatedTeacher);
    setTeacherInfoPageContentType('teacherInfo');
  }

  return (
    <>
      <Card className="card-header">
        <Button
          className="teacher-button back-button"
          icon={<ArrowLeftOutlined />}
          onClick={() => goBack(teacherInfoPageContentType)}
        />
        <Avatar className="avatar" size={96}>
          {`${teacher!.name.slice(0, 1)}${teacher!.surname.slice(0, 1)}`}
        </Avatar>
        {teacherInfoPageContentType === 'teacherInfo' && (
          <>
            <Button
              className="teacher-button right-button"
              onClick={handleTeacherUpdate}
              icon={<EditOutlined />}></Button>
            <Button
              className="teacher-button right-button"
              onClick={handleTeacherDeletion}
              icon={<DeleteOutlined />}></Button>
          </>
        )}
      </Card>
      {TeacherInfoContent}
    </>
  );
}
