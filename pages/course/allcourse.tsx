import Dashboard from "../../components/Dashboard";
import { HeartFilled, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { getCourseService } from "../../lib/api/courseService";
import { Button, Card, Col, Divider, List, Row, Typography } from "antd";
import { getCourseResponse } from "../../lib/model/course";
import Link from "next/link";

const allcourse = () => {
    const [courses, setCourses] = useState<getCourseResponse[]>()

    useEffect(() => {
        getCourseService().then(
            (response) => {
                setCourses(response)
                console.log(response)
            }
        )



    }, []);
    const { Title } = Typography;
    return (
        <>
            <Dashboard>
                <br />
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={courses}
                    renderItem={item => (
                        <List.Item>
                            <Card hoverable cover={<img alt="courseimg" src={`/profile.jpg`} />}>
                                <Row>
                                    <Col >
                                        <Title level={5}>{item.name}</Title>

                                    </Col>

                                </Row>

                                <Row style={{ paddingTop: "10px" }}>
                                    <Col>
                                        {item.startTime}
                                    </Col>
                                    <Col style={{ marginLeft: "auto" }}>
                                        <HeartFilled style={{ color: "crimson" }} /> {item.star}

                                    </Col>
                                </Row>
                                <Divider style={{ margin: "7px 0" }} />

                                <Row >
                                    <Col>
                                        <p>Duration:</p>
                                    </Col>
                                    <Col style={{ marginLeft: "auto" }}>
                                        <strong>{item.duration} years</strong>

                                    </Col>
                                </Row>
                                <Divider style={{ margin: "7px 0" }} />

                                <Row >
                                    <Col>
                                        <p>Teacher:</p>
                                    </Col>
                                    <Col style={{ marginLeft: "auto" }}>
                                        <strong style={{ color: "dodgerblue" }}>{item.teacherName}</strong>

                                    </Col>
                                </Row>
                                <Divider style={{ margin: "7px 0" }} />
                                <Row >
                                    <Col>
                                        <p><UserOutlined style={{ color: "dodgerblue" }} /> Student Limit:</p>
                                    </Col>
                                    <Col style={{ marginLeft: "auto" }}>
                                        <strong>{item.maxStudents}</strong>

                                    </Col>
                                </Row>
                                <Row style={{ paddingTop: "10px" }}>
                                    <Col>
                                        <Button type="primary" >
                                            <Link href="/course/[id]" as={`/course/${item.id}`}>
                                                Read More
                                            </Link>
                                        </Button>
                                    </Col>

                                </Row>
                            </Card>

                        </List.Item>
                    )}
                />
            </Dashboard>
        </>
    )
}

export default allcourse;