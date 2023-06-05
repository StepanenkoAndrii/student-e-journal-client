import { useEffect, useState } from 'react';
import './home.css';
import { Row, Col, Typography, Button, Card, Layout } from 'antd';
import { IUser } from '../../interfaces/interfaces';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Footer } = Layout;

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUser | null>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      fetch(`/api/users/current`)
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.userId) {
            setCurrentUser(responseData);
          }
        })
        .catch((error) => {
          console.log(`Error getting user`, error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoading]);

  function handleLogout() {
    fetch(`/api/authentication/logout`, { method: 'POST' })
      .then(() => {
        setCurrentUser(null);
        navigate('/login');
      })
      .catch((error) => {
        console.log(`Error getting user`, error);
      });
  }

  function goToOtherPage() {
    console.log(currentUser);
    if (currentUser?.role === 'Administrator') {
      navigate('/admin');
    } else {
      navigate('/teacher');
    }
  }

  function goToLoginPage() {
    navigate('/login');
  }

  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: '100vh', textAlign: 'center' }}
        className="main-row">
        <Col>
          {currentUser && (
            <>
              <Title level={1} className="main-title">{`Welcome to Students E-Journal`}</Title>
              <Button size="large" className="go-to-button" onClick={goToOtherPage}>
                {`Go to ${currentUser.role} Page`}
              </Button>
            </>
          )}
          {!currentUser && (
            <>
              <Title level={1} className="main-title">{`Welcome to Students E-Journal`}</Title>
              <Button size="large" className="go-to-button" onClick={goToLoginPage}>
                {`Authorize`}
              </Button>
            </>
          )}
        </Col>
        <div className="logo-img-wrapper-main-page">
          <img className="logo-img-main-page logo-img" src="src/assets/logo.png" />
        </div>
        <Card className="main-page-user-username-card user-username-card">
          {currentUser ? `${currentUser!.username} (${currentUser!.role})` : 'Not authorized'}
        </Card>
        <Button
          icon={<LogoutOutlined />}
          className="main-page-logout-button logout-button "
          onClick={handleLogout}></Button>
      </Row>
      <Footer className="footer-main-page">Student E-Journal ©2023 Created by Mefta</Footer>
    </>
  );
}
