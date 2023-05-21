import { Button, Card, List } from 'antd';
import './TeachersComponent.css';
import { ITeachersProps } from '../../interfaces/interfaces';
import { EditOutlined, UserDeleteOutlined } from '@ant-design/icons';
// import InfiniteScroll from 'react-infinite-scroll-component';

export function TeachersComponent({ teachers }: ITeachersProps) {
  function getSubjectsAndTypes(teacherId: string) {
    const teacher = teachers.find((teacher) => teacher.userId === teacherId);
    const teacherSubjectsAndTypes = teacher!.subjects
      ? teacher!.subjects.map((subject) => {
          return `${subject.type} in ${subject.name}`;
        })
      : ['Unknown teacher type'];

    return teacherSubjectsAndTypes.join(', ');
  }

  async function handleTeacherDeletion() {
    console.log('deleting teacher');
  }

  async function handleTeacherUpdate() {
    console.log('updating teacher');
  }

  return (
    <Card className="main-card">
      <List
        className="list-of-teachers"
        dataSource={teachers}
        renderItem={(teacher) => (
          <Card className="list-item-card">
            <List.Item key={teacher.userId} className="list-item">
              <List.Item.Meta
                title={
                  <p className="list-item-meta-p-title">
                    {teacher.surname} {teacher.name}
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
                icon={<UserDeleteOutlined />}></Button>
            </List.Item>
          </Card>
        )}
      />
    </Card>
  );
}
