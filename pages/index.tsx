import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Layout } from 'antd';
import React from 'react';

const { Header, Footer, Content } = Layout;

const Home: NextPage = () => {
  //fix the warning of useLayoutEffect
  if (typeof document === 'undefined') {
    React.useLayoutEffect = React.useEffect;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>School System</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Header style={{ background: "#FFFFFF", color: " #8C929C", fontFamily: "Bebas Neue" }}>
          <div className="container">
            <ul className={styles.menu}>
              <li><a>Courses</a></li>
              <li><a>Event</a></li>
              <li><a>logo</a></li>
              <li><a>Student</a></li>
              <li><a>Teacher</a></li>
              <li><a href="/signin">Sign in</a></li>
            </ul>

          </div>
        </Header>
        <Content>
          <h1 className={styles.title}>

            Try{' '}the
            <Link href="/signin">
              <a> Sign in page!</a>
            </Link>
          </h1>

        </Content>
        <Footer></Footer>
      </Layout>

    </div>
  )
}

export default Home
