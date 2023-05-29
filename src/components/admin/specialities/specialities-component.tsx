import { useEffect, useState } from 'react';
import './specialities-component.css';
import { IGroup, ISpeciality, ISpecialityGroup } from '../../../interfaces/interfaces';
import { Card, Modal } from 'antd';
import { SpecialitiesList } from './components/specialities-list';
import { SpecialityCreate } from './components/speciality-create';

export function SpecialitiesComponent() {
  const [pageContentType, setPageContentType] = useState('specialitiesList');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedSpeciality, setPickedSpeciality] = useState<ISpeciality | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [specialityGroups, setSpecialityGroups] = useState<ISpecialityGroup[]>([]);
  const facultyId = `b2b369ea-bd3b-4122-b199-4950901cf645`;

  useEffect(() => {
    if (isLoading) {
      fetch(`/api/specialities`)
        .then((response) => response.json())
        .then((specialitiesData: ISpeciality[]) => {
          const specialityGroupsData: ISpecialityGroup[] = [];

          const promises = specialitiesData.map((speciality) => {
            return fetch(`/api/groups?specialityId=${speciality.specialityId}`)
              .then((response) => response.json())
              .then((groupsData: IGroup[]) => {
                specialityGroupsData.push({
                  ...speciality,
                  groups: groupsData.map((group: IGroup) => group.name).join(' | ')
                });
              })
              .catch((error) => console.log(`Error getting speciality groups`, error));
          });

          Promise.all(promises).then(() => {
            setIsLoading(false);
            setSpecialityGroups(specialityGroupsData);
          });
        })
        .catch((error) => console.log(`Error getting specialities`, error));
    }
  }, [isLoading, specialityGroups]);

  async function handleOk(specialityId: string) {
    await fetch(`/api/specialities/${specialityId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error deleting speciality`, error);
    });

    fetch(`/api/specialities`)
      .then((response) => response.json())
      .then((specialitiesData: ISpeciality[]) => {
        const specialityGroupsData: ISpecialityGroup[] = [];

        const promises = specialitiesData.map((speciality) => {
          return fetch(`/api/groups?specialityId=${speciality.specialityId}`)
            .then((response) => response.json())
            .then((groupsData: IGroup[]) => {
              specialityGroupsData.push({
                ...speciality,
                groups: groupsData.map((group: IGroup) => group.name).join(' | ')
              });
            })
            .catch((error) => console.log(`Error getting speciality groups`, error));
        });

        Promise.all(promises).then(() => {
          setSpecialityGroups(specialityGroupsData);
        });
      })
      .catch((error) => console.log(`Error getting specialities`, error));

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

  function goBackToList() {
    setPageContentType('specialitiesList');
  }

  async function handleOnCreateSubmit(values: any) {
    const updatedValues = { ...values, facultyId };

    await fetch(`/api/specialities`, {
      method: 'POST',
      body: JSON.stringify(updatedValues),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error creating new speciality`, error);
    });

    fetch(`/api/specialities`)
      .then((response) => response.json())
      .then((specialitiesData: ISpeciality[]) => {
        const specialityGroupsData: ISpecialityGroup[] = [];

        const promises = specialitiesData.map((speciality) => {
          return fetch(`/api/groups?specialityId=${speciality.specialityId}`)
            .then((response) => response.json())
            .then((groupsData: IGroup[]) => {
              specialityGroupsData.push({
                ...speciality,
                groups: groupsData.map((group: IGroup) => group.name).join(' | ')
              });
            })
            .catch((error) => console.log(`Error getting speciality groups`, error));
        });

        Promise.all(promises).then(() => {
          setSpecialityGroups(specialityGroupsData);
        });
      })
      .catch((error) => console.log(`Error getting specialities`, error));

    setPageContentType('specialitiesList');
  }

  const Content = (() => {
    switch (pageContentType) {
      case 'specialitiesList':
      default:
        return (
          <SpecialitiesList
            specialityGroups={specialityGroups}
            setPickedSpeciality={setPickedSpeciality}
            handleSpecialityDelete={handleSpecialityDelete}
            goToSpecialityCreate={goToSpecialityCreate}
          />
        );

      case 'specialityCreate':
        return (
          <SpecialityCreate
            goBackToList={goBackToList}
            handleOnCreateSubmit={handleOnCreateSubmit}
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
