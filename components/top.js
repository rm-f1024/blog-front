import React from 'react';
import {BackTop} from 'antd';
const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  // backgroundColor: '#1088e9',
  textAlign: 'center',
  fontSize: 14,
  backgroundImage:"url('../img/back.png')",
  backgroundSize:"contain"

};
const Top= ()=> {
  return (
    <BackTop visibilityHeight={200}>
    <div style={style}></div> 
  </BackTop>
  )
}

export default Top