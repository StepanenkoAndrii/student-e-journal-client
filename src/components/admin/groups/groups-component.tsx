import { useEffect, useState } from 'react';
import { IGroup } from '../../../interfaces/interfaces';
import { Card, Modal } from 'antd';
import { GroupsList } from './components/groups-list';
import { GroupCreate } from './components/group-create';

interface GroupsComponentProps {
  specialityId: string;
  setSpecialityGroups: any;
}

export function GroupsComponent({ specialityId, setSpecialityGroups }: GroupsComponentProps) {
  const [pageContentType, setPageContentType] = useState('groupsList');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedGroup, setPickedGroup] = useState<IGroup | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    if (isLoading) {
      fetch(`/api/groups?specialityId=${specialityId}`)
        .then((response) => response.json())
        .then((groupsData: IGroup[]) => setGroups(groupsData))
        .catch((error) => console.log(`Error getting groups`, error))
        .finally(() => setIsLoading(false));
    }
  }, [isLoading]);

  async function handleOk(groupId: string) {
    await fetch(`/api/groups/${groupId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error deleting group`, error);
    });

    await fetch(`/api/groups?specialityId=${specialityId}`)
      .then((response) => response.json())
      .then((groupsData: IGroup[]) => {
        setGroups(groupsData);
        setSpecialityGroups(groupsData);
      })
      .catch((error) => console.log(`Error getting groups`, error));

    setIsModalOpen(false);
    setPageContentType('groupsList');
    setPickedGroup(null);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

  function handleGroupDelete() {
    setIsModalOpen(true);
  }

  function goToGroupCreate() {
    setPageContentType('groupCreate');
  }

  function goBackToList() {
    setPageContentType('groupsList');
  }

  async function handleOnCreateSubmit(values: any) {
    const updatedValues = { ...values, specialityId };

    await fetch(`/api/groups`, {
      method: 'POST',
      body: JSON.stringify(updatedValues),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).catch((error) => {
      console.log(`Error creating new group`, error);
    });

    await fetch(`/api/groups?specialityId=${specialityId}`)
      .then((response) => response.json())
      .then((groupsData: IGroup[]) => {
        setGroups(groupsData);
        setSpecialityGroups(groupsData);
      })
      .catch((error) => console.log(`Error getting groups`, error));

    setPageContentType('groupsList');
  }

  const Content = (() => {
    switch (pageContentType) {
      case 'groupsList':
      default:
        return (
          <GroupsList
            groups={groups}
            setPickedGroup={setPickedGroup}
            handleGroupDelete={handleGroupDelete}
            goToGroupCreate={goToGroupCreate}
          />
        );

      case 'groupCreate':
        return (
          <GroupCreate goBackToList={goBackToList} handleOnCreateSubmit={handleOnCreateSubmit} />
        );
    }
  })();

  return (
    <>
      <Card className="main-card card">{Content}</Card>
      <Modal
        title="Group deletion"
        open={isModalOpen}
        onOk={() => handleOk(pickedGroup!.groupId)}
        onCancel={handleCancel}>
        <h4>{`Are you sure you want to delete group ${pickedGroup?.name}?`}</h4>
      </Modal>
    </>
  );
}
