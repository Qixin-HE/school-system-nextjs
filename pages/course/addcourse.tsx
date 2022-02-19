import Dashboard from "../../components/Dashboard";
import Link from 'next/link'
import { Breadcrumb, Button, Col, DatePicker, Divider, Form, Input, InputNumber, Layout, message, Row, Select, Space, Steps, Upload } from "antd";
import { useEffect, useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { getTeacherListService } from "../../lib/api/teacherService";
import { getCourseTypes, postCourseService } from "../../lib/api/courseService";
import { CourseType } from "../../lib/model/course";
import { checkPrimeSync } from "crypto";
import moment from "moment";

import { InboxOutlined } from '@ant-design/icons';

const AddCoursePage = () => {
    const { Header, Footer, Sider, Content } = Layout;
    const { Step } = Steps;
    const [form] = Form.useForm();
    const { Option } = Select;

    const [stepCurrent, setStepCurrent] = useState(0);
    const [teachers, setTeachers] = useState<{ id: number, name: string }[]>();
    const [queryParams, setQueryParams] = useState({
        page: 1,
        limit: 10
    })
    const [totalPage, setTotalPage] = useState(0);
    const [courseType, setCourseType] = useState<CourseType[]>()
    const [courseCode, setCourseCode] = useState<string>();




    useEffect(() => {
        getTeacherListService(queryParams.page, queryParams.limit).then((result) => {
            let teacherRecordShortList: { id: number, name: string }[] = [];
            result.data.forEach((teacher: { id: number, name: string }) => {
                const techerRecordShort = {
                    id: teacher.id,
                    name: teacher.name
                }
                teacherRecordShortList.push(techerRecordShort)
            })
            setTeachers(teacherRecordShortList);
            setTotalPage(Math.round(result.total / 10))
            getCourseTypes().then((result) => {
                setCourseType(result)

            }
            )
            setCourseCode(uuidv4());
            form.setFieldsValue({uid: courseCode})


        })

    }, [queryParams]);
    

    const stepStatus = (stepIndex: number) => {
        if (stepIndex < stepCurrent) {
            return "finish"
        } else if (stepIndex === stepCurrent) {
            return "process"
        } else {
            return "wait"
        }

    }

    const onCourseDetailSubmit = () => {
        const formCourseObject = form.getFieldsValue();
        const sendCourseObject = {
            name:  formCourseObject.name,
            uid: formCourseObject.uid,
            detail: formCourseObject.detail,
            startTime: formCourseObject.startTime.format('YYYY-MM-DD HH:mm:ss'),
            price: formCourseObject.price,
            maxStudents: formCourseObject.maxStudents,
            duration: formCourseObject.duration,
            durationUnit: formCourseObject.duration,
            cover: "no cover for now  - zoe",
            teacherId: formCourseObject.teacher,
            type: formCourseObject.type
        }
        postCourseService(sendCourseObject).then((response) => {
            if (response.status === true) {
                message.success(`Course: ${response.name} with id ${response.id} has been added successfully!`);
                
            } else {
                message.error('Something went wrong. Try again~');
            }
        })
        
    }


    const { Dragger } = Upload;

    const returnAddCourseComponents = () => {
        if (stepCurrent === 0) {
            return (<>
                <Form
                    onFinish={onCourseDetailSubmit}
                    layout="vertical"
                    form={form}

                >
                    <Row style={{ paddingTop: "20px" }}>
                        <Col flex={2} style={{ paddingRight: "20px" }}>
                            <Form.Item label="Course Name" name="name" required>
                                <Input placeholder="course name" onChange={e => {
                                    form.setFieldsValue({ name: e.target.value });
                                    
                                }} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 5 }} style={{ paddingRight: "20px" }}>
                            <Form.Item label="Teacher" name="teacher" required>
                                <Select placeholder="Select teacher" onChange={value => {
                                    form.setFieldsValue({ teacher: value });
                                    
                                }}
                                    dropdownRender={menu => (
                                        <div>
                                            <div style={{ textAlign: "center" }}>
                                                {queryParams.page !== 1 ? <a onClick={() => {
                                                    const pageNumber = queryParams.page - 1;
                                                    setQueryParams({
                                                        ...queryParams,
                                                        page: pageNumber
                                                    })
                                                }}>Load last ten teachers</a> : null}
                                            </div>
                                            <Divider style={{ margin: '4px 0' }} />
                                            {menu}
                                            <Divider style={{ margin: '4px 0' }} />
                                            <div style={{ textAlign: "center" }}>
                                                {queryParams.page < totalPage ? <a onClick={() => {
                                                    const pageNumber = queryParams.page + 1;
                                                    setQueryParams({
                                                        ...queryParams,
                                                        page: pageNumber
                                                    })
                                                }}
                                                    style={{}}>Load next ten teachers</a> : null}
                                            </div>

                                        </div>
                                    )}>
                                    {teachers?.map((teacher, key) => <Option key={key} value={teacher.id}>{teacher.name}</Option>)}


                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 5 }} style={{ paddingRight: "20px" }}>
                            <Form.Item label="Type" name="type" required>
                                <Select placeholder="Select Type" onChange={value => form.setFieldsValue({ type: value })}>
                                    {courseType?.map((type, key) => <Option key={key} value={type.id}>{type.name}</Option>

                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 5 }}>
                            <Form.Item label="Course Code" name="code" required>
                                <Input value={courseCode} placeholder={courseCode} disabled/>
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row>
                        <Col flex={2} style={{ paddingRight: "20px", width: "25%" }}>
                            <Form.Item label="Start Date" name="startTime">
                                <DatePicker style={{ width: '90%' }} />
                            </Form.Item>

                            <Form.Item label="Price" name="price" required>
                                <InputNumber prefix="$" style={{ width: '90%' }} />
                            </Form.Item>
                            <Form.Item label="Student Limit" name="maxStudents" required>
                                <InputNumber style={{ width: '90%' }} />
                            </Form.Item>
                            <Form.Item label="Duration" name="duration" required>
                                <Input.Group compact>
                                    <InputNumber style={{ width: '75%' }} onChange={value => form.setFieldsValue({ duration: value })}/>
                                    <Select defaultValue="month">
                                        <Option value="month">Month</Option>
                                        <Option value="day">Day</Option>
                                        <Option value="year">Year</Option>
                                    </Select>

                                </Input.Group>
                            </Form.Item>
                        </Col>
                        <Col flex={2} style={{ paddingRight: "20px", width: "25%" }}>
                            <Form.Item label="Description" name="detail" required>
                                <TextArea
                                    placeholder="Course description"
                                    style={{ height: "300px" }}
                                />
                            </Form.Item>



                        </Col>
                        <Col flex={2}>
                            <Form.Item label="Cover" name="uid">
                                <Dragger style={{ height: "18.8rem" }}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>

                                </Dragger>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>

            </>

            )
        } else if (stepCurrent === 1) {
            return (
                <>
                    <p>{() => form.getFieldsValue()}</p>
                    <Form

                        layout="vertical"
                        form={form}

                    >
                        <Row style={{ paddingTop: "20px", paddingLeft: "20px" }}>
                            <Col flex={2} style={{}}>

                                <h2>Chapters</h2>

                                <Form.List name="chapters">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                    <Row>
                                                        <Col>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'chapterName']}
                                                                rules={[{ required: true, message: 'Missing chapter name' }]}
                                                            // style={{paddingRight:"5%"}}
                                                            >
                                                                <Input placeholder="Chapter Name" style={{ width: "120%" }} />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col style={{ right: "-15%" }}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'chapterDescription']}
                                                                rules={[{ required: true, message: 'Missing chapter description' }]}
                                                            >
                                                                <Input placeholder="Chapter Description" style={{ width: "230%" }} />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col style={{ right: "-80%", paddingTop: "1%" }}>
                                                            <MinusCircleOutlined onClick={() => remove(name)} style={{}} />
                                                        </Col>
                                                    </Row>



                                                </Space>
                                            ))}


                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ width: "80%" }}>
                                                    Add Chapter
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Col>


                            <Col flex={2} style={{ paddingRight: "20px" }}>

                                <h2>Class Times</h2>
                                <Form.List name="classTimes">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(field => (
                                                <Row key={field.key}>
                                                    <Space key={field.key} align="baseline">
                                                        <Form.Item
                                                            noStyle
                                                            shouldUpdate={(prevValues, curValues) =>
                                                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                                            }
                                                        >
                                                            {() => (

                                                                <Col>
                                                                    <Form.Item
                                                                        {...field}

                                                                        name={[field.name, 'day']}
                                                                        rules={[{ required: true, message: 'Missing class day' }]}
                                                                        style={{ width: "200px" }}
                                                                    >
                                                                        <Select options={
                                                                            [
                                                                                { label: 'Monday', value: 'Monday' },
                                                                                { label: 'Tuesday', value: 'Tuesday' },
                                                                                { label: 'Wednesday', value: 'Wednesday' },
                                                                                { label: 'Thursday', value: 'Thursday' },
                                                                                { label: 'Friday', value: 'Friday' },
                                                                                { label: 'Saturday', value: 'Saturday' },
                                                                                { label: 'Sunday', value: 'Sunday' },
                                                                            ]
                                                                        } onChange={() => form.setFieldsValue({ ClassTimes: [] })}
                                                                        />
                                                                    </Form.Item>
                                                                </Col>


                                                            )}
                                                        </Form.Item>
                                                        <Col>
                                                            <Form.Item
                                                                {...field}

                                                                name={[field.name, 'time']}
                                                                rules={[{ required: true, message: 'Missing class time of the day' }]}
                                                            >
                                                                <Input style={{ width: "250%" }} />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col style={{ right: "-270px" }}>
                                                            <MinusCircleOutlined onClick={() => remove(field.name)} style={{}} />
                                                        </Col>
                                                    </Space>
                                                </Row>
                                            ))}

                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                    Add Class Time
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>

                            </Col>

                        </Row>
                        <Row style={{ paddingTop: "20px", paddingLeft: "20px" }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Row>
                    </Form>
                </>
            )
        }
    }

    return (
        <>
            <Dashboard>
                <Layout>

                    <Content style={{ height: "100vh" }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
                            <Breadcrumb.Item><Link href="/course/allcourse">Course</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link href="/course/addcourse">Add Course</Link></Breadcrumb.Item>

                        </Breadcrumb>

                        <div className="space-align-block" style={{ backgroundColor: "white", padding: "25px", paddingLeft: "35px", paddingRight: "35px" }}>
                            <Steps
                                type="navigation"
                                current={stepCurrent}
                                onChange={current => setStepCurrent(current)}
                                className="site-navigation-steps"
                            >
                                <Step status={stepStatus(0)} title="Course Detail" />
                                <Step status={stepStatus(1)} title="Course Schedule" />
                                <Step status={stepStatus(2)} title="Success" />

                            </Steps>

                            {returnAddCourseComponents()}
                        </div>

                    </Content>

                </Layout>

            </Dashboard>
        </>
    )
}

export default AddCoursePage;