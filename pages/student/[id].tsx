import { useRouter } from 'next/router'
import { getAStudentByIDService } from '../../lib/api/service'
import { useState, useEffect } from 'react'

import {
  Space, Breadcrumb, Table, TablePaginationConfig, Modal,
  Form, Card, Input, Button, message, Popconfirm, Layout,
  Row, Col, Avatar, Image
} from 'antd';
const StudentDetailPage = () => {
  const router = useRouter()

  const { id } = router.query

  const [data, setData] = useState("");
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

  // if (data == undefined) {
  //   return (<p>loading</p>)
  // }

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
                  
                    <Row type="flex" align="middle">
                      
                        <Col>
                          
                            <Row>
                              <strong>Name</strong>
            
                            </Row>
                            <Row><p>{data.name}</p></Row>
                            <Row>
                              <strong>Email</strong>
                            </Row>
                          
                        </Col>
                        <Col>
                          
                            <Row>
                              <strong>Age</strong>
                            </Row>
                            <Row>
                              <strong>Phone</strong>
                            </Row>
                         
                        </Col>
                      
                    </Row>
                    <strong>Address</strong>
                    <Row>

                    </Row>
                  
                </Card>
              </Col>
              <Col flex={3} style={{ padding: "20px" }}>
                <Card title="Default size card" extra={<a href="#">More</a>} >
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
            </Row>
          </div>
          
        </Content>

      </Layout>

    </>
  )
}

export default StudentDetailPage;
