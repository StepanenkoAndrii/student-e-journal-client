import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, List } from 'antd';
import { ITeachersProps } from '../../../interfaces/interfaces';

export function TeachersList({
  teachers,
  goToTeacherInfo,
  getSubjectsAndTypes,
  handleTeacherDelete,
  handleTeacherUpdate
}: ITeachersProps) {
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
              onClick={handleTeacherDelete}
              icon={<DeleteOutlined />}></Button>
          </List.Item>
        </Card>
      )}
    />
  );
}
