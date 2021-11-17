import { Layout, Menu, Button } from 'antd';
import {
    AuditOutlined,
    MessageOutlined,
    DashboardOutlined,
    UserOutlined,
    TeamOutlined,
    ReadOutlined,
    ProjectOutlined,
    PlusSquareOutlined,
    EditOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons';
import { useState } from 'react';
import React, { ReactNode } from 'react';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


// class Dashboard extends React.Component  {
//     state = {
//         collapsed: false,
//       };
    
//       toggle = () => {
//         this.setState({
//           collapsed: !this.state.collapsed,
//         });
//       };
    
// render () {
const Dashboard = () => {
    const [isCollapsed, setIsCollased] = useState(false);

    return (
        <>
         <Layout>
         <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: "64px"
      }}
      trigger={null} collapsible collapsed={isCollapsed}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          Overview
        </Menu.Item>
        <SubMenu key="sub1" icon={<AuditOutlined />} title="Student">
              <Menu.Item key="2" icon={< TeamOutlined />}>Student List</Menu.Item>
              
            </SubMenu>
        
        <SubMenu key="sub2" icon={<UserOutlined />} title="Teacher">
              <Menu.Item key="4" icon={< TeamOutlined />}>Teacher List</Menu.Item>
              
            </SubMenu>
            <SubMenu key="sub3" icon={<ReadOutlined />} title="Course">
              <Menu.Item key="5" icon={<ProjectOutlined />}>All Course</Menu.Item>
              <Menu.Item key="6"icon={<PlusSquareOutlined />}>Add Course</Menu.Item>
              <Menu.Item key="7"icon={<EditOutlined />}>Edit Course</Menu.Item>
            </SubMenu>
        
        <Menu.Item key="9" icon={<MessageOutlined />}>
          Message
        </Menu.Item>
        
      </Menu>
    </Sider>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo"> 
      <h3 style={{fontFamily: "Bebas Neue", color: "#FFFFFF", position: "fixed", marginTop: "1px"}}>cms</h3>
      </div>
      
      
      <div style={{paddingLeft: "100px", color: "#FFFFFF"}}>
      {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })} */}
            {
                isCollapsed ? <Button ghost style={{borderColor: "black"}} icon={<MenuUnfoldOutlined />} onClick={e =>setIsCollased(false)}/> : <Button ghost style={{borderColor: "black"}} icon={<MenuFoldOutlined />} onClick={e =>setIsCollased(true)} />
            }
    </div>
      
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      
      </Content>
  </Layout>

        </>
    )
    }


export default Dashboard;