import './admin.css';
import { useEffect, useState } from 'react';
import { Button, Card, Layout } from 'antd';
import { SideMenu } from '../../components/side-menu';
import { AdminDefaultContent } from '../../components/admin/other/admin-default-content';
import { LogoutOutlined } from '@ant-design/icons';
import { IGroup, ISpeciality, IUser } from '../../interfaces/interfaces';
import { TeachersComponent } from '../../components/admin/teachers/teachers-component';
import { useNavigate } from 'react-router-dom';
import { SpecialitiesComponent } from '../../components/admin/specialities/specialities-component';
import { GroupsComponent } from '../../components/admin/groups/groups-component';
import { StudentsComponent } from '../../components/admin/students/students-component';

const { Header, Content, Footer, Sider } = Layout;

export function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [contentType, setContentType] = useState('default');
  const [contentData, setContentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUser | null>();
  const [specialities, setSpecialities] = useState<ISpeciality[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      const promises = [
        fetch(`/api/users/current`)
          .then((response) => response.json())
          .then((responseData) => {
            setCurrentUser(responseData);
          })
          .catch((error) => {
            console.log(`Error getting user`, error);
          }),
        fetch(`/api/specialities`)
          .then((response) => response.json())
          .then((responseData) => {
            setSpecialities(responseData);
          })
          .catch((error) => {
            console.log(`Error getting specialities`, error);
          })
          .finally(() => setIsLoading(false))
      ];

      Promise.all(promises).then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  const ContentValue = (contentType: string, contentData: any) => {
    switch (contentType) {
      case 'default':
      default:
        return <AdminDefaultContent />;
      case 'specialities':
        return <SpecialitiesComponent setSpecialities={setSpecialities} />;
      case 'teachers':
        return <TeachersComponent />;
      case 'groups':
        return <GroupsComponent specialityId={contentData} setSpecialityGroups={setGroups} />;
      case 'students':
        return <StudentsComponent groupId={contentData} />;
    }
  };

  async function handleLogout() {
    fetch(`/api/authentication/logout`, { method: 'POST' })
      .then(() => {
        setCurrentUser(null);
        navigate('/login');
      })
      .catch((error) => {
        console.log(`Error getting user`, error);
      });
  }

  function handleSpecialityGroups(specialityId: string) {
    fetch(`/api/groups?specialityId=${specialityId}`)
      .then((response) => response.json())
      .then((groupsData: IGroup[]) => {
        setGroups(groupsData);
      })
      .catch((error) => console.log(`Error getting groups`, error));
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={400}
        collapsedWidth={150}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <div className="logo-img-wrapper">
          <img className="logo-img" src="src/assets/logo-2.jpg" />
        </div>
        <SideMenu
          setContentType={setContentType}
          setContentData={setContentData}
          specialities={specialities}
          groups={groups}
          handleSpecialityGroups={handleSpecialityGroups}
        />
      </Sider>
      <Layout className="site-layout">
        <Header>
          <Card className="user-username-card">
            {currentUser ? `${currentUser!.username} (${currentUser!.role})` : 'No user'}
          </Card>
          <Button
            icon={<LogoutOutlined />}
            className="logout-button"
            onClick={handleLogout}></Button>
        </Header>
        <Content>{ContentValue(contentType, contentData)}</Content>
        <Footer>Student E-Journal ©2023 Created by Mefta</Footer>
      </Layout>
    </Layout>
  );
}
