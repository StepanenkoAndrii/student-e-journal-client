import { useEffect, useState } from 'react';
import { IGroup } from '../interfaces/interfaces';
import { Menu } from 'antd';
// import { TeamOutlined } from '@ant-design/icons';

interface Props {
  specialityId: string;
}

export function MenuGroups(props: Props) {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // const title = 'Groups';

  useEffect(() => {
    if (isLoading) {
      fetch(`/api/groups?specialityId=${props.specialityId}`)
        .then((response) => response.json())
        .then((responseData) => {
          setGroups(responseData);
          setIsLoading(false);
        })
        .catch((error) => console.log(`Error getting speciality groups`, error));
    }
  }, [isLoading]);

  const GroupsArray = groups.map((group: IGroup) => {
    return <Menu.SubMenu key={group.groupId} title={group.name}></Menu.SubMenu>;
  });

  // return <>{GroupsArray}</>;
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      {GroupsArray}
    </Menu>
  );
}
