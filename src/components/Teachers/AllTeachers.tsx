import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, List } from 'antd';
import { ITeachersProps } from '../../interfaces/interfaces';

export function AllTeachers({ teachers, setPageContentType, setPickedTeacher }: ITeachersProps) {
  function getSubjectsAndTypes(teacherId: string) {
    const teacher = teachers.find((teacher) => teacher.userId === teacherId);
    const teacherSubjectsAndTypes = teacher!.subjects
      ? teacher!.subjects.map((subject) => {
          return `${subject.type} in ${subject.name}`;
        })
      : ['Unknown teacher type'];

    return teacherSubjectsAndTypes.join(', ');
  }

  function goToTeacherInfo(teacher: any) {
    setPickedTeacher(teacher);
    setPageContentType('teacherInfo');
  }

  async function handleTeacherDeletion() {
    console.log('deleting teacher');
  }

  async function handleTeacherUpdate() {
    console.log('updating teacher');
  }

  return (
    <List
      className="list-of-teachers"
      dataSource={teachers}
      renderItem={(teacher) => (
        <Card
          key={teacher.userId}
          className="list-item-card card"
          hoverable={true}
          onClick={() => goToTeacherInfo(teacher)}>
          <List.Item key={teacher.userId} className="list-item">
            <List.Item.Meta
              title={
                <p className="list-item-meta-p-title">
                  {teacher.name} {teacher.surname}
                </p>
              }
              description={
                <p className="list-item-meta-p-desc">
                  {getSubjectsAndTypes(teacher.userId)} | {teacher.username} | {teacher.email}
                </p>
              }
            />
            <Button
              className="teacher-button"
              onClick={handleTeacherUpdate}
              icon={<EditOutlined />}></Button>
            <Button
              className="teacher-button"
              onClick={handleTeacherDeletion}
              icon={<DeleteOutlined />}></Button>
          </List.Item>
        </Card>
      )}
    />
  );
}
