import Dashboard from "../../components/Dashboard";
import Link from 'next/link'
import { Breadcrumb, Button, Col, DatePicker, Form, Input, Layout, Row, Select, Steps } from "antd";
import { useState } from "react";
import TextArea from "antd/lib/input/TextArea";

const AddCoursePage = () => {
    const { Header, Footer, Sider, Content } = Layout;
    const { Step } = Steps;
    const [form] = Form.useForm();
    const { Option } = Select;

    const [stepCurrent, setStepCurrent] = useState(0);

    const stepStatus = (stepIndex: number) => {
        if (stepIndex < stepCurrent) {
            return "finish"
        } else if (stepIndex === stepCurrent) {
            return "process"
        } else {
            return "wait"
        }

    }

    const returnAddCourseComponents = () => {
        if (stepCurrent === 0) {
            return (<>
                <Form

                    layout="vertical"
                    form={form}

                >
                    <Row style={{ paddingTop: "20px" }}>
                        <Col flex={2} style={{ paddingRight: "20px" }}>
                            <Form.Item label="Course Name" name="name" required>
                                <Input placeholder="course name" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 5 }} style={{ paddingRight: "20px" }}>
                            <Form.Item label="Teacher" name="teacher" required>
                                <Input placeholder="course name" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 5 }} style={{ paddingRight: "20px" }}>
                            <Form.Item label="Type" name="type" required>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 5 }}>
                            <Form.Item label="Course Code" name="code" required>
                                <Input />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row>
                        <Col flex={2} style={{ paddingRight: "20px" }}>
                            <Form.Item label="Start Date" name="startDate">
                                <DatePicker style={{ width: '50%' }} />
                            </Form.Item>

                            <Form.Item label="Price" name="price" required>
                                <Input prefix="$" style={{ width: '50%' }} />
                            </Form.Item>
                            <Form.Item label="Student Limit" name="studentLimit" required>
                                <Input style={{ width: '50%' }} />
                            </Form.Item>
                            <Form.Item label="Duration" name="duration" required>
                                <Input.Group compact>
                                    <Input style={{ width: '50%' }} />
                                    <Select defaultValue="Zhejiang">
                                        <Option value="Zhejiang">Zhejiang</Option>
                                        <Option value="Jiangsu">Jiangsu</Option>
                                    </Select>

                                </Input.Group>
                            </Form.Item>
                        </Col>
                        <Col flex={2} style={{ paddingRight: "20px" }}>
                            <Form.Item label="Student Limit" name="studentLimit" required>
                                <TextArea
                                    placeholder="Controlled autosize"
                                    style={{ height: "300px" }}
                                />
                            </Form.Item>

                        </Col>
                        <Col flex={2}>
                            <Form.Item label="Cover" name="cover" required>
                                <TextArea

                                    placeholder="Controlled autosize"
                                    style={{ height: "300px" }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
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