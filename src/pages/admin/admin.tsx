import './admin.css';
import { useEffect, useState } from 'react';
import { Button, Card, Layout } from 'antd';
import { SideMenu } from '../../components/side-menu';
import { AdminDefaultContent } from '../../components/admin/other/admin-default-content';
import { LogoutOutlined } from '@ant-design/icons';
import { IUser } from '../../interfaces/interfaces';
import { TeachersComponent } from '../../components/admin/teachers/teachers-component';
import { useNavigate } from 'react-router-dom';
import { SpecialitiesComponent } from '../../components/admin/specialities/specialities-component';
import { GroupsComponent } from '../../components/admin/groups/groups-component';

const { Header, Content, Footer, Sider } = Layout;

export function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [contentType, setContentType] = useState('default');
  const [contentData, setContentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUser | null>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      fetch(`/api/users/current`)
        .then((response) => response.json())
        .then((responseData) => {
          setCurrentUser(responseData);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(`Error getting user`, error);
        });
    }
  }, [isLoading]);

  const ContentValue = (contentType: string, contentData: any) => {
    switch (contentType) {
      case 'default':
      default:
        return <AdminDefaultContent />;
      case 'specialities':
        return <SpecialitiesComponent />;
      case 'teachers':
        return <TeachersComponent />;
      case 'groups':
        return <GroupsComponent specialityId={contentData} />;
    }
  };

  async function handleLogout() {
    fetch(`/api/authentication/logout`)
      .then((response) => response.json())
      .then(() => {
        setCurrentUser(null);
        navigate('/login');
      })
      .catch((error) => {
        console.log(`Error getting user`, error);
      });
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
        <SideMenu setContentType={setContentType} setContentData={setContentData} />
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
