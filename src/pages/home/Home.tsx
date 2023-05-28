import './home.css';
import { useEffect, useState } from 'react';
import { Button, Card, Layout } from 'antd';
import { SideMenu } from '../../components/side-menu';
import { AdminDefaultContent } from '../../components/admin-default-content';
import { TeachersComponent } from '../../components/teachers/teachers-component';
import { LogoutOutlined } from '@ant-design/icons';
import { IUser } from '../../interfaces/interfaces';

const { Header, Content, Footer, Sider } = Layout;

export function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [contentType, setContentType] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUser>();

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

  const SpecialitiesContent = <span>Specialities content</span>;

  const ContentValue = (contentType: string) => {
    switch (contentType) {
      case 'default':
        return <AdminDefaultContent />;
      case 'specialities':
        return SpecialitiesContent;
      case 'teachers':
        // return <TeachersComponent teachers={contentData} />;
        return <TeachersComponent />;
      default:
        return <AdminDefaultContent />;
    }
  };

  console.log('user', currentUser);

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
        <SideMenu setContentType={setContentType} />
      </Sider>
      <Layout className="site-layout">
        <Header>
          <Card>{currentUser ? currentUser!.username : 'no user'}</Card>
          <Button icon={<LogoutOutlined />} className="logout-button"></Button>
        </Header>
        <Content
          style={{
            margin: '0 16px'
          }}>
          {ContentValue(contentType)}
        </Content>
        <Footer>Student E-Journal ©2023 Created by Mefta</Footer>
      </Layout>
    </Layout>
  );
}
