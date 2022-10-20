import Head from 'next/head'
import Link from 'next/link'
import { Col, Row, List, Breadcrumb, Affix,Divider } from 'antd'
import React, { useState ,useEffect} from 'react'

import { marked } from 'marked';
import highlight from 'highlight.js'
import MarkNav from 'markdown-navbar';
import Header from '../../components/header.js'
import Top from '../../components/top.js'
import Author from '../../components/author.js'
import UserComment from '../../components/comment'
import Advert from '../../components/advert'
import Hot from '../../components/hot'
import Footer from '../../components/footer'
import 'markdown-navbar/dist/navbar.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { ReadOutlined, BulbOutlined, CarryOutOutlined, FireOutlined, FolderFilled } from '@ant-design/icons'
import axios from 'axios';
import servicePath from '../../config/apiUrl.js';


export default function Detail({id}) {
    let [top,setTop]= useState(10)
    let [myarticle,setArticle]= useState({})
    //console.log("article======>",myarticle);
    useEffect(() => {
        const fetData =async() => {
        let  res=await axios(servicePath.getArticleById+'/'+id)
        let {data:{data:[article]}}= res
        setArticle({...article,
           content: marked.parse(article.content)
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
        tables:true,
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
                            <Breadcrumb.Item><Link href="/list"><a >{myarticle.type_name}</a></Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className='detail-title'>
                      {myarticle.title}
                    </div>
                    <div className='detail-center'>
                        <CarryOutOutlined />{myarticle.addtime1}
                        <FireOutlined />{myarticle.read}
                        <FolderFilled />{myarticle.type_name}
                    </div>
                    <div className='detail-content'
                    dangerouslySetInnerHTML={{__html:myarticle.content}}>
                    </div>
                    <Divider plain orientation='left'>
                        评论
                    </Divider>
                    <UserComment articleId={id}/>

                </Col>
                <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
                    < Author />
                    <Affix offsetTop={top}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            <MarkNav
                                className="article-menu"
                                source={myarticle.content} 
                                ordered={false}
                            />
                        </div>
                    </Affix>
                    <Hot />
                </Col>
            </Row>

            <Top/>
            <Footer />


        </>
    )
}
export     async function getStaticPaths(){
    let res = await fetch(servicePath.getArticleId)
    let {data} = await res.json()
    const paths= data.map((data) => {
        return {params:{id:data.id.toString()}}
    })
    return { paths, fallback: false }
}

export     async function getStaticProps({params}){
    let id = params.id
    return {
        props:{
            id
        }
    }
}
