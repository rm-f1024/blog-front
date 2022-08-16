import React, { useState, useEffect } from 'react'
import { Row, Col, Menu } from 'antd'
import { HomeTwoTone  , EditTwoTone  ,BugTwoTone ,ToolTwoTone } from '@ant-design/icons';
import axios from 'axios'
import Link from 'next/link'
import Router, {useRouter}from 'next/router'
import servicePath from '../config/apiUrl';
const Header = ({getType}) => {

    let isUnmounted = false;
        const [navArr,setNavArr]= useState([])
        useState(() => {
            const  fetchData = async ()=>{
            let res = await fetch(servicePath.getTypeInfo) 
            const res_json =res.json()
            return res_json
            }
           if(!isUnmounted){
            const data = fetchData()['data']
            setNavArr(data)
           }
            return () => {
                isUnmounted=true
            }
        },[])
        
   const  handleClick=(e)=>{
            if(e.key==0){
                Router.push('/')
            }else{
                Router.push('/list?id='+e.key)
            }
         
    }
    const router = useRouter()
    let path= router.asPath
    let index= 0
   if(path.includes('/list')){
       index=path.match(/\d+/g)[0]
   }

    return (
        <div className='header'>
            <Row justify="center" >
                <Col xs={24} sm={24} md={10} lg={10} xl={10} >
                    <span className='header-logo'>Flex-Kang</span>
                    <span className='header-txt'>爱生活|爱编程 </span>
                </Col>
                <Col xs={0} sm={0} md={9} lg={9} xl={8}  >
                        <Menu  defaultSelectedKeys={[index+'']} mode = 'horizontal'  onClick={handleClick}  >
                        <Menu.Item key="0" icon={<HomeTwoTone   className='header-icon' />}>
                            &nbsp;
                            首页
                        </Menu.Item>
                        <Menu.Item key="1" icon={<EditTwoTone  className='header-icon' />}>
                        学习记录
                        </Menu.Item>
                        <Menu.Item key="2"  icon={ <BugTwoTone  className='header-icon' />}>
                        踩坑
                        </Menu.Item>
                        <Menu.Item key="3"  icon={ <ToolTwoTone  className='header-icon' />} >
                        工具
                        </Menu.Item>
                        </Menu>
                        </Col>
            </Row>
        </div>
    )
}


export default Header