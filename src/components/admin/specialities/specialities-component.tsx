import { useEffect, useState } from 'react';
import './specialities-component.css';
import { ISpeciality } from '../../../interfaces/interfaces';
import { Card, Modal } from 'antd';
import { SpecialitiesList } from './components/specialities-list';

export function SpecialitiesComponent() {
  const [pageContentType, setPageContentType] = useState('specialityList');
  const [isLoading, setIsLoading] = useState(true);
  const [allSpecialities, setAllSpecialities] = useState<ISpeciality[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedSpeciality, setPickedSpeciality] = useState<ISpeciality | null>(null);

  useEffect(() => {
    if (isLoading) {
      fetch(`/api/specialities`)
        .then((response) => response.json())
        .then((responseData) => {
          setAllSpecialities(responseData);
        })
        .catch((error) => console.log(`Error getting specialities`, error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  async function handleOk(specialityId: string) {
    await fetch(`/api/specialities/${specialityId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error deleting speciality`, error);
    });

    setIsModalOpen(false);
    setPageContentType('specialitiesList');
    setPickedSpeciality(null);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

  function handleSpecialityDelete() {
    setIsModalOpen(true);
  }

  function goToSpecialityCreate() {
    setPageContentType('specialityCreate');
  }

  const Content = (() => {
    switch (pageContentType) {
      case 'SpecialitiesList':
      default:
        return (
          <SpecialitiesList
            specialities={allSpecialities}
            setPickedSpeciality={setPickedSpeciality}
            handleSpecialityDelete={handleSpecialityDelete}
            goToSpecialityCreate={goToSpecialityCreate}
          />
        );
    }
  })();

  return (
    <>
      <Card className="main-card card">{Content}</Card>
      <Modal
        title="Speciality deletion"
        open={isModalOpen}
        onOk={() => handleOk(pickedSpeciality!.specialityId)}
        onCancel={handleCancel}>
        <h4>{`Are you sure you want to delete speciality ${pickedSpeciality?.name} (${pickedSpeciality?.number})?`}</h4>
      </Modal>
    </>
  );
}
