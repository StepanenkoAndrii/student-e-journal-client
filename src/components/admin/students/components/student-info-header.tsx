import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Card } from 'antd';
import { IStudent } from '../../../../interfaces/interfaces';

interface UpdateStudentProps {
  student: IStudent | null;
  type: string;
  setPageContentType: any;
  handleStudentDelete: () => void;
  handleStudentUpdate: () => void;
}

export function StudentInfoHeader({
  student,
  type,
  setPageContentType,
  handleStudentDelete,
  handleStudentUpdate
}: UpdateStudentProps) {
  function goBack() {
    type === 'studentInfo' ? setPageContentType('studentsList') : setPageContentType('studentInfo');
  }

  return (
    <Card className="card-header">
      <Button
        className="teacher-button back-button"
        icon={<ArrowLeftOutlined />}
        onClick={goBack}
      />
      <Avatar className="avatar" size={96}>
        {`${student!.name.slice(0, 1)}${student!.surname.slice(0, 1)}`}
      </Avatar>
      {type === 'studentInfo' && (
        <>
          <Button
            className="teacher-button right-button"
            onClick={handleStudentUpdate}
            icon={<EditOutlined />}></Button>
          <Button
            className="teacher-button right-button"
            onClick={handleStudentDelete}
            icon={<DeleteOutlined />}></Button>
        </>
      )}
    </Card>
  );
}
