import { IGroup } from '../../../interfaces/interfaces';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface Props {
  specialityId: string;
  setContentType: any;
  setContentData: any;
  groups: IGroup[];
  handleSpecialityGroups: any;
}

export function MenuGroups({
  specialityId,
  setContentType,
  setContentData,
  groups,
  handleSpecialityGroups
}: Props) {
  const groupsTitle = 'Groups';

  const GroupsArray = groups.map((group: IGroup) => {
    return (
      <Menu.Item
        key={group.groupId}
        title={group.name}
        onClick={() => {
          setContentData(group.groupId);
          setContentType('students');
        }}>
        {group.name}
      </Menu.Item>
    );
  });

  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" key={specialityId + 'groups'}>
      <Menu.SubMenu
        title={groupsTitle}
        icon={<UserOutlined />}
        onTitleClick={() => {
          setContentType('groups');
          handleSpecialityGroups(specialityId);
          setContentData(specialityId);
        }}>
        {GroupsArray}
      </Menu.SubMenu>
    </Menu>
  );
}
