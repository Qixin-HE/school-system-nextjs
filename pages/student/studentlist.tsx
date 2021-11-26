import Dashboard from "../../components/Dashboard";
import { Space, Breadcrumb, Table } from 'antd';
import { AxiosResponse } from 'axios';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { getService } from '../../api/service';
import { getStudentResponse, Student, StudentListRecord } from "../../model/student";



const StudentListPage = () => {
    
    const [data, setData] = useState();
    var rows: any = [];
    useEffect(() => {
        var value:getStudentResponse;
        
        getService("students?page=1&limit=20").then(function (response : AxiosResponse) {           
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