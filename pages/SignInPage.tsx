import Link from 'next/link'
import Head from "next/head";
import { Row, Col, Form, Input, Checkbox, Button, Radio } from 'antd';
import { useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/router'

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
  var AES = require("crypto-js/aes");
  const router = useRouter();

  const onFormSubmit = (values: any) => {
    const loginObject = {
      email: values.username,
      password: AES.encrypt(values.password, 'cms').toString(),
      role: role
    }
    console.log(loginObject)
    axios.post('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/login', loginObject)
    .then(function (response) {
      //console.log(response.data.token);
      var res = response.data;
      localStorage.setItem('token', res.data.token);
      alert("Sign in successfully, token:" + res.data.token);
      router.push("/OverviewPage")
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const [role, setRole] = useState("manager");

  



  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/BebasNeue-Regular.ttf"
          as="font"
          crossOrigin=""
        />

      </Head>
      <Row justify="center">
        <Col span={6}></Col>
        <Col span={12}>
          <h1 style={{
            // fontWeight: 600,
            fontSize: "38px",
            lineHeight: "1.23",
            fontFamily: "Bebas Neue",
            justifyContent: "center",
            display: "flex"
          }}>COURSE MANAGEMENT ASSISTANT</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFormSubmit}
          >
            <Radio.Group style={{ paddingBottom: "20px" }} onChange={
              e => {
                setRole(e.target.value)
              }} defaultValue="manager">
              <Radio.Button value="student">Student</Radio.Button>
              <Radio.Button value="teacher">Teacher</Radio.Button>
              <Radio.Button value="manager">Manager</Radio.Button>
            </Radio.Group>

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
                // onChange={e => setPassword(e.target.value)}
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