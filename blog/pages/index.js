import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, Icon, List } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios  from 'axios'

const Home = (list) => {
  const [myList, setMylist] = useState(list.data)
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>热点栏目</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item>
                 <div className="list-title">
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                <div className="list-icon">
            <span><Icon type="calendar" style={{color: '#909399'}}/>{item.addTime}</span>
            <span><Icon type="folder" style={{color: '#409eff'}}/>{item.typeName}</span>
            <span><Icon type="fire" style={{color: '#F56C6C'}}/> {item.view_count}人</span>
                </div>
                <div className="list-context">{item.introduce}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Advert/>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios('http://127.0.0.1:7001/default/getArticleList').then(res => {
      resolve(res.data)
    })
  })
  return await promise
} 

export default Home
