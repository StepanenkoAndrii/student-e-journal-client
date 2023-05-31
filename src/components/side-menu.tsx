import { ISpeciality } from '../interfaces/interfaces';
import { Menu } from 'antd';
import { MenuGroups } from './groups';
import { BookOutlined, UserOutlined } from '@ant-design/icons';

export function SideMenu({
  setContentType,
  setContentData,
  specialities,
  groups,
  handleSpecialityGroups
}: any) {
  const teachersTitle = 'Teachers';
  const specialitiesTitle = 'Specialities';
  const subjectsTitle = 'Subjects';

  const Subjects = (
    <Menu.Item
      key={`subjectsTitleKey`}
      icon={<BookOutlined />}
      onClick={() => setContentType('subjects')}>
      {subjectsTitle}
    </Menu.Item>
  );

  const SpecialitiesArray = specialities.map((speciality: ISpeciality) => {
    return (
      <Menu.SubMenu
        key={speciality.specialityId}
        title={`${speciality.number}, ${speciality.name}`}
        icon={<BookOutlined />}
        onTitleClick={() => {
          handleSpecialityGroups(speciality.specialityId);
          setContentType('specialities');
        }}>
        <MenuGroups
          specialityId={speciality.specialityId}
          setContentType={setContentType}
          setContentData={setContentData}
          groups={groups}
          handleSpecialityGroups={handleSpecialityGroups}
        />
      </Menu.SubMenu>
    );
  });

  const Teachers = (
    <Menu.Item
      key={`teachersTitleKey`}
      icon={<UserOutlined />}
      onClick={() => setContentType('teachers')}>
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
      {Subjects}
    </Menu>
  );
}
