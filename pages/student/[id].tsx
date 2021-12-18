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

  const [data, setData] = useState();
  const [total, setTotal] = useState<number>();

  //let text;

  //useEffect(() => {
  if (id !== undefined) {
    getAStudentByIDService(id.toString()).then(function (result) {
      let contry = result.country;
      setData(contry);
      //setTotal(result.total);
      //console.log("total is" + total)

      console.log("here you go")
      console.log(result);
      console.log(data);
    });
  }


  //}, []);
  const { Header, Footer, Sider, Content } = Layout;


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
                <Card title={<Avatar size={64} src={<Image  src={`/profile.jpg`} />} />} style={{ width: 300 }} headStyle={{textAlign:"center"}}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col flex={3} style={{ padding: "20px" }}>
                <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
            </Row>
          </div>
          <p>{data}</p>
        </Content>

      </Layout>

    </>
  )
}

export default StudentDetailPage;
// export async function getStaticProps({ params }) {
//     const postData = await getPostData(params.id)
//     return {
//       props: {
//         postData
//       }
//     }
//   }
// export async function getStaticPaths() {
//   const paths = getAllPostIds()
//   return {
//     paths,
//     fallback: false
//   }
// }
// export default function Post({ postData }) {
//   return (
//     <Layout>
//       <Head>
//         <title>{postData.title}</title>
//       </Head>
//       <article>
//         <h1 className={utilStyles.headingXl}>{postData.title}</h1>
//         <div className={utilStyles.lightText}>
//           <Date dateString={postData.date} />
//         </div>
//         <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
//       </article>
//     </Layout>
//   )
// }