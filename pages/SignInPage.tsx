import Link from 'next/link'
import { Row, Col, Form, Input, Checkbox, Button, Radio } from 'antd'
// stuck here for a while (the cols just piled up but not in a row), then find the reference below:
// https://www.kindacode.com/article/how-to-use-ant-design-in-a-next-js-project/
import 'antd/dist/antd.css';
//no toggle button in antd? - it is "radio" in antd

import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function SignInPage() {
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  // const layout = {
  //   labelCol: { span: 8 },
  //   wrapperCol: { span: 16 },
  // };

  return (
    <>
      <Row justify="center">
        <Col span={6}></Col>
        <Col span={12}>
          <h1 style={{
            fontWeight: 600,
            transform: "scale(1, 1.2)",
            // what is the font?
            justifyContent: "center",
            display: "flex"
          }}>COURSE MANAGEMENT ASSISTANT</h1>
          <Radio.Group style={{ paddingBottom: "20px" }} >
            <Radio.Button value="student">Student</Radio.Button>
            <Radio.Button value="teacher">Teacher</Radio.Button>
            <Radio.Button value="manager">Manager</Radio.Button>
          </Radio.Group>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>


            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100%", marginBottom: "20px" }}>
                Log in
              </Button>

              No account? <a href="">Sign Up</a>
            </Form.Item>
          </Form>
          <h2>
            <Link href="/">
              <a>Back to home</a>
            </Link>
          </h2>
        </Col>
        <Col span={6}></Col>
      </Row>



    </>
  )
}