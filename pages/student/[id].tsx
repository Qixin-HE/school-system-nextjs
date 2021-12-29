import { useRouter } from 'next/router'
import { getAStudentByIDService } from '../../lib/api/service'
import { useState, useEffect } from 'react'
import { StudentDetail, CourseStudentDetail } from '../../lib/model/student';
import {
  Tag, Breadcrumb, Table, TablePaginationConfig, Modal,
  Form, Card, Tabs, Layout,
  Row, Col, Avatar, Image
} from 'antd';
import Link from 'next/link';


const StudentDetailPage = () => {
  const router = useRouter()

  const { id } = router.query

  const [data, setData] = useState<StudentDetail>();

  
  const [courseTabelData, setCourseTabelData] = useState<CourseStudentDetail[]>();

  useEffect(() => {
    if (id !== undefined) {
      getAStudentByIDService(id.toString()).then(function (result) {
        setData(result);
        console.log("here you go")
        console.log(result);
        // generateColorForTags();
        // console.log(selectedColor)
        
        
        

      });
    }

  }, [router]);

  useEffect(() => {
    
        if (data !== undefined)
        {
          let courses:CourseStudentDetail[] = [];
          data.courses.forEach(course => {
            
            const aCourse = {
              key: course.id,
              id: course.id,
              name: course.name,
              type: course.type[0] !== undefined ? course.type[0].name : "",
              joinTime: course.createdAt
            }
            courses.push(aCourse);
          })
          setCourseTabelData(courses);
          console.log("here")
        }

  }, [data]);

  const { Header, Footer, Sider, Content } = Layout;

  if (data == undefined) {
    return (<p>loading</p>)
  }

  const { TabPane } = Tabs;

  //for colourful tags in Interesting
  let tagColor = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan",
    "blue", "geekbule", "purple"];

  // let selectedColor = new Map();
  // const generateColorForTags = () => {

  //   let tagColorCopy = new Set([...tagColor]);
  //   data.interest.forEach(interest => {
  //     let findAColor = false;
  //     while (!findAColor) {
  //       const color = tagColor[Math.random() * tagColorCopy.size];
  //       if (tagColorCopy.has(color)) {
  //         tagColorCopy.delete(color)
  //         selectedColor.set(interest, color);
  //         findAColor = true;
  //       }

  //     }
  //     console.log(selectedColor)


  //   })
  // }
  const { Column, ColumnGroup } = Table;

  return (


    <>

      <Layout>

        <Content style={{ height: "100vh", marginLeft: "20px" }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item><Link href="/student/studentlist">Student</Link></Breadcrumb.Item>
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
                      <strong>Age</strong>
                      <p>
                        {data.age}
                      </p><br />
                      <strong>Phone</strong>
                      <p>{data.phone}</p><br />
                    </Col>

                  </Row>

                  <Row justify="center">
                    <Col>
                      <strong>Address</strong>
                      <p>{data.address}</p>
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
                        <Col className="gutter-row" span={8}>
                          {data.education}
                          <br /><br />
                          {data.country}
                          <br /><br />
                          {data.gender == 2 ? "Female" : "Male"}<br /><br />
                          {data.memberStartAt} - {data.memberEndAt}<br /><br />
                          {data.type.name}<br /><br />
                          {data.createdAt}<br /><br />
                          {data.updatedAt}<br /><br />

                        </Col>
                      </Row>
                      <Row><Col><br /><h1 style={{ color: "blueviolet" }}>Interesting</h1><br />
                        {data.interest.map((interest, key) => {
                          
                          return <Tag key={key} color={tagColor.shift()}>{interest}</Tag>
                        })}

                      </Col></Row>

                      <Row><Col><br /><h1 style={{ color: "blueviolet" }}>Descriptiong</h1><br />
                        <p>{data.description}</p>
                      </Col>

                      </Row>


                    </TabPane>
                    <TabPane tab="Courses" key="2">
                    <Table dataSource={courseTabelData}>
                    <Column title="No." dataIndex="id" key="id" />
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="Type" dataIndex="type" key="type" />
                    
                    <Column title="Join Time" dataIndex="joinTime" key="joinTime" />
                    
                </Table>
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
