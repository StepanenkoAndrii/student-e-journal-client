import './teacher.css';
import { useEffect, useState } from 'react';
import { Button, Card, Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { ISubject, IUser } from '../../interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import { TeacherDefaultContent } from '../../components/teacher/other/teacher-default-content';
import { SideMenu } from '../../components/teacher/other/side-menu';

const { Header, Content, Footer, Sider } = Layout;

export function Teacher() {
  const [collapsed, setCollapsed] = useState(false);
  const [contentType, setContentType] = useState('default');
  const [contentData, setContentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUser | null>();
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      const promises = [
        fetch(`/api/users/current`)
          .then((response) => response.json())
          .then((currentUserData: IUser) => {
            setCurrentUser(currentUserData);
            fetch(`/api/teacher-subjects?teacherId=${currentUserData?.userId}`)
              .then((response) => response.json())
              .then((subjectsData: ISubject[]) => {
                setSubjects(subjectsData);
              })
              .catch((error) => {
                console.log(`Error getting teacher subjects`, error);
              });
          })
          .catch((error) => {
            console.log(`Error getting user`, error);
          })
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
        return <TeacherDefaultContent />;
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
          subjects={subjects}
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