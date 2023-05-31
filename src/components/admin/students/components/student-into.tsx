import { Card } from 'antd';
import { IStudent } from '../../../../interfaces/interfaces';
import { StudentInfoHeader } from './student-info-header';

interface StudentInfoProps {
  student: IStudent | null;
  setPageContentType: any;
  handleStudentDelete: () => void;
  handleStudentUpdate: () => void;
}

export function StudentInfo({
  student,
  setPageContentType,
  handleStudentDelete,
  handleStudentUpdate
}: StudentInfoProps) {
  function CustomCardRow({ currValue }: any) {
    const keys = [
      'First name',
      'Second name',
      'Email',
      'Phone number',
      'Secondary phone number',
      'Description'
    ];

    const values = [
      student!.name,
      student!.surname,
      student!.email,
      student!.phoneNumber,
      student!.phoneNumber2 ?? 'No secondary phone',
      student!.description ?? 'No description'
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

  return (
    <>
      <StudentInfoHeader
        student={student}
        type={'studentInfo'}
        setPageContentType={setPageContentType}
        handleStudentDelete={handleStudentDelete}
        handleStudentUpdate={handleStudentUpdate}
      />
      <Card className="form-card">
        <CustomCardRow currValue={0} />
        <CustomCardRow currValue={1} />
        <CustomCardRow currValue={2} />
        <CustomCardRow currValue={3} />
        <CustomCardRow currValue={4} />
        <CustomCardRow currValue={5} />
      </Card>
    </>
  );
}
