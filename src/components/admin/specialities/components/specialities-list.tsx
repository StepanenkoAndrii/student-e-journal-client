import { Button, Card, List } from 'antd';
import { ISpecialityGroup } from '../../../../interfaces/interfaces';
import { DeleteOutlined } from '@ant-design/icons';

interface SpecialitiesListProps {
  specialityGroups: ISpecialityGroup[];
  setPickedSpeciality: any;
  handleSpecialityDelete: () => void;
  goToSpecialityCreate: () => void;
}

export function SpecialitiesList({
  specialityGroups,
  setPickedSpeciality,
  handleSpecialityDelete,
  goToSpecialityCreate
}: SpecialitiesListProps) {
  function handleSpecialityGroups(specialityId: string) {
    let data: ISpecialityGroup;

    for (const specialityGroup of specialityGroups) {
      if (specialityGroup.specialityId === specialityId) {
        data = specialityGroup;
      }
    }

    return data!.groups;
  }

  return (
    <>
      <Card className="title-with-search-card">
        <h2 className="title-h2">Specialities List</h2>
      </Card>
      <List
        className="list-of-data"
        dataSource={specialityGroups}
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
                  <p className="list-item-meta-p-desc">{`Groups: ${handleSpecialityGroups(
                    speciality.specialityId
                  )}`}</p>
                }
              />
              <Button
                className="teacher-button"
                onClick={() => {
                  setPickedSpeciality(speciality);
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
