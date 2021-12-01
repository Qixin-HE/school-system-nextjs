import Dashboard from "../../lib/components/Dashboard";
import { Space, Breadcrumb, Table, TablePaginationConfig } from 'antd';
import { StudentListRecord } from "../../lib/model/student";
import { useEffect, useState } from 'react';
import { getStudentListService } from '../../lib/api/service';



const StudentListPage = () => {
    
    const [data, setData] = useState<StudentListRecord[]>([]);
    //var total:number;
    const [total, setTotal] =  useState<number>();
    const [page, setPage] =  useState<number>();
    const [limit, setLimit] =  useState<number>();
    
    useEffect(() => {
        const rows = getStudentListService(page, limit);
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
                    <Breadcrumb.Item>Student</Breadcrumb.Item>
                    <Breadcrumb.Item>Student List</Breadcrumb.Item>
                </Breadcrumb>
                <Table dataSource={data} pagination={pagination} onChange={handleTableChange} >
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