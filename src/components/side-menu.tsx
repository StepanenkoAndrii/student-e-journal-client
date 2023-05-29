import { useEffect, useState } from 'react';
import { ISpeciality } from '../interfaces/interfaces';
import { Menu } from 'antd';
import { MenuGroups } from './groups';
import { BookOutlined, UserOutlined } from '@ant-design/icons';

export function SideMenu({ setContentType, setContentData }: any) {
  const [specialities, setSpecialities] = useState<ISpeciality[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const teachersTitle = 'Teachers';
  const specialitiesTitle = 'Specialties';

  useEffect(() => {
    if (isLoading) {
      fetch(`/api/specialities`)
        .then((response) => response.json())
        .then((responseData) => {
          setSpecialities(responseData);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(`Error getting specialities`, error);
        });
    }
  }, [isLoading]);

  async function handleTeachersOnClick() {
    setContentType('teachers');
  }

  const SpecialitiesArray = specialities.map((speciality: ISpeciality) => {
    return (
      <Menu.SubMenu
        key={speciality.specialityId}
        title={`${speciality.number}, ${speciality.name}`}
        icon={<BookOutlined />}
        onTitleClick={() => setContentType('specialities')}>
        <MenuGroups
          specialityId={speciality.specialityId}
          setContentType={setContentType}
          setContentData={setContentData}
        />
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
      <Menu.SubMenu
        title={specialitiesTitle}
        icon={<BookOutlined />}
        onTitleClick={() => setContentType('specialities')}>
        {SpecialitiesArray}
      </Menu.SubMenu>
      {Teachers}
    </Menu>
  );
}
