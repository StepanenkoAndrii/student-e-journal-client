// import Grid from '@mui/material/Unstable_Grid2';
import './Home.css';
// import { Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IGroup, ISpeciality } from '../../interfaces/interfaces';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import {
//   DesktopOutlined,
//   FileOutlined,
//   PieChartOutlined,
//   TeamOutlined,
//   UserOutlined
// } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

// type MenuItem = Required<MenuProps>['items'][number];

interface IGroupsMenuProps {
  specialityId: string;
}

export function Home() {
  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const data = await fetch('/api/authentication');
  //     const isLoggedIn = data.status !== 401;

  //     setLoggedIn(isLoggedIn);
  //   })();
  // }, []);

  // const text = loggedIn ? (
  //   <div>
  //     <h1>Welcome to Student E-Journal</h1>
  //   </div>
  // ) : (
  //   <div>
  //     <h1>Please log in</h1>
  //   </div>
  // );

  // return <div>{text}</div>;

  // const [specialities, setSpecialities] = useState<ISpeciality[]>([]);
  // const [specialitiesVisibility, setSpecialitiesVisibility] = useState(false);

  // async function handleSpecialitiesOnClick(): Promise<void> {
  //   if (!specialities.length) {
  //     const data: Response = await fetch('/api/specialities');
  //     const specialitiesData: ISpeciality[] = await data.json();
  //     setSpecialities(specialitiesData);
  //   }
  //   setSpecialitiesVisibility(!specialitiesVisibility);
  // }

  // const SpecialitiesButtons = () => {
  // specialities.map((speciality: ISpeciality) => {
  //   return (
  //     <Button
  //       key={speciality.specialityId}
  //       variant="text"
  //       onClick={() => handleSpecialityGroupsOnClick(speciality.specialityId)}>
  //       {speciality.number}, {speciality.name}
  //     </Button>
  //   );
  // });

  // return (
  //   <Grid container spacing={2} className="main-grid">
  //     <Grid xs={12} className="top-menu-grid">
  //       <div>xs=6 md=4</div>
  //     </Grid>
  //     <Grid xs={3} className="left-menu-grid">
  //       <Stack spacing={2}>
  //         <Button variant="text" onClick={handleSpecialitiesOnClick}>
  //           Specialities
  //         </Button>

  //         {specialitiesVisibility && <SpecialitiesButtons/>}
  //       </Stack>
  //     </Grid>
  //     <Grid xs={9} className="main-content-grid">
  //       <div>xs=6 md=8</div>
  //     </Grid>
  //   </Grid>
  // );

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const [specialities, setSpecialities] = useState<ISpeciality[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    (async () => {
      const data: Response = await fetch('/api/specialities');
      const specialitiesData: ISpeciality[] = await data.json();
      setSpecialities(specialitiesData);
    })();
  }, []);

  async function handleSpecialityGroupsOnClick(event: any) {
    const specialityId: string = event.key;

    if (!groups.length) {
      const data: Response = await fetch(`/api/groups?specialityId=${specialityId}`);
      const groupsData: IGroup[] = await data.json();

      groups.push(...groupsData);
      setGroups(groups);
    }
  }

  const MenuSpecialityGroups = (props: IGroupsMenuProps) => {
    const specialityGroups = groups.filter(
      (group: IGroup) => group.specialityId === props.specialityId
    );

    const GroupsMenu = specialityGroups.map((group: IGroup) => {
      return (
        <Menu.SubMenu
          key={group.groupId}
          title={`${group.name}`}
          // onTitleClick={handleSpecialitiesOnClick}
        ></Menu.SubMenu>
      );
    });

    return <>{GroupsMenu}</>;
  };

  const MenuSpecialities = specialities.map((speciality: ISpeciality) => {
    return (
      <Menu.SubMenu
        key={speciality.specialityId}
        title={`${speciality.number}, ${speciality.name}`}
        onTitleClick={handleSpecialityGroupsOnClick}>
        <MenuSpecialityGroups specialityId={speciality.specialityId} />
      </Menu.SubMenu>
    );
  });

  // const MenuSpecialityGroups = groups.map((group: IGroup) => {
  //   return <Menu.SubMenu key={}></Menu.SubMenu>;
  // });

  // ...specialities.map((speciality: ISpeciality) => {
  //   return getItem(`${speciality.number}, ${speciality.name}`, speciality.specialityId, null, []);
  // })

  // getItem('Option 2', '2', <DesktopOutlined />),
  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5')
  // ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  // getItem('Files', '9', <FileOutlined />)

  // async function handleMenuItemClick(menuInfo: any) {
  //   // console.log('hgsdhg');
  //   // const menuValue = menuInfo.domEvent.target.innerText;
  //   console.log(menuInfo);
  // }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          // onClick={handleMenuItemClick}
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          // items={MenuItems}
        >
          {MenuSpecialities}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}
