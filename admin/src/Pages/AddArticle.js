import React, { useState, useEffect } from 'react'
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col ,Input, Select ,Button ,DatePicker ,message } from 'antd'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
const { Option } = Select
const { TextArea } = Input

function AddArticle(props) {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('选择类别') //选择的文章类别
    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const gitTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            withCredentials: true
        }).then(res => {
            if(res.data.data === '没有登录') {
                localStorage.removeItem('openId')
                props.history.push('/')
            } else {
                setTypeInfo(res.data.data)
            }
        })
    }
    useEffect(()=> {
        gitTypeInfo()
    }, []) // 数组为空表示进入页面内只执行一次
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input placeholder="博客标题" size="large"></Input>
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large">
                                {
                                    typeInfo.map((item,index)=>{
                                        return (<Option key={index} value={item.Id}>{item.typeName}</Option>)
                                    })
                                }


                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea
                                value={articleContent}
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                onChange={changeContent}
                                onPressEnter={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }} />

                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={null}>发布文章</Button>
                            <br />
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea
                                value={introducemd}
                                rows={4}
                                placeholder="文章简介"
                                onChange={changeIntroduce}
                                onPressEnter={changeIntroduce}
                            />
                            <br /><br />
                            <div className="introduce-html" dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }}></div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="发布日期"
                                    size="large"
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle