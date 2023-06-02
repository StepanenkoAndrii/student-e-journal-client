import { IGroup, ISubject } from '../../../interfaces/interfaces';
import { Menu } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { MenuGroups } from './menu-groups';

interface SideMenuProps {
  setContentType: any;
  setContentData: any;
  subjects: ISubject[];
  groups: IGroup[];
  handleSubjectGroups: any;
}

export function SideMenu({
  setContentType,
  setContentData,
  subjects,
  groups,
  handleSubjectGroups
}: SideMenuProps) {
  const subjectsTitle = 'Subjects';

  const SubjectsArray = subjects.map((subject: ISubject) => {
    return (
      <Menu.SubMenu
        key={subject.subjectId}
        title={subject.name}
        icon={<BookOutlined />}
        onTitleClick={() => {
          handleSubjectGroups(subject.subjectId);
          setContentType('groups');
        }}>
        <MenuGroups
          setContentType={setContentType}
          setContentData={setContentData}
          groups={groups}
          subjectId={subject.subjectId}
        />
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
