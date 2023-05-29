import { Button, Card, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { IGroup } from '../../../../interfaces/interfaces';

interface GroupsListProps {
  groups: IGroup[];
  setPickedGroup: any;
  handleGroupDelete: () => void;
  goToGroupCreate: () => void;
}

export function GroupsList({
  groups,
  setPickedGroup,
  handleGroupDelete,
  goToGroupCreate
}: GroupsListProps) {
  return (
    <>
      <List
        className="list-of-data"
        dataSource={groups}
        renderItem={(group) => (
          <Card key={group.groupId} className="list-item-card card" hoverable={false}>
            <List.Item key={group.groupId + `item`} className="list-item">
              <List.Item.Meta title={<p className="list-item-meta-p-title">{group.name}</p>} />
              <Button
                className="teacher-button"
                onClick={() => {
                  setPickedGroup(group);
                  handleGroupDelete();
                }}
                icon={<DeleteOutlined />}></Button>
            </List.Item>
          </Card>
        )}
      />
      <Button className="new-teacher-button" onClick={goToGroupCreate}>
        Add new group
      </Button>
    </>
  );
}
