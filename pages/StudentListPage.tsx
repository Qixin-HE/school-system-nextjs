import Dashboard from "./Dashboard";
import { Space, Breadcrumb, Table } from 'antd';
import axios from 'axios';
import Link from 'next/link'
import React from 'react';



export async function getStaticProps() {
    var token;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem("token");
    }


    var value: any = "";
    await axios({
        method: 'get',
        url: 'http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students?page=1&limit=20',
        headers: {
            'Authorization': `Bearer ${token}`
            //'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoibWFuYWdlciIsImlkIjo1MDEsImlhdCI6MTYzNzM3Mjc1MiwiZXhwIjoxNjQ1MTQ4NzUyfQ.8loirW4xt3QgZJm_d7uB76gvO_6LgAwR0JK8h0ocFiw"
        },
        data: ''
    }).then(function (response) {
        // handle success
        console.log("i did try");
        value = response.data;
        //value = response.data;
    }).catch(function (error) {
        // handle error
        console.log(error);
    })
        .then(function () {
            // always executed
        });
    //const { data } = await axios(config);
    return {
        props: {
            data: value,
        }
    }

};

const StudentListPage = (props) => {
    const json = JSON.parse(props.data).data.students;
    // const result = json.map(e =>{
    //    return  {"name": e.data.student.name}
    // })
    var rows: any = [];
    json.forEach(e => {
        const obj = {
            id: e.id,
            name: e.name,
            area: e.country,
            email: e.email,
            selectedCurriculum: e.courses[0].name,
            studentType: e.type.name,
            joinTime: e.createdAt
        }
        rows.push(obj);

    })
    console.log(rows);

    const { Column, ColumnGroup } = Table;

    // const columns = [
    //     {
    //         title: 'No.',
    //         dataIndex: 'id',
    //         key: 'id',
    //     },
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         key: 'name',
    //     },
    //     {
    //         title: 'Area',
    //         dataIndex: 'area',
    //         key: 'area',
    //     },
    //     {
    //         title: 'Email',
    //         dataIndex: 'email',
    //         key: 'email',
    //     },
    //     {
    //         title: 'Selected Curriculum',
    //         dataIndex: 'selectedCurriculum',
    //         key: 'selectedCurriculum',
    //     },
    //     {
    //         title: 'Student Type',
    //         dataIndex: 'studentType',
    //         key: 'studentType',
    //     },
    //     {
    //         title: 'Join Time',
    //         dataIndex: 'joinTime',
    //         key: 'joinTime',
    //     },
    //     {
    //         title: 'Action',
    //         dataIndex: 'action',
    //         key: 'action',
    //     },
    // ];




    return (
        <>
            <Dashboard>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
                    <Breadcrumb.Item>Student</Breadcrumb.Item>
                    <Breadcrumb.Item>Student List</Breadcrumb.Item>
                </Breadcrumb>
                <Table dataSource={rows} >
                    <Column title="No." dataIndex="id" key="id" />
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="Area" dataIndex="area" key="area" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Selected Curriculum" dataIndex="selectedCurriculum" key="selectedCurriculum" />
                    <Column title="Student Type" dataIndex="studentType" key="studentType" />
                    <Column title="Join Time" dataIndex="joinTime" key="joinTime" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <a>Edit</a>
                                <a>Delete</a>
                            </Space>
                        )}
                    />
                </Table>
            </Dashboard>
        </>
    )
}

export default StudentListPage;