import React from 'react'
const Top= ()=> {
  const toTop= () => {
   let timer = setInterval(() => {
      //获取滚动条的滚动高度
      let osTop = document.documentElement.scrollTop || document.body.scrollTop;
      //用于设置速度差，产生缓动的效果
      let speed = Math.floor(-osTop / 6);
      document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
      // this.isTop = true; //用于阻止滚动事件清除定时器
      if (osTop == 0) {
          clearInterval(timer);
      }
  }, 10);

  }
  return (
    <div className='scroll-top' onClick={toTop}>Top</div>
  )
}

export default Top