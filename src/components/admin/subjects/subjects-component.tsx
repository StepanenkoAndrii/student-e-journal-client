import { useEffect, useState } from 'react';
import { ISubject } from '../../../interfaces/interfaces';
import { Card, Modal } from 'antd';
import { SubjectsList } from './components/subjects-list';
import { SubjectCreate } from './components/subject-create';

export function SubjectsComponent() {
  const [pageContentType, setPageContentType] = useState('subjectsList');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedSubject, setPickedSubject] = useState<ISubject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subjects, setSubjects] = useState<ISubject[]>([]);

  useEffect(() => {
    if (isLoading) {
      fetch(`/api/subjects`)
        .then((response) => response.json())
        .then((subjectsData: ISubject[]) => setSubjects(subjectsData))
        .catch((error) => console.log(`Error getting subjects`, error))
        .finally(() => setIsLoading(false));
    }
  }, [isLoading]);

  async function handleOk(subjectId: string) {
    await fetch(`/api/subjects/${subjectId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error deleting group`, error);
    });

    fetch(`/api/subjects`)
      .then((response) => response.json())
      .then((subjectsData: ISubject[]) => setSubjects(subjectsData))
      .catch((error) => console.log(`Error getting subjects`, error));

    setIsModalOpen(false);
    setPageContentType('subjectsList');
    setPickedSubject(null);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

  function handleSubjectDelete() {
    setIsModalOpen(true);
  }

  function goToSubjectCreate() {
    setPageContentType('subjectCreate');
  }

  function goBackToList() {
    setPageContentType('gsubjectsList');
  }

  async function handleOnCreateSubmit(values: any) {
    const updatedValues = { ...values };

    await fetch(`/api/subjects`, {
      method: 'POST',
      body: JSON.stringify(updatedValues),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error creating new group`, error);
    });

    await fetch(`/api/subjects`)
      .then((response) => response.json())
      .then((subjectsData: ISubject[]) => setSubjects(subjectsData))
      .catch((error) => console.log(`Error getting subjects`, error));

    setPageContentType('subjectsList');
  }

  const Content = (() => {
    switch (pageContentType) {
      case 'subjectsList':
      default:
        return (
          <SubjectsList
            subjects={subjects}
            setPickedSubject={setPickedSubject}
            handleSubjectDelete={handleSubjectDelete}
            goToSubjectCreate={goToSubjectCreate}
          />
        );

      case 'subjectCreate':
        return (
          <SubjectCreate goBackToList={goBackToList} handleOnCreateSubmit={handleOnCreateSubmit} />
        );
    }
  })();

  return (
    <>
      <Card className="main-card card">{Content}</Card>
      <Modal
        title="Subject deletion"
        open={isModalOpen}
        onOk={() => handleOk(pickedSubject!.subjectId)}
        onCancel={handleCancel}>
        <h4>{`Are you sure you want to delete subject ${pickedSubject?.name}?`}</h4>
      </Modal>
    </>
  );
}
