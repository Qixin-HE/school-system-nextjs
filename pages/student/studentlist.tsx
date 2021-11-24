import Dashboard from "../../components/Dashboard";
import { Space, Breadcrumb, Table } from 'antd';
import axios from 'axios';
import Link from 'next/link'
import { useEffect, useState } from 'react';


type StudentTypeName = "tester" | "developer";

interface StudentType {
    id: number,
    name: StudentTypeName
}
interface Course {
    id: number,
    courseId: number,
    name: string, 
}
interface Student {
    createdAt: string,
    updatedAt: string,
    id: number,
    email: string,
    name: string,
    country: string,
    profileId: number,
    type: StudentType,
    courses: Course[],


}
interface getStudentResponse {
    total: number,
    students: Student[],
    paginator: ResponsePaginator
}

interface ResponsePaginator {
    page: number,
    limit: number
}

interface StudentListRecord {
    id: number,
    name: string,
    area: string,
    email: string,
    selectedCurriculum: string,
    studentType: string,
    joinTime: string | undefined
}

const StudentListPage = () => {
    
    const [data, setData] = useState();
    var rows: any = [];
    useEffect(() => {
        var value:getStudentResponse;
        const token = localStorage.getItem("token");
        console.log("token", token);
        //Axios.get<any, AxiosResponse<any, any>, any> 这个<>之间的是什么？
        axios.get('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students?page=1&limit=20', {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(function (response) {           
            value = response.data.data;
            //console.log(value)

        }).catch(function (error) {
            // handle error
            console.log(error);
        }).then(function () {

            const json: Student[] = value.students;

            const calculateJoinTime = (joinTime: string):string => {
                const now = new Date();
                const then = new Date(joinTime);
                var Difference_In_Time: number = now.getTime() - then.getTime();

                // To calculate the no. of days between two dates
                var years : number = Difference_In_Time / (1000 * 3600 * 24 * 30 * 12);

                const almostYear: number = parseInt(years.toString()) + 1;

                if (parseInt((years % 1).toFixed(2).substring(2)) >= 50) {
                    return "Almost " + almostYear + " years ago"
                } else if (parseInt((years % 1).toFixed(2).substring(2)) < 50) {
                    return "Over " + parseInt(years.toString()) + " years ago"
                }
                return "No record."
            }

            json.forEach(e => {
                const obj:StudentListRecord = {
                    id: e.id,
                    name: e.name,
                    area: e.country,
                    email: e.email,
                    selectedCurriculum: e.courses.map(item => item.name).join(","),
                    studentType: e.type.name,
                    joinTime: calculateJoinTime(e.createdAt)
                }
                rows.push(obj);

            })
            setData(rows);
            //console.log("rows", data)
        });

    }, []);

    const { Column, ColumnGroup } = Table;

    return (
        <>
            <Dashboard>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
                    <Breadcrumb.Item>Student</Breadcrumb.Item>
                    <Breadcrumb.Item>Student List</Breadcrumb.Item>
                </Breadcrumb>
                <Table dataSource={data} >
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