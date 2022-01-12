import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {
    Tag, Breadcrumb, Table, TablePaginationConfig, Modal,
    Form, Card, Tabs, Layout,
    Row, Col, Avatar, Image, Button, Divider, Typography, Descriptions
} from 'antd';
import Link from 'next/link';
import { getACourseByIdService } from '../../lib/api/courseService';
import { CourseDetail } from '../../lib/model/course';
import { HeartFilled, UserOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';


const CourseDetailPage = () => {
    const router = useRouter()

    const { id } = router.query

    const [data, setData] = useState<CourseDetail>();
    //const [courseTabelData, setCourseTabelData] = useState<CourseStudentDetail[]>();


    useEffect(() => {
        if (id !== undefined) {
            getACourseByIdService(id.toString()).then(function (result) {
                setData(result);

                console.log(result);


            });
        }

    }, [router]);




    const { Header, Footer, Sider, Content } = Layout;

    if (data == undefined) {
        return (<p>loading</p>)
    }

    const { Text, Link } = Typography;
    const gridStyle = {
        width: '25%',
        textAlign: 'center',
    };

    return (


        <>

            <Layout>

                <Content style={{ height: "100vh", marginLeft: "20px" }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
                        <Breadcrumb.Item><Link href="/course/allcourse">Course</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link href="/course/allcourse">All Course</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>Detail</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="space-align-block" style={{ backgroundColor: "white" }}>
                        <Row wrap={false}>
                            <Col flex="600px" style={{ padding: "20px" }}>
                                <Card cover={<img alt="courseimg" src={`/profile.jpg`} />}>
                                    <div style={{ padding: "20px" }}>
                                    <Row>
                                        <Col >
                                            <Title level={5}>{data.name}</Title>

                                        </Col>

                                    </Row>
                                    <div style={{ paddingLeft: "5px",paddingRight: "5px" }}>
                                    <Row style={{ paddingTop: "10px" }}>
                                        <Col>
                                            {data.startTime}
                                        </Col>
                                        <Col style={{ marginLeft: "auto" }}>
                                            <HeartFilled style={{ color: "crimson" }} /> {data.star}

                                        </Col>
                                    </Row>
                                    <Divider style={{ margin: "7px 0" }} />

                                    <Row >
                                        <Col>
                                            <p>Duration:</p>
                                        </Col>
                                        <Col style={{ marginLeft: "auto" }}>
                                            <strong>{data.duration} years</strong>

                                        </Col>
                                    </Row>
                                    <Divider style={{ margin: "7px 0" }} />

                                    <Row >
                                        <Col>
                                            <p>Teacher:</p>
                                        </Col>
                                        <Col style={{ marginLeft: "auto" }}>
                                            <strong style={{ color: "dodgerblue" }}>{data.teacherName}</strong>

                                        </Col>
                                    </Row>
                                    <Divider style={{ margin: "7px 0" }} />
                                    <Row >
                                        <Col>
                                            <p><UserOutlined style={{ color: "dodgerblue" }} /> Student Limit:</p>
                                        </Col>
                                        <Col style={{ marginLeft: "auto" }}>
                                            <strong>{data.maxStudents}</strong>

                                        </Col>
                                        
                                    </Row>
                                    </div>
                                    </div>
                                        {/* <Col className="gutter-row" span={6} >
                                    <Title level={3} style={{ color: "mediumslateblue" }}>{data.sales.price}</Title>
                                    <p>Price</p>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                    <Title level={3} style={{ color: "mediumslateblue" }}>{data.sales.batches}</Title>
                                    <p>Batches</p>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                    <Title level={3} style={{ color: "mediumslateblue" }}>{data.sales.studentAmount}</Title>
                                    <p>Students</p>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                    <Title level={3} style={{ color: "mediumslateblue" }}>{data.sales.earnings}</Title>
                                    <p>Earings</p>
                                    </Col> */}
                                        <Card.Grid style={{
                                            width: '25%',
                                            textAlign: 'center',
                                        }}>Content</Card.Grid>
                                        <Card.Grid style={{
                                            width: '25%',
                                            textAlign: 'center',
                                        }}>Content</Card.Grid>
                                        <Card.Grid style={{
                                            width: '25%',
                                            textAlign: 'center',
                                        }}>Content</Card.Grid>
                                        <Card.Grid style={{
                                            width: '25%',
                                            textAlign: 'center',
                                        }}>Content</Card.Grid>

                                   
                                </Card>

                            </Col>

                            <Col flex="auto" style={{ padding: "20px" }}>
                                <div style={{ padding: "20px", border: "1px solid #f0f0f0" }}>



                                    <Row><Col><h1 style={{ color: "blueviolet" }}><br />Course Detail</h1><br /></Col></Row>

                                    <Row gutter={[16, 24]}>
                                        <Col className="gutter-row" span={4}>
                                            <strong>Educations:</strong>
                                            <br /><br />
                                            <strong>Area:</strong>
                                            <br /><br />
                                            <strong>Gender:</strong>
                                            <br /><br />
                                            <strong>Member Period:</strong>
                                            <br /><br />
                                            <strong>Type:</strong><br /><br />
                                            <strong>Create Time:</strong><br /><br />
                                            <strong>Update Time:</strong><br /><br />

                                        </Col>

                                    </Row>
                                    <Row><Col>

                                    </Col>
                                    </Row>
                                    <Row><Col>

                                    </Col>
                                    </Row>





                                </div>
                            </Col>
                        </Row>
                    </div>

                </Content>

            </Layout>


        </>
    )
}

export default CourseDetailPage;
