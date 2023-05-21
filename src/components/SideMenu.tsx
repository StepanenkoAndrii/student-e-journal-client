import { useEffect, useState } from 'react';
import { ISpeciality } from '../interfaces/interfaces';
import { Menu } from 'antd';
import { MenuGroups } from './Groups';
import { BookOutlined, UserOutlined } from '@ant-design/icons';

export function SideMenu({ setContentType, setContentData }: any) {
  const [specialities, setSpecialities] = useState<ISpeciality[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const teachersTitle = 'Teachers';

  useEffect(() => {
    if (isLoading) {
      fetch(`/api/specialities`)
        .then((response) => response.json())
        .then((responseData) => {
          setSpecialities(responseData);
          setIsLoading(false);
        })
        .catch((error) => console.log(`Error getting specialities`, error));
    }
  }, [isLoading]);

  async function handleTeachersOnClick() {
    fetch(`/api/users/teachers`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);

        setContentType('teachers');
        setContentData(responseData);
      })
      .catch((error) => console.log(`Error getting teachers`, error));
  }

  const SpecialitiesArray = specialities.map((speciality: ISpeciality) => {
    return (
      <Menu.SubMenu
        key={speciality.specialityId}
        title={`${speciality.number}, ${speciality.name}`}
        icon={<BookOutlined />}
        onTitleClick={() => setContentType('specialities')}>
        <MenuGroups specialityId={speciality.specialityId} />
      </Menu.SubMenu>
    );
  });

  const Teachers = (
    <Menu.Item key={`teachersTitleKey`} icon={<UserOutlined />} onClick={handleTeachersOnClick}>
      {teachersTitle}
    </Menu.Item>
  );

  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      {SpecialitiesArray}
      {Teachers}
    </Menu>
  );
}
