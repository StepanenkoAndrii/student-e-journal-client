import { Button, Card, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { IStudent } from '../../../../interfaces/interfaces';

interface StudentsListProps {
  students: IStudent[];
  setPickedStudent: any;
  handleStudentDelete: () => void;
  goToStudentCreate: () => void;
  goToStudentInfo: any;
}

export function StudentsList({
  students,
  setPickedStudent,
  handleStudentDelete,
  goToStudentCreate,
  goToStudentInfo
}: StudentsListProps) {
  return (
    <>
      <Card className="title-with-search-card">
        <h2 className="title-h2">Students List</h2>
      </Card>
      <List
        className="list-of-data"
        dataSource={students}
        renderItem={(student) => (
          <Card
            key={student.studentId}
            className="list-item-card card"
            hoverable={true}
            onClick={() => goToStudentInfo(student)}>
            <List.Item key={student.studentId + `item`} className="list-item">
              <List.Item.Meta
                title={
                  <p className="list-item-meta-p-title">{`${student.name} ${student.surname}`}</p>
                }
                description={
                  <p className="list-item-meta-p-desc">
                    {student.phoneNumber} | {student.email}
                  </p>
                }
              />
              <Button
                className="teacher-button"
                onClick={() => {
                  setPickedStudent(student);
                  handleStudentDelete();
                }}
                icon={<DeleteOutlined />}></Button>
            </List.Item>
          </Card>
        )}
      />
      <Button className="new-teacher-button" onClick={goToStudentCreate}>
        Add new student
      </Button>
    </>
  );
}
