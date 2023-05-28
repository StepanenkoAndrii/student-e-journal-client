import { Card, Modal } from 'antd';
import './teachers-component.css';
import { useEffect, useState } from 'react';
import { ISubject, ITeacher } from '../../interfaces/interfaces';
import { TeachersList } from './components/teachers-list';
import { TeacherInfo } from './components/teacher-info';
import { TeacherUpdate } from './components/teacher-update';

export function TeachersComponent() {
  const [pageContentType, setPageContentType] = useState('teachersList');
  const [pickedTeacher, setPickedTeacher] = useState<ITeacher | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allTeachers, setAllTeachers] = useState<ITeacher[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [freeSubjects, setFreeSubjects] = useState<ISubject[]>([]);

  useEffect(() => {
    if (isLoading) {
      fetch(`/api/users/teachers`)
        .then((response) => response.json())
        .then((responseData) => {
          setAllTeachers(responseData);
          handleFreeSubjects();
        })
        .catch((error) => console.log(`Error getting teachers`, error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  function handleFreeSubjects() {
    fetch(`/api/teacher-subjects/free`)
      .then((response) => response.json())
      .then((responseData) => {
        setFreeSubjects(responseData);
      })
      .catch((error) => {
        console.log(`Error getting free subjects`, error);
      });
  }

  function handleTeacherDelete() {
    setIsModalOpen(true);
  }

  function handleOk() {
    fetch(`/api/users/${pickedTeacher!.userId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error deleting teacher`, error);
    });

    fetch(`/api/teacher-subjects/${pickedTeacher!.userId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error deleting teacher subjects`, error);
    });

    setIsModalOpen(false);
    setPageContentType('teachersList');
    setPickedTeacher(null);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

  function handleTeacherUpdate() {
    setPageContentType('teacherUpdate');
  }

  async function handleOnSubmit(values: any) {
    const updatedValues = {
      ...values,
      profileId: pickedTeacher!.profileId
    };
    delete updatedValues.subjects;

    fetch(`/api/users/${pickedTeacher!.userId}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedValues),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error updating user`, error);
    });

    const updatedSubjects = {
      subjects: values.subjects?.map((subject: any) => JSON.parse(subject)),
      teacherId: pickedTeacher!.userId
    };

    fetch(`/api/teacher-subjects`, {
      method: 'PATCH',
      body: JSON.stringify(updatedSubjects),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error updating teacher subjects`, error);
    });

    const updatedTeacher = {
      ...updatedValues,
      userId: pickedTeacher!.userId,
      subjects: values.subjects?.map((subject: any) => JSON.parse(subject))
    };

    const updatedTeachers = allTeachers.map((teacher) => {
      if (teacher.userId === pickedTeacher!.userId) {
        return updatedTeacher;
      }
      return teacher;
    });

    setPickedTeacher(updatedTeacher);
    setAllTeachers(updatedTeachers);
    setPageContentType('teacherInfo');
  }

  function goToTeacherInfo(teacher: any) {
    setPickedTeacher(teacher);
    setPageContentType('teacherInfo');
  }

  function getSubjectsAndTypes(teacherId: string) {
    const teacher = allTeachers.find((teacher) => teacher.userId === teacherId);
    const teacherSubjectsAndTypes = teacher!.subjects
      ? teacher!.subjects.map((subject) => {
          return `${subject.type} in ${subject.name}`;
        })
      : ['Unknown teacher type'];

    return teacherSubjectsAndTypes.join(', ');
  }

  const Content = (() => {
    switch (pageContentType) {
      case 'teachersList':
      default:
        return (
          <TeachersList
            teachers={allTeachers}
            goToTeacherInfo={goToTeacherInfo}
            getSubjectsAndTypes={getSubjectsAndTypes}
            handleTeacherDelete={handleTeacherDelete}
            handleTeacherUpdate={handleTeacherUpdate}
          />
        );

      case 'teacherInfo':
        return (
          <TeacherInfo
            teacher={pickedTeacher}
            setPageContentType={setPageContentType}
            handleTeacherDelete={handleTeacherDelete}
            handleTeacherUpdate={handleTeacherUpdate}
          />
        );

      case 'teacherUpdate':
        return (
          <TeacherUpdate
            teacher={pickedTeacher}
            freeSubjects={freeSubjects}
            handleOnSubmit={handleOnSubmit}
            setPageContentType={setPageContentType}
            handleTeacherDelete={handleTeacherDelete}
            handleTeacherUpdate={handleTeacherUpdate}
          />
        );
    }
  })();

  return (
    <>
      <Card className="main-card card">{Content}</Card>
      <Modal title="Teacher deletion" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h4>{`Are you sure you want to delete teacher ${pickedTeacher?.name} ${pickedTeacher?.surname}?`}</h4>
      </Modal>
    </>
  );
}
