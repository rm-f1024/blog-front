'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getArticleList() {
    const sql = "SELECT  DATE_FORMAT(art.addtime,'%Y-%m-%d %H:%i:%s') as addtime1,art.*,ty.type_name FROM "+
   'article as art  join type as ty on art.type_id= ty.id '
    let result=  await this.app.mysql.query(sql)
    this.ctx.body = {data:result};
  }
 /**
  * @author: wenjun
  * @description: 根据Id获取文章的详细
  */
  async getArticleById() {
   let  id =  this.ctx.params.id;
    const sql = "SELECT  DATE_FORMAT(art.addtime,'%Y-%m-%d %H:%i:%s') as addtime1,art.*,ty.type_name FROM "+
   'article as art  join type as ty on art.type_id= ty.id '+
   'where art.id = '+id
   let result=null
   try {
    result =  await this.app.mysql.query(sql)
   } 
   catch (error) {
     //console.log("error====>",error);
     
   }
    this.ctx.body = {data:result};
  }
  //获取文章的全部属性
  async getTypeInfo(){
    const results = await this.app.mysql.select('type')
    this.ctx.body = {data:results}
  }
  //根据id获取文章
  async getArticleListById() {
    let id = this.ctx.params.id
    // //console.log('id===============>',id)
    let result= null
    const sql = "SELECT  DATE_FORMAT(art.addtime,'%Y-%m-%d %H:%i:%s') as addtime1,art.*,ty.type_name FROM \n" +
    'article as art  join type as ty on art.type_id= ty.id '+
    'where ty.id='+id
    try {
       result=  await this.app.mysql.query(sql)
    } catch (error) {
      //console.log(error);
      
    }
    
    this.ctx.body = {data:result};
   }
   //添加阅读量
    async addArticleReadById(){
     let id =  this.ctx.request.body.id
     let read =  this.ctx.request.body.read
     const sql =`update article set article.read = ${read} where id=${id}`
    
     let result = await  this.app.mysql.query(sql)
      if(result.affectedRows==1){
        this.ctx.body={
          data:result
       }
      }
      
    }
    //获取访问者ip
    async  getGuestIp () {
       const ip = this.ctx.request.ip
       //console.log('ip=============>',ip)
              this.ctx.body={
                data:ip
              }
      }

       //获取最火文章列表
     async getArticleHot(){
      const sql =`SELECT * FROM article order by article.read DESC LIMIT 0,5`
      let result = await  this.app.mysql.query(sql)
       if(result.length!==0){
         this.ctx.body={
           data:result
        }
       }
       
     }
         //获取文章全部Id号
         async getArticleId(){
        
          let result= null
        
          try {
             result=  await this.app.mysql.select('article',{
              columns:['id']
             })
          } catch (error) {
            console.log(error);
            
          }
          
          this.ctx.body = {data:result};
           
         }
     

}

module.exports = HomeController;
