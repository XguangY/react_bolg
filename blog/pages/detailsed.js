import React from 'react'
import Head from 'next/head'
import {Row, Col, Icon, Breadcrumb} from 'antd'
import Header from '../components/Header'
import Advert from '../components/Advert'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../static/style/components/detailsed.css'
const Detailsed = () => (
  <div>
    <Head>
      <title>Detailsed</title>
    </Head>
    <Header/>
    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
        <div className="bread-div">
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">首页</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              视频
            </Breadcrumb.Item>
            <Breadcrumb.Item>XXX</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="detailed-title">
            视频标题是：aaabbadasdad, 作者徐老作
        </div>
        <div className="list-icon center">
          <span><Icon type="calendar" style={{color: '#909399'}}/> 2019-10-31</span>
          <span><Icon type="folder" style={{color: '#409eff'}}/> 视频</span>
          <span><Icon type="fire" style={{color: '#F56C6C'}}/> 6666人</span>
        </div>
        <div className="detailed-content">
            内容是：：：：：
        </div>
      </Col>
      <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
        right
      </Col>
    </Row>
  </div>
)

export default Detailsed
