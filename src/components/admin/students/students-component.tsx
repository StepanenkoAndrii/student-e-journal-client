import { useEffect, useState } from 'react';
import { IStudent } from '../../../interfaces/interfaces';
import { Card, Modal } from 'antd';
import { StudentsList } from './components/students-list';
import { StudentCreate } from './components/student-create';

interface StudentsComponentProps {
  groupId: string;
}

export function StudentsComponent({ groupId }: StudentsComponentProps) {
  const [pageContentType, setPageContentType] = useState('studentsList');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedStudent, setPickedStudent] = useState<IStudent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<IStudent[]>([]);

  console.log(groupId);

  useEffect(() => {
    if (isLoading) {
      fetch(`/api/students?groupId=${groupId}`)
        .then((response) => response.json())
        .then((studentsData: IStudent[]) => setStudents(studentsData))
        .catch((error) => console.log(`Error getting students`, error))
        .finally(() => setIsLoading(false));
    }
  }, [isLoading]);

  async function handleOk(studentId: string) {
    await fetch(`/api/students/${studentId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error deleting student`, error);
    });

    await fetch(`/api/students?groupId=${groupId}`)
      .then((response) => response.json())
      .then((studentsData: IStudent[]) => {
        setStudents(studentsData);
      })
      .catch((error) => console.log(`Error getting students`, error));

    setIsModalOpen(false);
    setPageContentType('studentsList');
    setPickedStudent(null);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

  function handleStudentDelete() {
    setIsModalOpen(true);
  }

  function goToStudentCreate() {
    setPageContentType('studentCreate');
  }

  function goBackToList() {
    setPageContentType('studentsList');
  }

  async function handleOnCreateSubmit(values: any) {
    const updatedValues = { ...values, groupId };

    await fetch(`/api/students`, {
      method: 'POST',
      body: JSON.stringify(updatedValues),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error creating new student`, error);
    });

    await fetch(`/api/students?groupId=${groupId}`)
      .then((response) => response.json())
      .then((studentsData: IStudent[]) => {
        setStudents(studentsData);
      })
      .catch((error) => console.log(`Error getting students`, error));

    setPageContentType('studentsList');
  }

  const Content = (() => {
    switch (pageContentType) {
      case 'studentsList':
      default:
        return (
          <StudentsList
            students={students}
            setPickedStudent={setPickedStudent}
            handleStudentDelete={handleStudentDelete}
            goToStudentCreate={goToStudentCreate}
          />
        );

      case 'studentCreate':
        return (
          <StudentCreate goBackToList={goBackToList} handleOnCreateSubmit={handleOnCreateSubmit} />
        );
    }
  })();

  return (
    <>
      <Card className="main-card card">{Content}</Card>
      <Modal
        title="Student deletion"
        open={isModalOpen}
        onOk={() => handleOk(pickedStudent!.studentId)}
        onCancel={handleCancel}>
        <h4>{`Are you sure you want to delete student ${pickedStudent?.name} ${pickedStudent?.surname}?`}</h4>
      </Modal>
    </>
  );
}
