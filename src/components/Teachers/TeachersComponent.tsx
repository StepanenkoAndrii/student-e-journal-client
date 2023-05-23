import { Card } from 'antd';
import './TeachersComponent.css';
import { ITeachersProps } from '../../interfaces/interfaces';
import { useState } from 'react';
import { AllTeachers } from './AllTeachers';
import { TeacherInfo } from './TeacherInfo';

export function TeachersComponent({ teachers }: ITeachersProps) {
  const [pageContentType, setPageContentType] = useState('allTeachers');
  const [pickedTeacher, setPickedTeacher] = useState();

  const Content = (() => {
    switch (pageContentType) {
      case 'allTeachers':
      default:
        return (
          <AllTeachers
            teachers={teachers}
            setPageContentType={setPageContentType}
            setPickedTeacher={setPickedTeacher}
          />
        );

      case 'teacherInfo':
        return (
          <TeacherInfo
            teacher={pickedTeacher}
            setPageContentType={setPageContentType}
            setPickedTeacher={setPickedTeacher}
          />
        );
    }
  })();

  return <Card className="main-card card">{Content}</Card>;
}
