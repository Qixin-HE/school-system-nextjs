import Dashboard from "../components/Dashboard";
import Link from 'next/link';
import { getService } from "../lib/api/baseService";
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import {
    Space, Breadcrumb, Table, TablePaginationConfig, Modal, Button,
    Form, Input, Select, Popconfirm, message
} from 'antd';
import { ResponsePaginator } from '../lib/model/response';
import { TeacherResponse, Teacher, TeacherListRecord } from '../lib/model/teacher';
import { getTeacherListService, postDeleteTeacherService, postAddTeacherService,
    putEditTeacherService } from "../lib/api/teacherService";



const TeacherListPage = () => {
    const [data, setData] = useState<TeacherListRecord[]>();
    //var total:number;
    const [total, setTotal] = useState<number>();
    const [page, setPage] = useState<number>();
    const [limit, setLimit] = useState<number>();
    const { Option } = Select;
    const [form] = Form.useForm();
    const [updateTrigger, setUpdateTrigger] = useState<number>(0);

    useEffect(() => {
        const rows = getTeacherListService(page, limit);
        rows.then(function (result) {
            setData(result.data);
            setTotal(result.total);
            //console.log("total is" + total)
            console.log("here")
            
        });
        console.log(data);
        console.log(pagination);

    }, [page, limit, updateTrigger]);



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
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onModalClose = () => {

        setIsModalVisible(false)
    }
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [area, setArea] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [modalTitle, setModalTitle] = useState<string>();
    const [modaleButtonName, setModaleButtonName] = useState<string>();


    const [rowKey, setRowKey] = useState<string>("");
    const showEditTeacherModal = (key: string) => {
        setRowKey(key)
        setIsModalVisible(true);
    };

    // for deleting a teacher

    const deleteATeacher = (id: string) => {
        postDeleteTeacherService(id).then(function (response) {

            if (response == true) {
                message.success(`The student has been deleted successfully!`);
                setUpdateTrigger(updateTrigger - 1);
            } else {
                message.error('Something went wrong. Try again~');
            }

        });
    }

    // to update field in the "Edit Teacher " Modal
    useEffect(() => {
        //console.log(modaleButtonName)
        if (modalTitle == "Edit Teacher" && data !== undefined)
        {
            console.log("it is trigger!")
            const teacher = data.filter(teacher => teacher.id.toString() == rowKey)[0];
            if (teacher != undefined) {
                form.setFieldsValue({
                    name: teacher.name,
                    email: teacher.email,
                    area: teacher.country,
                    phone: teacher.phone
                });
            }
        }
        
    }, [isModalVisible]);

    const modaleButtonOnClick = () => {
        
        if (modalTitle == "Add Teacher"){
            console.log("add teacher");
            console.log(name, email, area, phone);
            name == undefined ? setName(form.getFieldValue("name")) : null;
            email == undefined ? setEmail(form.getFieldValue("email")) : null;
            area == undefined ? setArea(form.getFieldValue("area")) : null;
            phone == undefined ? setPhone(form.getFieldValue("phone")) : null;
            console.log("second");
            console.log(name, email, area, phone);
            if (name != undefined && email != undefined && area != undefined && phone != undefined) {
                const postResult = postAddTeacherService(
                    {
                        name: name,
                        email: email,
                        country: area,
                        phone: phone,
                        skills: []
                    }).then(function (response) {
    
                        if (response.status == true) {
                            message.success(`Student ${name} with id ${response.id} has been added successfully!`);
                            setUpdateTrigger(updateTrigger + 1);
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
                        phone: phone
                    }))
            }
        }
        if (modalTitle == "Edit Teacher"){
            const formTeacherValues = form.getFieldsValue();

            const editedTeacher = {
                "id": parseInt(rowKey),
                "email": formTeacherValues.email,
                "name": formTeacherValues.name,
                "country": formTeacherValues.area,
                "phone": formTeacherValues.phone,
                "skills": []
            }
    
            putEditTeacherService(editedTeacher);
            setUpdateTrigger(updateTrigger + 1);

        }



        setIsModalVisible(false);

    };
    //for search bar
const { Search } = Input;
    const onSearch = (query:string) => {
        getTeacherListService(page, limit, query).then(function (result) {
            setData(result.data);
            setTotal(result.total);
        });
    }

    if (data == undefined) {
        return (<p>loading</p>)
    }

    return (
        <>
            <Dashboard>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
                    <Breadcrumb.Item>Teacher</Breadcrumb.Item>
                    <Breadcrumb.Item>Teacher List</Breadcrumb.Item>
                </Breadcrumb>
                <Button key="add" type="primary" onClick={() => {
                    setModalTitle("Add Teacher");
                    setModaleButtonName("Add Teacher")
        setIsModalVisible(true);
    }} style={{ marginBottom: "10px" }}>
                    Add
                </Button>
                <Search placeholder="enter a teacher name" onSearch={(value:string) => onSearch(value)} style={{ width: 500, position:"absolute",right:"2%" }} />
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
                        render={(text, record: { key: React.Key }) => (
                            <Space size="middle">
                                <a onClick={() => {
                                    setModalTitle("Edit Teacher")
                                    showEditTeacherModal(record.key.toString())
                                    setModaleButtonName("Edit Teacher")
                                    }}>Edit</a>


                                {data.length >= 1 ? (
                                    <Popconfirm title="Sure to delete?" onConfirm={() => { deleteATeacher(record.key.toString()) }}>
                                        <a>Delete</a>
                                    </Popconfirm>
                                ) : null}

                            </Space>
                        )}
                    />
                </Table>
            </Dashboard>
            <Modal title={modalTitle} mask={false} destroyOnClose
                visible={isModalVisible}
                onCancel={onModalClose} footer={[
                    <Button key="update" type="primary" onClick={modaleButtonOnClick}>
                        {modaleButtonName}
                    </Button>,
                    <Button key="cancel" onClick={() => { setIsModalVisible(false) }}>
                        Cancel
                    </Button>,

                ]}>
                <Form {...layout} form={form} name="control-hooks" preserve={false}>
                    
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
                    <Form.Item name="area" label="Country" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select an option"
                            onChange={(value: string) => setArea(value)}
                            allowClear

                        >
                            <Option value="china">China</Option>
                            <Option value="zimbabwe">Zimbabwe</Option>
                            <Option value="lebanon">Lebanon</Option>
                            <Option value="other">Other</Option>
                            {(data.filter(teacher => teacher.id.toString() == rowKey)[0] != undefined) &&
                                (data.filter(teacher => teacher.id.toString() == rowKey)[0].country !== "china" || "zimbabwe" || "lebanon" )
                                && (modalTitle !== "Add Teacher") ? (
                                    <Option key="initialselectvalue" value={data.filter(student => student.id.toString() == rowKey)[0] != undefined ? data.filter(student => student.id.toString() == rowKey)[0].country : "null"}>
                                        {data.filter(student => student.id.toString() == rowKey)[0] != undefined ? data.filter(student => student.id.toString() == rowKey)[0].country : "null"}
                                    </Option>
                                ) : undefined
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
                    <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                        <Input onChange={e => {
                            form.setFieldsValue({ phone: e.target.value })
                            setPhone(e.target.value)
                        }} />
                    </Form.Item>



                </Form>
            </Modal>
        </>
    )
}

export default TeacherListPage;