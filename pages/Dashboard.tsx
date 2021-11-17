import { Layout, Menu, Button, Tooltip } from 'antd';
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
    BellOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import Link from 'next/link'
import React, { ReactNode } from 'react';






//what should children's type be?
const Dashboard = ({ children }) => {
    const [isCollapsed, setIsCollased] = useState(false);
    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;
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
                            <Link href="OverviewPage">
                                Overview
                            </Link>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<AuditOutlined />} title="Student">
                            <Menu.Item key="2" icon={< TeamOutlined />}>
                                <Link href="StudentListPage">
                                    Student List
                                </Link>
                            </Menu.Item>

                        </SubMenu>

                        <SubMenu key="sub2" icon={<UserOutlined />} title="Teacher">
                            <Menu.Item key="4" icon={< TeamOutlined />}>
                                <Link href="TeacherListPage">
                                    Teacher List
                                </Link>
                            </Menu.Item>

                        </SubMenu>
                        <SubMenu key="sub3" icon={<ReadOutlined />} title="Course">
                            <Menu.Item key="5" icon={<ProjectOutlined />}>
                                <Link href="AllCoursePage">
                                    All Course
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="6" icon={<PlusSquareOutlined />}>
                                <Link href="AddCoursePage">
                                    Add Course
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="7" icon={<EditOutlined />}>
                                <Link href="EditCoursePage">
                                    Edit Course
                                </Link>
                            </Menu.Item>
                        </SubMenu>

                        <Menu.Item key="9" icon={<MessageOutlined />}>

                            <Link href="MessagePage">
                                Message
                            </Link>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo">
                        <h3 style={{ fontFamily: "Bebas Neue", color: "#FFFFFF", position: "fixed", marginTop: "1px" }}>cms</h3>
                    </div>


                    <div style={{ paddingLeft: "100px", color: "#FFFFFF" }}>

                        {
                            isCollapsed ? <Button ghost style={{ borderColor: "black" }} icon={<MenuUnfoldOutlined />} onClick={e => setIsCollased(false)} /> : <Button ghost style={{ borderColor: "black" }} icon={<MenuFoldOutlined />} onClick={e => setIsCollased(true)} />
                        }
                    </div>

                    <div style={{position: "fixed", top: 0, right: "30px"}}>
                        <Tooltip title="Notification">
                            <Button ghost style={{ borderColor: "black", left: "-15px" }} size="large" icon={<BellOutlined />} />
                        </Tooltip>
                        <Tooltip title="User">
                            <Button shape="circle" icon={<UserOutlined />} />
                        </Tooltip>

                    </div>

                </Header>
                <Layout className="site-layout">
                    {/* <Header className="site-layout-background" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <div className="logo">
                            <h3 style={{ fontFamily: "Bebas Neue", color: "#FFFFFF", position: "fixed", marginTop: "1px" }}>cms</h3>
                        </div>


                        <div style={{ paddingLeft: "100px", color: "#FFFFFF" }}>
                            
                            {
                                isCollapsed ? <Button ghost style={{ borderColor: "black" }} icon={<MenuUnfoldOutlined />} onClick={e => setIsCollased(false)} /> : <Button ghost style={{ borderColor: "black" }} icon={<MenuFoldOutlined />} onClick={e => setIsCollased(true)} />
                            }
                        </div>

                    </Header> */}
                    <Content className="site-layout-background"
                        style={{
                            margin: '100px 200px',
                            padding: 24,
                            minHeight: 280,
                        }}>

                        {children}
                    </Content>
                    <Footer></Footer>
                </Layout>
            </Layout>

        </>
    )
}


export default Dashboard;