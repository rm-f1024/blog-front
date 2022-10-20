/*
 * @Description: 
 * @Author: kang
 * @Date: 2022-04-11 13:28:15
 */



export let ipUrl = null; //接口
if(process.env.NEXT_PUBLIC_DOMAIN_ENV?.trim()==="production"){
    ipUrl="http://localhost/api/default"
    //生产环境接口地址
    // ipUrl="http://106.52.41.19:2000/api/default"
}else {
    //开发以及测试环境接口地址(我这里开发环境和测试环境是一样的接口)
    ipUrl="http://localhost:7001/api/default"
}

let servicePath ={
    getArticleList:ipUrl+'/getArticleList',//获取全部文章列表
    getArticleById:ipUrl+'/getArticleById',//通过Id获取文章详情,
    getTypeInfo:ipUrl+'/getTypeInfo',//获取文章类型
    getArticleListById:ipUrl+'/getArticleListById',//通过Id获取文章列表,
    addArticleReadById:ipUrl+'/addArticleReadById',
    getArticleHot:ipUrl+'/getArticleHot',//
    getArticleId:ipUrl+'/getArticleId',//
    getAllCommentsByArticleId:ipUrl+'/getAllCommentsByArticleId',//
    getRandomAvatar:ipUrl+'/getRandomAvatar',
    addComment:ipUrl+'/addComment'
}
export default servicePath;

    