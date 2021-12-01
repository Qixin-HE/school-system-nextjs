import Dashboard from "../lib/components/Dashboard";
import Link from 'next/link';
import { getService } from "../lib/api/baseService";
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Space, Breadcrumb, Table, TablePaginationConfig } from 'antd';
import { ResponsePaginator } from '../lib/model/response';
import { TeacherResponse, Teacher, TeacherListRecord } from '../lib/model/teacher';
import { getTeacherListService } from "../lib/api/service";



const TeacherListPage = () => {
    const [data, setData] = useState<TeacherListRecord[]>([]);
    //var total:number;
    const [total, setTotal] =  useState<number>();
    const [page, setPage] =  useState<number>();
    const [limit, setLimit] =  useState<number>();
    
    useEffect(() => {
        const rows = getTeacherListService(page, limit);
        rows.then(function(result) {
            setData(result.data);
            setTotal(result.total);
            //console.log("total is" + total)
            console.log(data);
        });          
        

    }, [page,limit]);

    const { Column } = Table;
    const pagination = {
        current: page,
        pageSize: limit,
        total: total
      }
      const handleTableChange = (pagination: TablePaginationConfig) => {
        setPage(pagination.current);
        setLimit(pagination.pageSize);
        
      };


   

    return (
        <>
            <Dashboard>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
                    <Breadcrumb.Item>Teacher</Breadcrumb.Item>
                    <Breadcrumb.Item>Teacher List</Breadcrumb.Item>
                </Breadcrumb>
                <Table dataSource={data} pagination={pagination} onChange={handleTableChange}>
                    <Column title="No." dataIndex="id" key="id" />
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="Country" dataIndex="country" key="country" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Skill" dataIndex="skill" key="skill" />
                    <Column title="Course Amount" dataIndex="courseAmount" key="courseAmount" />
                    <Column title="Phone" dataIndex="phone" key="phone" />
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

export default TeacherListPage;