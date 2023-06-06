import { UserOutlined } from '@ant-design/icons';
import { IGroup } from '../../../interfaces/interfaces';
import { Menu } from 'antd';

interface MenuGroupsProps {
  setContentType: any;
  setContentData: any;
  groups: IGroup[];
  subjectId: string;
}

export function MenuGroups({ setContentType, setContentData, groups, subjectId }: MenuGroupsProps) {
  const GroupsArray = groups.map((group: IGroup) => {
    return (
      <Menu.Item
        key={group.groupId}
        title={group.name}
        icon={<UserOutlined />}
        onClick={() => {
          setContentData({ group, subjectId });
          setContentType('journal');
        }}>
        {group.name}
      </Menu.Item>
    );
  });

  return <>{GroupsArray}</>;
}
