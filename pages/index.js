import Head from 'next/head'
import Link from 'next/link'
import { Col, Row, List, Breadcrumb, BackTop } from 'antd'
import { } from 'antd';
import React, { useState } from 'react'
import Header from '../components/header.js'
import Hot from '../components/hot.js'
import Top from '../components/top'
import Author from '../components/author.js'
import Advert from '../components/advert'
import Footer from '../components/footer'
import servicePath from '../config/apiUrl';
import { marked } from 'marked'
import highlight from 'highlight.js'
import { ReadOutlined, BulbOutlined, CarryOutOutlined } from '@ant-design/icons'
import axios from 'axios'

//首页
export default function Index({ type, data }) {
  
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


  const addRead = (id, read) => {
    console.log('id=============>', id)
    console.log('read=============>', read)
    let obj = {
      id: id,
      read: read + 1
    }
    const fetchData = async () => {
      let res = await fetch(servicePath.addArticleReadById,
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
        })

    }
   try{
    fetchData?.();
   }catch(e){
    console.log(e)
   }
  }
  for (let item of data) {
    try {
      item.content = marked.parse(item.content)
    } catch (error) {
      //console.log(error);
    }
  }
  // //console.log("data", data);
  const [mylist, setMylist] = useState(data)


  return (
    <div className='rainbow'>
      <Head>
        <title>blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Row className='comm-main' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={16} xl={12}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><Link href="/" ><a >首页</a></Link></Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            bordered="true"
            dataSource={mylist}
            header={`共计${mylist.length}篇文章`}
            split="true"

            itemLayout='vertical'
            renderItem={item => {
              return (
                <List.Item>
                  <div className='list-icon'>
                    <span><CarryOutOutlined />{item.addtime1}</span>
                    <span><BulbOutlined />{item.type_name}</span>
                    <span><ReadOutlined />{item.read}</span>
                  </div>

                  <div className='list-title'>
                    <Link href={{ pathname: `/detail/[id]`, query: { id: item.id } }}><a onClick={() => { addRead(item.id, item.read) }} >{item.title}</a></Link>
                  </div>
                  <div className='list-context' dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </List.Item>
              )
            }
            }
          >
          </List>
        </Col>

        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          < Author />
          <Hot />
        </Col>
      </Row>
      <Top />


      <Footer />


    </div>
  )
}
export async function getServerSideProps() {
  let res = await fetch(servicePath.getTypeInfo)
  let res_json = await res.json()
  let type = res_json['data']
  const promise = await axios(servicePath.getArticleList)
  let data = promise.data.data
  return {
    props: {
      type,
      data
    }
  }
}