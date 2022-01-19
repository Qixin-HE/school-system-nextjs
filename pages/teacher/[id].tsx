import { useRouter } from 'next/router'
import { getATeacherByIDService } from '../../lib/api/teacherService';
import { useState, useEffect } from 'react'
import { getTeacherDetailResponse } from '../../lib/model/teacher';
import {
  Tag, Breadcrumb, Table, Rate, Modal,
  Form, Card, Tabs, Layout,
  Row, Col, Avatar, Image
} from 'antd';
import Link from 'next/link';


const StudentDetailPage = () => {
  const router = useRouter()

  const { id } = router.query

  const [data, setData] = useState<getTeacherDetailResponse>();


  // const [courseTabelData, setCourseTabelData] = useState<CourseStudentDetail[]>();


  useEffect(() => {
    if (id !== undefined) {
      getATeacherByIDService(id.toString()).then(function (result) {
        setData(result);

        console.log(result);


      });
    }

  }, [router]);

  // transform data in tab2 in the tabel
  // useEffect(() => {

  //   if (data !== undefined) {
  //     let courses: CourseStudentDetail[] = [];
  //     data.courses.forEach(course => {

  //       const aCourse = {
  //         key: course.id,
  //         id: course.id,
  //         name: course.name,
  //         //做成有多少个type join起来中间加逗号更加make sense
  //         type: course.type[0] !== undefined ? course.type[0].name : "",
  //         joinTime: course.createdAt
  //       }
  //       courses.push(aCourse);
  //     })
  //     setCourseTabelData(courses);


  //   }

  // }, [data]);

  const { Header, Footer, Sider, Content } = Layout;

  if (data == undefined) {
    return (<p>loading</p>)
  }


  const { TabPane } = Tabs;

  //for colourful tags in Interesting
  //用intersting的array的index来mod一下
  //不需要interst和颜色一一对应，只需要kind of 把这些interst用颜色区分出来就行
  let tagColor = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan",
    "blue", "geekbule", "purple"];



  const { Column, ColumnGroup } = Table;

  return (


    <>

      <Layout>

        <Content style={{ height: "100vh", marginLeft: "20px" }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item><Link href="/teacher/teacherlist">Teacher</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Detail</Breadcrumb.Item>
          </Breadcrumb>
          <div className="space-align-block" style={{ backgroundColor: "white" }}>
            <Row wrap={false}>
              <Col flex="600px" style={{ padding: "20px" }}>
                <Card title={<Avatar size={100} src={<Image src={`/profile.jpg`} />} />} style={{ textAlign: "center" }}>
                  <Row justify="center">
                    <Col span={8}>
                      <strong>Name</strong>
                      <p>{data.name}</p>
                      <br />
                      <strong>Email</strong>
                      <p>{data.email}</p>
                      <br />
                    </Col>
                    <Col span={8}>

                      <strong>Phone</strong>
                      <p>{data.phone}</p><br />
                      <strong>Country</strong>
                      <p>{data.country}</p><br />
                    </Col>

                  </Row>

                  <Row justify="center">
                    <Col>
                      <strong>Address</strong>
                      <p>{data.profile.address}</p>
                    </Col>
                  </Row>


                </Card>
              </Col>

              <Col flex="auto" style={{ padding: "20px" }}>
                <div style={{ padding: "20px", border: "1px solid #f0f0f0" }}>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="About" key="1">

                      <Row><Col><h1 style={{ color: "blueviolet" }}><br />Information</h1><br /></Col></Row>

                      <Row gutter={[16, 24]}>
                        <Col className="gutter-row" span={4}>
                          <strong>Birthday:</strong>
                          <br /><br />

                          <strong>Gender:</strong>
                          <br /><br />


                          <strong>Create Time:</strong><br /><br />
                          <strong>Update Time:</strong><br /><br />

                        </Col>
                        <Col className="gutter-row" span={8}>
                          {data.profile.birthday}
                          <br /><br />

                          {data.profile.gender == 2 ? "Female" : "Male"}<br /><br />


                          {data.createdAt}<br /><br />
                          {data.updatedAt}<br /><br />

                        </Col>
                      </Row>
                      <Row><Col><br /><h1 style={{ color: "blueviolet" }}>Skills</h1><br />


                      </Col></Row>
                      {data.skills !== undefined? data.skills.map((skill, key) => {

                        return <Row key={key} gutter={[16, 24]}>
                          <Col className="gutter-row" span={4}><strong>{skill.name}:</strong></Col>
                          <Col className="gutter-row" span={8}><Rate disabled allowHalf defaultValue={skill.level} /></Col>
                        </Row>

                      }) : null}

                      <Row><Col><br /><h1 style={{ color: "blueviolet" }}>Description</h1><br />
                        <p>{data.profile.description}</p>
                      </Col>

                      </Row>


                    </TabPane>
                    <TabPane tab="Courses" key="2">
                      {/* <Table dataSource={courseTabelData}>
                        <Column title="No." dataIndex="id" key="id" />
                        <Column title="Name" dataIndex="name" key="name" />
                        <Column title="Type" dataIndex="type" key="type" />

                        <Column title="Join Time" dataIndex="joinTime" key="joinTime" />

                      </Table> */}
                      <p>Here is Courses</p>
                    </TabPane>

                  </Tabs>
                </div>
              </Col>
            </Row>
          </div>

        </Content>

      </Layout>


    </>
  )
}

export default StudentDetailPage;
