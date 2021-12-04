import Dashboard from "../../components/Dashboard";
import {
    Space, Breadcrumb, Table, TablePaginationConfig, Modal,
    Form, Select, Input, Button
} from 'antd';
import { StudentListRecord } from "../../lib/model/student";
import { useEffect, useState } from 'react';
import { getStudentListService, postStudentService } from '../../lib/api/service';



const StudentListPage = () => {

    const [data, setData] = useState<StudentListRecord[]>([]);
    //var total:number;
    const [total, setTotal] = useState<number>();
    const [page, setPage] = useState<number>();
    const [limit, setLimit] = useState<number>();
    const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);

    useEffect(() => {
        const rows = getStudentListService(page, limit);
        rows.then(function (result) {
            setData(result.data);
            setTotal(result.total);
            //console.log("total is" + total)
            console.log(data);
        });


    }, [page, limit, shouldUpdate]);

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

    // for modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        //setIsModalVisible(false);
        name == undefined ? setName(form.getFieldValue("name")) : null;
        email == undefined ? setEmail(form.getFieldValue("email")) : null;
        area == undefined ? setArea(form.getFieldValue("area")) : null;
        studentType == undefined ? setStudentType(form.getFieldValue("studenttype")) : null;

        if (name != undefined && email != undefined && area != undefined && studentType != undefined) {
            postStudentService(
                {
                    name: name,
                    email: email,
                    country: area,
                    type: studentType == "tester" ? 1 : 0,
                });

        } else {
            console.log("here comes else" +
                JSON.stringify({
                    name: name,
                    email: email,
                    country: area,
                    type: studentType == "tester" ? 1 : 0,
                }))
        }
        setShouldUpdate(true);
        setIsModalVisible(false);

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //for edit student form
    const { Option } = Select;

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const [form] = Form.useForm();

    const onAreaChange = (value: string) => {
        setArea(value);
    };
    const onStudentTypeChange = (value: string) => {
        setStudentType(value);
    };


    // const onFinish = () => {
    //     console.log({
    //         name: name,
    //         email: email,
    //         area: area,
    //         studentType: studentType
    //     });
    // };



    const onFill = () => {
        form.setFieldsValue({
            name: 'zoe',
            email: 'zoe@test.com',
            area: 'china',
            studenttype: 'tester'
        });
    };

    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [area, setArea] = useState<string>();
    const [studentType, setStudentType] = useState<string>();

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
                                <a onClick={showModal}>Edit</a>
                                <Modal title="Add Student" mask={false} visible={isModalVisible} onOk={handleOk}
                                    onCancel={handleCancel} footer={[
                                        <Button key="add" type="primary" onClick={handleOk}>
                                            Add
                                        </Button>,
                                        <Button key="cancel" onClick={handleCancel}>
                                            Cancel
                                        </Button>,

                                    ]}>
                                    <Form {...layout} form={form} name="control-hooks">
                                        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                                            <Input onChange={e => {
                                                form.setFieldsValue({ name: e.target.value });
                                                setName(e.target.value)
                                            }} />
                                        </Form.Item>
                                        <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
                                            <Input onChange={e => {
                                                form.setFieldsValue({ email: e.target.value })
                                                setEmail(e.target.value)
                                            }} />
                                        </Form.Item>
                                        <Form.Item name="area" label="Area" rules={[{ required: true }]}>
                                            <Select
                                                placeholder="Select an option"
                                                onChange={onAreaChange}
                                                allowClear
                                            >
                                                <Option value="china">China</Option>
                                                <Option value="zimbabwe">Zimbabwe</Option>
                                                <Option value="lebanon">Lebanon</Option>
                                                <Option value="other">Other</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            noStyle
                                            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                                        >
                                            {({ getFieldValue }) =>
                                                getFieldValue('area') === 'other' ? (
                                                    <Form.Item name="customizeArea" label="Customize Area" rules={[{ required: true }]}>
                                                        <Input />
                                                    </Form.Item>
                                                ) : null
                                            }
                                        </Form.Item>
                                        <Form.Item name="studenttype" label="Student Type" rules={[{ required: true }]}>
                                            <Select
                                                placeholder="Select an option."
                                                onChange={onStudentTypeChange}
                                                allowClear
                                            >
                                                <Option value="developer">Developer</Option>
                                                <Option value="tester">Tester</Option>

                                            </Select>
                                        </Form.Item>
                                        <Form.Item {...tailLayout}>


                                            <Button type="link" htmlType="button" onClick={onFill}>
                                                Fill form
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Modal>
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