import React, {useState}from 'react'
import Image from 'next/image'
import {Avatar,Divider} from 'antd'
import  {GithubFilled,QqCircleFilled ,WechatFilled} from '@ant-design/icons'
const Author = () => {
    return (
       <>
          <div  className='author-div' >
        <Avatar 
        size={100}
        src={<Image alt='' src={'/img/avatar.webp'}  layout='fill'
        />}
        />
        <div >Mr Kang</div>
        <div className='author-introduction'>一只React菜鸟</div>

        <Divider>社交账号</Divider>
        <div className='account' >
        <GithubFilled />
        <QqCircleFilled />
        <WechatFilled />
            </div>
            </div>
        </>
    )
}
export default Author 