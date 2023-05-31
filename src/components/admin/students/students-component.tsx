import { useEffect, useState } from 'react';
import { IStudent } from '../../../interfaces/interfaces';
import { Card, Modal } from 'antd';
import { StudentsList } from './components/students-list';
import { StudentCreate } from './components/student-create';
import { StudentInfo } from './components/student-into';
import { StudentUpdate } from './components/student-update';

interface StudentsComponentProps {
  groupId: string;
}

export function StudentsComponent({ groupId }: StudentsComponentProps) {
  const [pageContentType, setPageContentType] = useState('studentsList');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedStudent, setPickedStudent] = useState<IStudent | null>(null);
  const [students, setStudents] = useState<IStudent[]>([]);

  useEffect(() => {
    fetch(`/api/students?groupId=${groupId}`)
      .then((response) => response.json())
      .then((studentsData: IStudent[]) => setStudents(studentsData))
      .catch((error) => console.log(`Error getting students`, error));
  }, [groupId]);

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

  function handleStudentUpdate() {
    setPageContentType('studentUpdate');
  }

  function goToStudentInfo(student: IStudent) {
    setPickedStudent(student);
    setPageContentType('studentInfo');
  }

  async function handleOnSubmit(values: any) {
    const updatedValues = {
      ...values,
      profileId: pickedStudent!.profileId
    };

    await fetch(`/api/students/${pickedStudent!.studentId}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedValues),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error updating student`, error);
    });

    const updatedStudent = {
      ...updatedValues,
      studentId: pickedStudent!.studentId
    };

    const updatedStudents = students.map((student) => {
      if (student.studentId === pickedStudent!.studentId) {
        return updatedStudent;
      }
      return student;
    });

    setPickedStudent(updatedStudent);
    setStudents(updatedStudents);
    setPageContentType('studentInfo');
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
            goToStudentInfo={goToStudentInfo}
          />
        );

      case 'studentCreate':
        return (
          <StudentCreate goBackToList={goBackToList} handleOnCreateSubmit={handleOnCreateSubmit} />
        );

      case 'studentInfo':
        return (
          <StudentInfo
            student={pickedStudent}
            setPageContentType={setPageContentType}
            handleStudentDelete={handleStudentDelete}
            handleStudentUpdate={handleStudentUpdate}
          />
        );

      case 'studentUpdate':
        return (
          <StudentUpdate
            student={pickedStudent}
            handleOnSubmit={handleOnSubmit}
            setPageContentType={setPageContentType}
            handleStudentDelete={handleStudentDelete}
            handleStudentUpdate={handleStudentUpdate}
          />
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
