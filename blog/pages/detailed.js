import React from 'react'
import Head from 'next/head'
import {Row, Col, Icon, Breadcrumb, Affix} from 'antd'
import Header from '../components/Header'
import Advert from '../components/Advert'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../static/style/components/detailsed.css'
import axios  from 'axios'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'

const Detailsed = (props) => {
  
  const tocify = new Tocify()
  const renderer = new marked.Renderer();
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
      renderer: renderer, 
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    }); 
  
  let html = marked(props.article_content) 

  return (
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
              视频标题是：aaabbadasdad, 作者：徐老作
          </div>
          <div className="list-icon center">
            <span><Icon type="calendar" style={{color: '#909399'}}/> 2019-10-31</span>
            <span><Icon type="folder" style={{color: '#409eff'}}/> 视频</span>
            <span><Icon type="fire" style={{color: '#F56C6C'}}/> 6666人</span>
          </div>
          <div className="detailed-content" dangerouslySetInnerHTML={{__html : html}}/>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Advert/>
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}
// 页面加载前的钩子函数
Detailsed.getInitialProps = async(context)=>{

  console.log(context.query.id)
  let id =context.query.id
  const promise = new Promise((resolve)=>{

    axios(servicePath.getArticleById + id).then(
      (res)=>{
        console.log(res)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detailsed
