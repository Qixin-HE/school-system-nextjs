import { useRouter } from 'next/router'
import { getAStudentByIDService } from '../../lib/api/service'
import { useState, useEffect } from 'react'
import { StudentDetail } from '../../lib/model/student';
import {
  Space, Breadcrumb, Table, TablePaginationConfig, Modal,
  Form, Card, Tabs, Layout,
  Row, Col, Avatar, Image
} from 'antd';


const StudentDetailPage = () => {
  const router = useRouter()

  const { id } = router.query

  const [data, setData] = useState<StudentDetail>();
  const [total, setTotal] = useState<number>();

  //let text;

  useEffect(() => {
    if (id !== undefined) {
      getAStudentByIDService(id.toString()).then(function (result) {

        setData(result);
        //setTotal(result.total);
        //console.log("total is" + total)

        console.log("here you go")
        console.log(result);
        console.log(data);
      });
    }

  }, []);
  const { Header, Footer, Sider, Content } = Layout;

  if (data == undefined) {
    return (<p>loading</p>)
  }

  const { TabPane } = Tabs;

  return (

    
    <>
    
      <Layout>

        <Content style={{ height: "100vh", marginLeft: "20px" }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item>Student</Breadcrumb.Item>
            <Breadcrumb.Item>Detail</Breadcrumb.Item>
          </Breadcrumb>
          <div className="space-align-block" style={{ backgroundColor: "white" }}>
            <Row>
              <Col flex={2} style={{ padding: "20px" }}>
                <Card title={<Avatar size={100} src={<Image src={`/profile.jpg`} />} />} style={{ textAlign: "center" }}>
                  <Row justify="center">
                    <Col span={8}>
                      <strong>Name</strong>
                      <p>{data.name}</p>
                      <strong>Email</strong>
                      <p>{data.email}</p>
                    </Col>
                    <Col span={8}>
                      <strong>Age</strong>
                      <p>
                        {data.age}
                      </p>
                      <strong>Phone</strong>
                      <p>{data.phone}</p>
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

              <Col flex={3} style={{ padding: "20px"}}>
                <div style={{ padding: "20px", border: "1px solid #f0f0f0"}}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="About" key="1">
                    
                    <Row><Col><h1 style={{color: "blueviolet"}}>Information</h1></Col></Row>

                    <Row>
                      <Col>
                      <strong>Educations:</strong>
                      <br/>
                      <strong>Area:</strong>
                      <br/>
                      <strong>Gender:</strong>
                      <br/>
                      <strong>Member Period:</strong><br/>
                      
                      <strong>Type:</strong><br/>
                      <strong>Create Time:</strong><br/>
                      <strong>Update Time:</strong><br/>
                      <br/>
                      </Col>
                      <Col>
                      {data.education}
                      <br/>
                      {data.country}
                      <br/>
                      {data.gender}<br/>
                      {data.memberEndAt}<br/>
                      {data.type.name}<br/>
                      {data.createdAt}<br/>
                      {data.updatedAt}<br/>
                      
                      </Col>
                    </Row>
                    
                    
                     
                    
                    
                    
                    
                    
                    
                  </TabPane>
                  <TabPane tab="Courses" key="2">
                    Content of Tab Pane 2
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
