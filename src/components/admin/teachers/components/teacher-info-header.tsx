import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Card } from 'antd';
import { ITeacher } from '../../../../interfaces/interfaces';

interface UpdateTeacherProps {
  teacher: ITeacher | null;
  type: string;
  setPageContentType: any;
  handleTeacherDelete: () => void;
  handleTeacherUpdate: () => void;
}

export function TeacherInfoHeader({
  teacher,
  type,
  setPageContentType,
  handleTeacherDelete,
  handleTeacherUpdate
}: UpdateTeacherProps) {
  function goBack() {
    type === 'teacherInfo' ? setPageContentType('teachersList') : setPageContentType('teacherInfo');
  }

  return (
    <Card className="card-header">
      <Button
        className="teacher-button back-button"
        icon={<ArrowLeftOutlined />}
        onClick={goBack}
      />
      <Avatar className="avatar" size={96}>
        {`${teacher!.name.slice(0, 1)}${teacher!.surname.slice(0, 1)}`}
      </Avatar>
      {type === 'teacherInfo' && (
        <>
          <Button
            className="teacher-button right-button"
            onClick={handleTeacherUpdate}
            icon={<EditOutlined />}></Button>
          <Button
            className="teacher-button right-button"
            onClick={handleTeacherDelete}
            icon={<DeleteOutlined />}></Button>
        </>
      )}
    </Card>
  );
}
