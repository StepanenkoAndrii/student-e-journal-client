import { ISubject } from '../../../interfaces/interfaces';
import { Menu } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { MenuGroups } from './menu-groups';

export function SideMenu({ setContentType, setContentData, subjects }: any) {
  const subjectsTitle = 'Subjects';

  const SubjectsArray = subjects.map((subject: ISubject) => {
    return (
      <Menu.SubMenu
        key={subject.subjectId}
        title={subject.name}
        icon={<BookOutlined />}
        onTitleClick={() => {
          setContentType('subjects');
        }}>
        <MenuGroups />
      </Menu.SubMenu>
    );
  });

  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.SubMenu
        title={subjectsTitle}
        icon={<BookOutlined />}
        onTitleClick={() => setContentType('subjects')}>
        {SubjectsArray}
      </Menu.SubMenu>
    </Menu>
  );
}
