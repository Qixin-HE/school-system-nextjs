import Dashboard from "../../components/Dashboard";
import {
    Space, Breadcrumb, Table, TablePaginationConfig, Modal,
    Form, Select, Input, Button, message, Popconfirm
} from 'antd';
import { StudentListRecord } from "../../lib/model/student";
import { useEffect, useState } from 'react';
import { getStudentListService, postAddStudentService, postDeleteStudentService, putEditStudentService } from '../../lib/api/studentService';
import Link from 'next/link'

// interface ColomnFilter {
//     text: string,
//     value: string
// }

const StudentListPage = () => {

    const [data, setData] = useState<StudentListRecord[]>([]);
    //var total:number;
    const [total, setTotal] = useState<number>();
    const [page, setPage] = useState<number>();
    const [limit, setLimit] = useState<number>();
    const [shouldUpdate, setShouldUpdate] = useState<number>(0);

    useEffect(() => {
        const rows = getStudentListService(page, limit);
        rows.then(function (result) {
            setData(result.data);
            setTotal(result.total);
            //console.log("total is" + total)
            //console.log(data);
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
    const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);
    const [isEditStudentModalVisible, setIsEditStudentModalVisible] = useState(false);

    const showAddStudentModal = () => {
        setIsAddStudentModalVisible(true);
    };
    const showEditStudentModal = (key: string) => {
        setRowKey(key)
        setIsEditStudentModalVisible(true);

    };
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [area, setArea] = useState<string>();
    const [studentType, setStudentType] = useState<string>();

    const handleOk = () => {
        //setIsModalVisible(false);
        console.log("first");
        console.log(name, email, area, studentType);
        name == undefined ? setName(formAdd.getFieldValue("name")) : null;
        email == undefined ? setEmail(formAdd.getFieldValue("email")) : null;
        area == undefined ? setArea(formAdd.getFieldValue("area")) : null;
        studentType == undefined ? setStudentType(formAdd.getFieldValue("studenttype")) : null;
        console.log("second");
        console.log(name, email, area, studentType);
        if (name != undefined && email != undefined && area != undefined && studentType != undefined) {
            const postResult = postAddStudentService(
                {
                    name: name,
                    email: email,
                    country: area,
                    type: studentType == "tester" ? 1 : 2,
                }).then(function (response) {

                    if (response.status == true) {
                        message.success(`Student ${name} with id ${response.id} has been added successfully!`);
                        setShouldUpdate(shouldUpdate + 1);
                    } else {
                        message.error('Something went wrong. Try again~');
                    }

                });

        } else {
            message.error('Something went wrong. Try again!');
            console.log("here comes else" +
                JSON.stringify({
                    name: name,
                    email: email,
                    country: area,
                    type: studentType,
                }))
        }



        setIsAddStudentModalVisible(false);

    };


    const handleCancel = () => {
        setIsAddStudentModalVisible(false);
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
    const [formAdd] = Form.useForm();
    const [formEdit] = Form.useForm();

    const onAreaChange = (value: string) => {
        setArea(value);
    };
    const onStudentTypeChange = (value: string) => {
        setStudentType(value);
    };


    // for testing easier
    const onFill = () => {
        formAdd.setFieldsValue({
            name: 'zoe',
            email: 'zoe@test.com',
            area: 'china',
            studenttype: 'tester'
        });
    };

    // for delete a student
    const deleteAStudent = (id: string) => {
        postDeleteStudentService(id).then(function (response) {

            if (response == true) {
                message.success(`The student has been deleted successfully!`);
                setShouldUpdate(shouldUpdate - 1);
            } else {
                message.error('Something went wrong. Try again~');
            }

        });
    }


    const handleUpdate = () => {

        const formStudentValues = formEdit.getFieldsValue();

        const editedStudent = {
            "id": parseInt(rowKey),
            "email": formStudentValues.email,
            "name": formStudentValues.name,
            "country": formStudentValues.area,
            "type": formStudentValues.studenttype == "tester" ? 1 : 2,
        }

        putEditStudentService(editedStudent)

    }

    const [rowKey, setRowKey] = useState<string>("");

    const onEditStudentModalClose = () => {

        setIsEditStudentModalVisible(false)
    }
    useEffect(() => {
        const student = data.filter(student => student.id.toString() == rowKey)[0];
        if (student != undefined) {
            formEdit.setFieldsValue({
                name: student.name,
                email: student.email,
                area: student.area,
                studenttype: student.studentType
            });
        }
    }, [rowKey]);

const createAreaFilter = () => {
    const areas = new Set(data.map(student => student.area));
    let filter:any[] = []
    areas.forEach(area => {
        const filterObject = {
            text: area,
            value: area.toLowerCase()
        }
        filter.push(filterObject)
    })
    return filter;
}

//for search bar
const { Search } = Input;
const onSearch = (query:string) => {
    getStudentListService(page, limit, query).then(function (result) {
        setData(result.data);
        setTotal(result.total);
    });
}

    return (
        <>
            <Dashboard>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
                    <Breadcrumb.Item>Student</Breadcrumb.Item>
                    <Breadcrumb.Item>Student List</Breadcrumb.Item>
                </Breadcrumb>
                <Button key="add" type="primary" onClick={showAddStudentModal} style={{ marginBottom: "10px" }}>
                    Add
                </Button>
                <Search placeholder="enter a student name" onSearch={(value:string) => onSearch(value)} style={{ width: 500, position:"absolute",right:"2%" }} />
                
                <Table dataSource={data} pagination={pagination} onChange={handleTableChange} >
                    <Column title="No." dataIndex="id" key="id" sorter={(a : StudentListRecord, b:StudentListRecord ) => a.id - b.id } sortDirections= {['descend']}
    />
                    <Column title="Name" dataIndex="name" key="name" sorter={(a : StudentListRecord, b:StudentListRecord ) => a.name.length - b.name.length } sortDirections= {['descend']}
                    render={(text, record: StudentListRecord) =>(
                        <Link href="/student/[id]" as={`/student/${record.key}`}>
                    <a>{record.name}</a>
                    </Link>
                    )}/>
                    <Column title="Area" dataIndex="area" key="area" filters={createAreaFilter()} onFilter={(value, record : StudentListRecord) => record.area.toLowerCase() === value}/>
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Selected Curriculum" dataIndex="selectedCurriculum" key="selectedCurriculum" />
                    <Column title="Student Type" dataIndex="studentType" key="studentType" />
                    <Column title="Join Time" dataIndex="joinTime" key="joinTime" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record: { key: React.Key }) => (
                            <Space size="middle">
                                <a onClick={() => showEditStudentModal(record.key.toString())}>Edit</a>
                                

                                {data.length >= 1 ? (
                                    <Popconfirm title="Sure to delete?" onConfirm={() => { deleteAStudent(record.key.toString()) }}>
                                        <a>Delete</a>
                                    </Popconfirm>
                                ) : null}

                            </Space>
                        )}
                    />
                </Table>
            </Dashboard>
            {/* The Add Student Modal */}
            <Modal key="addStudent" title="Add Student" mask={false} visible={isAddStudentModalVisible} onOk={handleOk}
                    onCancel={handleCancel} footer={[
                        <Button key="add" type="primary" onClick={handleUpdate}>
                            Add
                        </Button>,
                        <Button key="cancel" onClick={handleCancel}>
                            Cancel
                        </Button>,

                    ]}>
                    <Form {...layout} form={formAdd} name="control-hooks">
                        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                            <Input onChange={e => {
                                formAdd.setFieldsValue({ name: e.target.value });
                                setName(e.target.value)
                            }} />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
                            <Input onChange={e => {
                                formAdd.setFieldsValue({ email: e.target.value })
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
                {/* 第二个modal */}
                <Modal title="Edit Student" mask={false} destroyOnClose
                                    visible={isEditStudentModalVisible}
                                    onCancel={onEditStudentModalClose} footer={[
                                        <Button key="update" type="primary" onClick={handleUpdate}>
                                            Update
                                        </Button>,
                                        <Button key="cancel" onClick={() => { setIsEditStudentModalVisible(false) }}>
                                            Cancel
                                        </Button>,

                                    ]}>
                                    <Form {...layout} form={formEdit} name="control-hooks" preserve={false}
                                    >
                                        {/* {() => <div> */}
                                        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                                            <Input onChange={e => {
                                                formEdit.setFieldsValue({ name: e.target.value });
                                                setName(e.target.value)
                                            }} />
                                        </Form.Item>
                                        <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
                                            <Input onChange={e => {
                                                formEdit.setFieldsValue({ email: e.target.value })
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
                                                {data.filter(student => student.id.toString() == rowKey)[0] != undefined &&
                                                    data.filter(student => student.id.toString() == rowKey)[0].area !== "china" || "zimbabwe" || "lebanon" ? (
                                                    <Option key="initialselectvalue" value={data.filter(student => student.id.toString() == rowKey)[0] != undefined ? data.filter(student => student.id.toString() == rowKey)[0].area : "null"}>
                                                        {data.filter(student => student.id.toString() == rowKey)[0] != undefined ? data.filter(student => student.id.toString() == rowKey)[0].area : "null"}
                                                    </Option>
                                                ) : null
                                                }

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
                                        {/* </div>} */}


                                    </Form>
                                </Modal>

        </>
    )
}

export default StudentListPage;

