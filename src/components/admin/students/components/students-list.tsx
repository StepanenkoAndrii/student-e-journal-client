import { Button, Card, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { IStudent } from '../../../../interfaces/interfaces';

interface StudentsListProps {
  students: IStudent[];
  setPickedStudent: any;
  handleStudentDelete: () => void;
  goToStudentCreate: () => void;
}

export function StudentsList({
  students,
  setPickedStudent,
  handleStudentDelete,
  goToStudentCreate
}: StudentsListProps) {
  console.log(students);

  return (
    <>
      <List
        className="list-of-data"
        dataSource={students}
        renderItem={(student) => (
          <Card key={student.studentId} className="list-item-card card" hoverable={false}>
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
