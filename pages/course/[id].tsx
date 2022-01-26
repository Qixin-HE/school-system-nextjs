import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {
    Tag, Breadcrumb, Table, TablePaginationConfig, Modal,
    Form, Card, Tabs, Layout,
    Row, Col, Avatar, Image, Button, Divider, Typography, Steps, Badge, Descriptions, Collapse
} from 'antd';
import Link from 'next/link';
import { getACourseByIdService } from '../../lib/api/courseService';
import { Chapter, CourseDetail } from '../../lib/model/course';
import { HeartFilled, UserOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { CheckCircleOutlined } from '@ant-design/icons';

interface Status {
    statusStr: string
    currentIndex: number
}

const CourseDetailPage = () => {
    const router = useRouter()

    const { id } = router.query

    const [data, setData] = useState<CourseDetail>();
    const [status, setStatus] = useState<Status>({
        statusStr: "",
        currentIndex: 999,
    })


    useEffect(() => {
        if (id !== undefined) {
            getACourseByIdService(id.toString()).then(function (result) {
                setData(result);
                console.log(result);
                let status;
                if (result.status === 0) {
                    
                    status = "warning";
                } else if (result.status === 1) {
                    status = "success";
                    
                } else {
                    status = "default";
                    
                }
                const currentChapter = result.schedule.chapters.find((chapter : Chapter) => chapter.id == result.schedule.current)
                if (currentChapter !== undefined) {
    
                    setStatus({ 
                        statusStr: status, 
                        currentIndex: result.schedule.chapters.indexOf(currentChapter) })
                }
                //console.log(status)

            });
        }

    }, [router]); //it was "router" as the trigger before





    const { Header, Footer, Sider, Content } = Layout;

    if (data == undefined) {
        return (<p>loading</p>)
    }

    const { Text, Link } = Typography;
    const gridStyle = {
        width: '25%',
        textAlign: 'center',
    };
    const { Step } = Steps;

    //for the <Description> tag
    const generateClassTime = (day: string) => {
        if (data !== undefined && data.schedule.classTime !== null) {
            const newClassTimeArray = data.schedule.classTime.map(item => {
                const newItem = {
                    "day": item.split(" ")[0],
                    "time": item.split(" ")[1]
                }
                return newItem
            })
            const foundDay = newClassTimeArray.find(item => item.day === day)
            if (day === foundDay?.day) {
                return foundDay.time
            }
        }
        return ""
    }
    const { Panel } = Collapse;
    // for the <tag> on Panel
    const getPanelExtra = (chapterId: number) => {
        if (data !== undefined) {
            if (chapterId > data.schedule.current) {
                return <Tag color="warning">pending</Tag>
            } else if (chapterId === data.schedule.current) {
                return <Tag color="success">processing</Tag>
            } else {
                return <Tag color="default">finished</Tag>
            }
        }
    }

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
                                        <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
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

                                    <Card.Grid style={{
                                        width: '25%',
                                        textAlign: 'center', padding: "10px 0 0"
                                    }} hoverable={false}><Title level={3} style={{ color: "mediumslateblue", marginBottom: "0.2rem" }}>{data.sales.price}</Title>
                                        <p>Price</p></Card.Grid>
                                    <Card.Grid style={{
                                        width: '25%',
                                        textAlign: 'center', padding: "10px 0 0"
                                    }} hoverable={false}><Title level={3} style={{ color: "mediumslateblue", marginBottom: "0.2rem" }}>{data.sales.batches}</Title>
                                        <p>Batches</p></Card.Grid>
                                    <Card.Grid style={{
                                        width: '25%',
                                        textAlign: 'center', padding: "10px 0 0"
                                    }} hoverable={false}><Title level={3} style={{ color: "mediumslateblue", marginBottom: "0.2rem" }}>{data.sales.studentAmount}</Title>
                                        <p>Students</p></Card.Grid>
                                    <Card.Grid style={{
                                        width: '25%',
                                        textAlign: 'center', padding: "10px 0 0"
                                    }} hoverable={false}><Title level={3} style={{ color: "mediumslateblue", marginBottom: "0.2rem" }}>{data.sales.earnings}</Title>
                                        <p>Earings</p></Card.Grid>


                                </Card>

                            </Col>

                            <Col flex="auto" style={{ padding: "20px" }}>
                                <div style={{ padding: "20px", border: "1px solid #f0f0f0" }}>



                                    <Row><Col><h1 style={{ color: "blueviolet" }}><br />Course Detail</h1><br /></Col></Row>
                                    <Title level={5}>Create Time</Title>
                                    <p>{data.createdAt}</p>
                                    <Title level={5}>Start Time</Title>
                                    <p>{data.startTime}</p>
                                    <Title level={5}>Status<Badge dot
                                        status={status.statusStr as "default" | "success" | "warning" | "processing" | "error" | undefined}
                                        style={{ top: "-8px", left: "2px" }}
                                    /></Title>
                                    <Row style={{ paddingBottom: "10px" }}>
                                        <Col style={{ overflowX : "scroll"}}>
                                            {/* {status.currentIndex !== 999 ?  */}
                                                <Steps current={status.currentIndex} >




                                                    {data.schedule.chapters.map((chapter, key) => {
                                                        // console.log("stpe")
                                                        // console.log(status.currentIndex)
                                                        return <Step key={key} title={chapter.name} style={{ paddingRight: "100px", background: "transparent !important" }} />
                                                    }




                                                    )}




                                                </Steps>
                                            {/* : null} */}
                                        </Col>
                                    </Row>
                                    <Title level={5}>Course Code</Title>
                                    <p>{data.uid}</p>
                                    <Title level={5}>Class Time</Title>
                                    <Descriptions layout="vertical" bordered column={7}>

                                        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((item, key) =>
                                            <Descriptions.Item label={item} key={key}>{generateClassTime(item)}</Descriptions.Item>)}
                                    </Descriptions>
                                    <Title level={5}>Category</Title>
                                    <Tag color="blue">{data.type[0].name}</Tag>
                                    <Title level={5} style={{ paddingTop: "10px", paddingBottom: "10px" }}>Description</Title>
                                    <p>{data.detail}</p>
                                    <Title level={5} style={{ paddingTop: "10px" }}>Chapter</Title>
                                    <Collapse
                                        defaultActiveKey={['1']}

                                        expandIconPosition="left"
                                    >{
                                            data.schedule.chapters.map((item, key) => {
                                                // console.log("panel")
                                                // console.log(status.currentIndex)
                                                return <Panel header={item.name} key={key} extra={getPanelExtra(item.id)}>
                                                    <div>{item.content}</div>
                                                </Panel>
                                            })
                                        }


                                    </Collapse>







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
