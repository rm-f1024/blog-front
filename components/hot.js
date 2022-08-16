import React, {useState,useEffect} from 'react';
import Link from 'next/link'
import {List} from 'antd';
import servicePath from '../config/apiUrl'
import { Fragment } from 'react/cjs/react.production.min';
const Hot= ()=> {
  const [list,setList] =  useState([])
  useEffect( () => {
    const fetchData= async() =>{
      let res = await fetch(servicePath.getArticleHot)
      let res_json = await res.json()
      let listData = res_json['data']
      setList(listData)
    }
      fetchData?.()
  },[])

  const type=['学习记录','各类踩坑','工具使用']
  return (
    <div className='hot'>
      <List
      header="热门文章"
      itemLayout='vertical'
      dataSource={list}
      renderItem={item=>{
      return (  <List.Item >

          <Fragment>
        <Link className='item-link' href={{pathname:'detail',query:{id:item.id}}}>
          <a>{item.title}</a></Link>
         <span style={{ position:'absolute',right:'0rem' }}> 阅读量({item.read})</span>
          </Fragment>
       </List.Item>)
        
      }}
      />
     
    
    </div>
  )
}




export default Hot