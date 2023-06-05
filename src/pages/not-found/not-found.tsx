import { Button, Col, Empty, Layout, Row } from 'antd';
import './not-found.css';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  const notFoundText = 'Page not found';

  function goToMainPage() {
    navigate('/');
  }

  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: '100vh', textAlign: 'center' }}
        className="main-row">
        <Col>
          <Empty className="empty-not-found" description={notFoundText} />
          <Button size="large" className="go-to-button" onClick={goToMainPage}>
            {`Go to Main Page`}
          </Button>
        </Col>
        <div className="logo-img-wrapper-main-page">
          <img className="logo-img-main-page logo-img" src="src/assets/logo.png" />
        </div>
      </Row>
      <Layout.Footer className="footer-main-page">
        Student E-Journal ©2023 Created by Mefta
      </Layout.Footer>
    </>
  );
}
