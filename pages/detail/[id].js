import Head from 'next/head'
import Link from 'next/link'
import { Col, Row, List, Breadcrumb, Affix } from 'antd'
import React, { useState, useEffect } from 'react'

import { marked } from 'marked';
import highlight from 'highlight.js'
import MarkNav from 'markdown-navbar';
import Header from '../../components/header.js'
import Author from '../../components/author.js'
import Advert from '../../components/advert'
import Hot from '../../components/hot'
import Footer from '../../components/footer'
import 'markdown-navbar/dist/navbar.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { ReadOutlined, BulbOutlined, CarryOutOutlined, FireOutlined, FolderFilled } from '@ant-design/icons'
import axios from 'axios';
    
    
import servicePath from '../../config/apiUrl.js';


export default function Detail({ id }) {
    let [top, setTop] = useState(10)
    const [article, setArticle] = useState({});
    useEffect(() => {
        const fetData =async() => {
        let  res=await axios(servicePath.getArticleById+'/'+id)
        let {data:{data:[articleInfo]}}= res
        setArticle({...articleInfo,
           content: marked.parse(articleInfo.content)
        })
        }
        fetData?.()
    },[id])
    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
            return highlight.highlightAuto(code).value;
        }
        ,
        langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
        pedantic: false, //语法容错
        gfm: true,
        breaks: false,
        sanitize: false,//不忽略html标签
        smartLists: true,
        smartypants: false,
        tables: true,
        xhtml: false
    });


    return (
        <>
            <Head>
                <title>文章</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <Row className='comm-main' justify='center'>
                <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={12}>
                    <div className="bread-div">
                        <Breadcrumb>
                            <Breadcrumb.Item><Link href="/"><a>首页</a></Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link href="/list"><a >{article.type_name}</a></Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className='detail-title'>
                        {article.title}
                    </div>
                    <div className='detail-center'>
                        <CarryOutOutlined />{article.addtime1}
                        <FireOutlined />{article.read}
                        <FolderFilled />{article.type_name}
                    </div>
                    <div className='detail-content'
                        dangerouslySetInnerHTML={{ __html:article.content }}>
                    </div>
                </Col>
                <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
                    < Author />
                    <Affix offsetTop={top}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            <MarkNav
                                className="article-menu"
                                source={article.content}
                                ordered={false}
                            />
                        </div>
                    </Affix>
                    <Hot />
                </Col>
            </Row>
            <Footer />
        </>
    )
}
export async function getStaticPaths() {
    let res = await fetch(servicePath.getArticleId)
    let { data } = await res.json()
    const paths = data.map((data) => {
        return { params: { id: data.id.toString() } }
    })
    return { paths, fallback: true }
}
export async function getStaticProps({ params  }) {
    return {
        props: {
            id:params.id
        },
        revalidate: 1, // In seconds
    }
}


