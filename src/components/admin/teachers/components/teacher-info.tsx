import { Card } from 'antd';
import { ITeacherProps } from '../../../../interfaces/interfaces';

import { TeacherInfoHeader } from './teacher-info-header';

export function TeacherInfo({
  teacher,
  setPageContentType,
  handleTeacherDelete,
  handleTeacherUpdate
}: ITeacherProps) {
  function CustomCardRow({ currValue }: any) {
    const keys = [
      'First name',
      'Second name',
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

  return (
    <>
      <TeacherInfoHeader
        teacher={teacher}
        type={'teacherInfo'}
        setPageContentType={setPageContentType}
        handleTeacherDelete={handleTeacherDelete}
        handleTeacherUpdate={handleTeacherUpdate}
      />
      <Card className="form-card">
        <CustomCardRow currValue={0} />
        <CustomCardRow currValue={1} />
        <CustomCardRow currValue={2} />
        <CustomCardRow currValue={3} />
        <CustomCardRow currValue={4} />
        <CustomCardRow currValue={5} />
        <CustomCardRow currValue={6} />
        <CustomCardRow currValue={7} />
      </Card>
    </>
  );
}
