import { Card, Modal } from 'antd';
import './teachers-component.css';
import { useEffect, useState } from 'react';
import { ISubject, ITeacher, IUser } from '../../interfaces/interfaces';
import { TeachersList } from './components/teachers-list';
import { TeacherInfo } from './components/teacher-info';
import { TeacherUpdate } from './components/teacher-update';
import { TeacherCreate } from './components/teacher-create';

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

  async function handleFreeSubjects() {
    await fetch(`/api/teacher-subjects/free`)
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

  async function handleOk() {
    await fetch(`/api/teacher-subjects/${pickedTeacher!.userId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error deleting teacher subjects`, error);
    });

    await fetch(`/api/users/${pickedTeacher!.userId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error deleting teacher`, error);
    });

    await fetch(`/api/users/teachers`)
      .then((response) => response.json())
      .then((responseData) => {
        setAllTeachers(responseData);
      })
      .catch((error) => console.log(`Error getting teachers`, error));

    await handleFreeSubjects();

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

    await fetch(`/api/users/${pickedTeacher!.userId}`, {
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

    await fetch(`/api/teacher-subjects`, {
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

    await handleFreeSubjects();

    setPickedTeacher(updatedTeacher);
    setAllTeachers(updatedTeachers);
    setPageContentType('teacherInfo');
  }

  async function handleOnCreateSubmit(values: any) {
    const updatedValues = { ...values, role: 'Teacher' };
    delete updatedValues.subjects;

    const response = await fetch(`/api/authentication/register`, {
      method: 'POST',
      body: JSON.stringify(updatedValues),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    const newPartialTeacher: IUser = await response.json();

    const newTeacherId = newPartialTeacher.userId;

    const updatedSubjects = {
      subjects: values.subjects?.map((subject: any) => JSON.parse(subject)),
      teacherId: newTeacherId
    };

    await fetch(`/api/teacher-subjects`, {
      method: 'POST',
      body: JSON.stringify(updatedSubjects),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error updating teacher subjects`, error);
    });

    const newTeacher = {
      ...updatedValues,
      userId: newTeacherId,
      subjects: values.subjects?.map((subject: any) => JSON.parse(subject))
    };

    await handleFreeSubjects();

    setPickedTeacher(null);
    setAllTeachers([...allTeachers, newTeacher]);
    setPageContentType('teacherList');
  }

  function goToTeacherInfo(teacher: any) {
    setPickedTeacher(teacher);
    setPageContentType('teacherInfo');
  }

  function goToTeacherCreate() {
    setPickedTeacher(null);
    setPageContentType('teacherCreate');
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

  function goBackToList() {
    setPageContentType('teacherList');
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
            goToTeacherCreate={goToTeacherCreate}
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

      case 'teacherCreate':
        return (
          <TeacherCreate
            goBackToList={goBackToList}
            handleOnCreateSubmit={handleOnCreateSubmit}
            freeSubjects={freeSubjects}
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
