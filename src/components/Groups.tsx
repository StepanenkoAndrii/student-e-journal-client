import { useEffect, useState } from 'react';
import { IGroup } from '../interfaces/interfaces';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface Props {
  specialityId: string;
  setContentType: any;
  setContentData: any;
}

export function MenuGroups({ specialityId, setContentType, setContentData }: Props) {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const groupsTitle = 'Groups';

  useEffect(() => {
    if (isLoading) {
      fetch(`/api/groups?specialityId=${specialityId}`)
        .then((response) => response.json())
        .then((responseData) => {
          setGroups(responseData);
          setIsLoading(false);
        })
        .catch((error) => console.log(`Error getting speciality groups`, error));
    }
  }, [isLoading]);

  const GroupsArray = groups.map((group: IGroup) => {
    return (
      <Menu.Item key={group.groupId} title={group.name}>
        {group.name}
      </Menu.Item>
    );
  });

  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.SubMenu
        title={groupsTitle}
        icon={<UserOutlined />}
        onTitleClick={() => {
          setContentType('groups');
          setContentData(specialityId);
        }}>
        {GroupsArray}
      </Menu.SubMenu>
    </Menu>
  );
}
