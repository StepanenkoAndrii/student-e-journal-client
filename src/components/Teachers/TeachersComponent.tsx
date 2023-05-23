import { Avatar, Button, Card } from 'antd';
import './TeachersComponent.css';
import { ITeachersProps } from '../../interfaces/interfaces';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { AllTeachers } from './AllTeachers';
// import InfiniteScroll from 'react-infinite-scroll-component';

export function TeachersComponent({ teachers }: ITeachersProps) {
  const [pageContentType, setPageContentType] = useState('allTeachers');

  const TeacherInfo = (
    <>
      <Card className="card-header">
        <Button
          className="teacher-button back-button"
          icon={<ArrowLeftOutlined />}
          onClick={goBackToAllTeachers}
        />
        <Avatar className="avatar" size={96} icon={<UserOutlined />} />
      </Card>
      <Card className="form-card">
        <Card className="left-part"></Card>
        <Card className="right-part"></Card>
      </Card>
    </>
  );

  const Content = (() => {
    switch (pageContentType) {
      case 'allTeachers':
      default:
        return <AllTeachers teachers={teachers} setPageContentType={setPageContentType} />;

      case 'teacherInfo':
        return TeacherInfo;
    }
  })();

  function goBackToAllTeachers() {
    setPageContentType('allTeachers');
  }

  return <Card className="main-card card">{Content}</Card>;
}
