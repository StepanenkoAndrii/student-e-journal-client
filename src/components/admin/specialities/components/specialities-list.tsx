import { Button, Card, List } from 'antd';
import { IGroup, ISpeciality } from '../../../../interfaces/interfaces';
import { DeleteOutlined } from '@ant-design/icons';

interface SpecialitiesListProps {
  specialities: ISpeciality[];
  setPickedSpeciality: any;
  handleSpecialityDelete: () => void;
  goToSpecialityCreate: () => void;
}

export function SpecialitiesList({
  specialities,
  setPickedSpeciality,
  handleSpecialityDelete,
  goToSpecialityCreate
}: SpecialitiesListProps) {
  async function handleSpecialityGroups(specialityId: string) {
    const response = await fetch(`/api/groups?specialityId=${specialityId}`);
    const responseData: IGroup[] = await response.json();
    return responseData
      .map((group) => {
        return `${group.name}`;
      })
      .join(' | ');
  }

  return (
    <>
      <List
        className="list-of-teachers"
        dataSource={specialities}
        renderItem={(speciality) => (
          <Card key={speciality.specialityId} className="list-item-card card" hoverable={false}>
            <List.Item key={speciality.specialityId + `item`} className="list-item">
              <List.Item.Meta
                title={
                  <p className="list-item-meta-p-title">
                    {speciality.number} {speciality.name}
                  </p>
                }
                description={
                  <p className="list-item-meta-p-desc">{`Groups: ${async () => {
                    return await handleSpecialityGroups(speciality.specialityId);
                  }}`}</p>
                }
              />
              <Button
                className="teacher-button"
                onClick={() => {
                  setPickedSpeciality(speciality.specialityId);
                  handleSpecialityDelete();
                }}
                icon={<DeleteOutlined />}></Button>
            </List.Item>
          </Card>
        )}
      />
      <Button className="new-teacher-button" onClick={goToSpecialityCreate}>
        Add new speciality
      </Button>
    </>
  );
}
