import './Home.css';
import { useState } from 'react';
import { Layout, theme } from 'antd';
import { SideMenu } from '../../components/SideMenu';
import { AdminDefaultContent } from '../../components/AdminDefaultContent';
import { TeachersComponent } from '../../components/Teachers/TeachersComponent';

const { Header, Content, Footer, Sider } = Layout;

export function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [contentType, setContentType] = useState('default');
  const [contentData, setContentData] = useState([]);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const SpecialitiesContent = <span>Specialities content</span>;

  const ContentValue = (contentType: string, contentData: any[]) => {
    switch (contentType) {
      case 'default':
        return <AdminDefaultContent />;
      case 'specialities':
        return SpecialitiesContent;
      case 'teachers':
        return <TeachersComponent teachers={contentData} />;
      default:
        return <AdminDefaultContent />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={400}
        collapsedWidth={150}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <SideMenu setContentType={setContentType} setContentData={setContentData} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content
          style={{
            margin: '0 16px'
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center'
          }}>
          {ContentValue(contentType, contentData)}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}
