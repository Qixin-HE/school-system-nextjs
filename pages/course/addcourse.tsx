import Dashboard from "../../components/Dashboard";
import Link from 'next/link'
import { Breadcrumb, Button, Col, Form, Input, Layout, Row, Steps } from "antd";
import { useState } from "react";

const AddCoursePage = () => {
    const { Header, Footer, Sider, Content } = Layout;
    const { Step } = Steps;
    const [form] = Form.useForm();

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
                    <Row style={{paddingTop: "20px"}}>
                        <Col xs={{ span: 5 }}>
                            <Form.Item label="Course Name" name="name" required>
                            <Input placeholder="course name" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 5, offset: 1 }}>
                            <Form.Item label="Teacher" name="teacher" required>
                            <Input placeholder="course name" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 5, offset: 1 }}>
                            <Form.Item label="Type" name="type" required>
                            <Input  />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 5, offset: 1 }}>
                            <Form.Item label="Course Code" name="code" required>
                            <Input  />
                            </Form.Item>
                        </Col>

                    </Row>


                    <Form.Item label="teacher">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item label="type">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">Submit</Button>
                    </Form.Item>
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

                        <div className="space-align-block" style={{ backgroundColor: "white", padding: "25px", paddingLeft: "35px"}}>
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