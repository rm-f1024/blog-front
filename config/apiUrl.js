


let ipUrl = null; //接口
if(process.env.APP_ENV?.trim()==="dev"){
    //开发以及测试环境接口地址(我这里开发环境和测试环境是一样的接口)
    ipUrl="http://localhost:7777/api/default"
    console.log('开发环境=============>',)
}else if(process.env.APP_ENV?.trim()==="pro") {
      //生产环境接口地址
    ipUrl="http://106.52.41.19/api/default"  
    console.log('生成环境=============>',)
}
    

let servicePath ={
    getArticleList:ipUrl+'/getArticleList',//获取全部文章列表
    getArticleById:ipUrl+'/getArticleById',//通过Id获取文章详情,
    getTypeInfo:ipUrl+'/getTypeInfo',//获取文章类型
    getArticleListById:ipUrl+'/getArticleListById',//通过Id获取文章列表,
    addArticleReadById:ipUrl+'/addArticleReadById',
    getArticleHot:ipUrl+'/getArticleHot',//
    getArticleId:ipUrl+'/getArticleId'//
}
export default servicePath
