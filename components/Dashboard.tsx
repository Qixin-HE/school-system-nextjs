import { Layout, Menu, Button, Tooltip, Dropdown } from 'antd';
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
import { useState, useEffect } from 'react';
import Link from 'next/link'
import React, { ReactNode } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router'
import { url } from 'inspector';

// enum axiosMethod {
// post =  "post",
// get = "get"
// }



// interface axiosConfig {
//     method: axiosMethod,
//     url: String,
//     headers: object
//     data?: String
// }


const Dashboard = ({ children }: any) => {
    const [isCollapsed, setIsCollased] = useState<boolean>(false);
    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;
    //React['useEffectLayout'] = React.useEffect;
    var token:String | null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem("token");
    }
    const router = useRouter();





    const logout = () => {
        console.log("Loging out")

        axios.post('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/logout', "",
        {
            headers: {'Authorization': `Bearer ${token}`}
        }
        ).then(function (response) {
                const status = response.data.msg;
                if (status === "success"){
                    localStorage.removeItem("token")
                    alert(`You have ${status}fully logout.`)
                    
                    router.push("/")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    const userDropDownMenu = (
        <Menu>
            <Menu.Item key="profile">
                <a target="_blank" rel="noopener noreferrer" href="">
                    Profile(not implemented)
                </a>
            </Menu.Item>
            <Menu.Item key="logout">
                <a target="_blank" rel="noopener noreferrer" onClick={logout}>
                    Logout
                </a>
            </Menu.Item>

        </Menu>
    );
    return (
        <>
            <Layout>
                <Header style={{ zIndex: 1, width: '100%' }}>
                    <div className="logo">
                        <h3 style={{ fontFamily: "Bebas Neue", color: "#FFFFFF", position: "absolute", marginTop: "1px" }}>cms</h3>
                    </div>
                    <div style={{ paddingLeft: "100px", color: "#FFFFFF" }}>
                        {
                            isCollapsed ? <Button ghost style={{ borderColor: "black" }} icon={<MenuUnfoldOutlined />} onClick={e => setIsCollased(false)} /> : <Button ghost style={{ borderColor: "black" }} icon={<MenuFoldOutlined />} onClick={e => setIsCollased(true)} />
                        }
                    </div>
                    <div style={{ position: "absolute", top: 0, right: "30px" }}>
                        <Tooltip title="Notification">

                            <Button ghost style={{ borderColor: "black", left: "-15px" }} size="large" icon={<BellOutlined />} />
                        </Tooltip>

                        <Dropdown overlay={userDropDownMenu} arrow>
                            <Button shape="circle" icon={<UserOutlined />} />
                        </Dropdown>
                    </div>

                </Header>
                <Layout className="site-layout">
                    <Sider
                        style={{
                            overflow: 'auto',
                            minHeight: '100vh',
                            left: 0,
                        }}
                        collapsible collapsed={isCollapsed} onCollapse={e => setIsCollased(e)}
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode="inline">
                            <Menu.Item key="1" icon={<DashboardOutlined />}>
                                <Link href="overview">
                                    Overview
                                </Link>
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<AuditOutlined />} title="Student">
                                <Menu.Item key="2" icon={< TeamOutlined />}>
                                    <Link href="student/studentlist">
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
                    <Content className="site-layout-background"
                        style={{ margin: '0 16px' }}>

                        {children}
                    </Content>
                </Layout>

                <Footer></Footer>

            </Layout>
        </>
    )
}


export default Dashboard;