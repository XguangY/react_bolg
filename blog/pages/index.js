import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, Icon, List } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'


const Home = () => {
  const [myList, setMylist] = useState(
    [
      { title: '每日一笑', context: '小时候偷家里钱，被老妈揍了一顿。她问我：“知道为什么打你吗？”我抽泣着说：“我拿了你十块钱。”她说：“还敢撒谎，明明偷了六十。”说完拿起鸡毛掸子又要打。这时老爸拦着她说：“你把他打傻了，他哪里还记得拿了多少。”当时觉得老爸挺好的，现在想想，这事没那么简单...' },
      { title: '每日二笑', context: '买车前后对待公交车的态度变化：买车前：怎么还不来。买车后：怎么还不走。' },
      { title: '回眸一笑', context: '我们应从牛、河马、大象身上深刻的认识到，光靠吃素，还有喝、拉、撤以及散步是不可能减肥的。' }
    ]
  )
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
                <div className="list-title">{item.title}</div>
                <div className="list-icon">
                  <span><Icon type="calendar" style={{color: '#909399'}}/> 2019-10-22</span>
                  <span><Icon type="folder" style={{color: '#409eff'}}/> 视频</span>
                  <span><Icon type="fire" style={{color: '#F56C6C'}}/> 5498人</span>
                </div>
                <div className="list-context">{item.context}</div>
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

export default Home
