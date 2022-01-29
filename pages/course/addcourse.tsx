import Dashboard from "../../components/Dashboard";
import Link from 'next/link'
import { Breadcrumb, Button, Col, DatePicker, Form, Input, Layout, Row, Select, Space, Steps } from "antd";
import { useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Title from "antd/lib/typography/Title";

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
    const chapters = {
        Beijing: ['Tiananmen', 'Great Wall'],
        Shanghai: ['Oriental Pearl', 'The Bund'],
    };

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
        } else if (stepCurrent === 1) {
            return (
                <>
                    <Form

                        layout="vertical"
                        form={form}

                    >
                        <Row style={{ paddingTop: "20px", paddingLeft:"20px"}}>
                            <Col flex={2} style={{  }}>

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
                                                        <Input placeholder="Chapter Name" style={{width:"120%"}} />
                                                    </Form.Item>
                                                        </Col>
                                                        <Col style={{right: "-15%"}}>
                                                        <Form.Item
                                                        {...restField}
                                                        name={[name, 'chapterDescription']}
                                                        rules={[{ required: true, message: 'Missing chapter description' }]}
                                                    >
                                                        <Input placeholder="Chapter Description" style={{width:"230%"}}/>
                                                    </Form.Item>
                                                        </Col>
                                                        <Col style={{right: "-80%", paddingTop: "1%"}}>
                                                        <MinusCircleOutlined onClick={() => remove(name)} style={{}}/>
                                                        </Col>
                                                    </Row>
                                                    
                                                    
                                                    
                                                </Space>
                                            ))}


                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{width:"80%"}}>
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
                                                <Row>
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
                                                                style={{width:"200px"}}
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
                                                        <Input style={{width: "250%"}}/>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col style={{right: "-270px"}}>
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
                        <Row style={{ paddingTop: "20px", paddingLeft:"20px"}}>
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