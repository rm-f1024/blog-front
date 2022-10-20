'use strict';

const Controller = require('egg').Controller;
const fs = require('fs')

const dirName = 'app/imgUrl/'
class HomeController extends Controller {
  async getArticleList() {
    const sql = "SELECT  DATE_FORMAT(art.addtime,'%Y-%m-%d %H:%i:%s') as addtime1,art.*,ty.type_name FROM " +
      'article as art  join type as ty on art.type_id= ty.id '
    let result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result };
  }
  /**
   * @author: wenjun
   * @description: 根据Id获取文章的详细
   */
  async getArticleById() {
    let id = this.ctx.params.id;
    const sql = "SELECT  DATE_FORMAT(art.addtime,'%Y-%m-%d %H:%i:%s') as addtime1,art.*,ty.type_name FROM " +
      'article as art  join type as ty on art.type_id= ty.id ' +
      'where art.id = ' + id
    let result = null
    try {
      result = await this.app.mysql.query(sql)
    }
    catch (error) {
      //console.log("error====>",error);

    }
    this.ctx.body = { data: result };
  }
  //获取文章的全部属性
  async getTypeInfo() {
    const results = await this.app.mysql.select('type')
    this.ctx.body = { data: results }
  }
  //根据id获取文章
  async getArticleListById() {
    let id = this.ctx.params.id
    // //console.log('id===============>',id)
    let result = null
    const sql = "SELECT  DATE_FORMAT(art.addtime,'%Y-%m-%d %H:%i:%s') as addtime1,art.*,ty.type_name FROM \n" +
      'article as art  join type as ty on art.type_id= ty.id ' +
      'where ty.id=' + id
    try {
      result = await this.app.mysql.query(sql)
    } catch (error) {
      //console.log(error);
    }
    this.ctx.body = { data: result };
  }
  //添加阅读量
  async addArticleReadById() {
    let id = this.ctx.request.body.id
    let read = this.ctx.request.body.read
    const sql = `update article set article.read = ${read} where id=${id}`
    let result = await this.app.mysql.query(sql)
    if (result.affectedRows == 1) {
      this.ctx.body = {
        data: result
      }
    }
  }
  //获取访问者ip
  async getGuestIp() {
    const ip = this.ctx.request.ip
    //console.log('ip=============>',ip)
    this.ctx.body = {
      data: ip
    }
  }
  //获取最火文章列表
  async getArticleHot() {
    const sql = `SELECT * FROM article order by article.read DESC LIMIT 0,5`
    let result = await this.app.mysql.query(sql)
    if (result.length !== 0) {
      this.ctx.body = {
        data: result
      }
    }

  }
  //获取文章全部Id号
  async getArticleId() {
    let result = null
    try {
      result = await this.app.mysql.select('article', {
        columns: ['id']
      })
    } catch (error) {
      console.log(error);
    }
    this.ctx.body = { data: result };
  
  }
  //添加一条评论
  async addComment() {
    let result = null
    const requestBody = this.ctx.request.body
    let files = fs.readdirSync(dirName)
    let avatar =  '/'+ files[Math.floor( Math.random()*files.length)]
    requestBody.avatar=avatar
    try {
      result = await this.app.mysql.insert('comment', requestBody)
    } catch (error) {
      console.log(error);
    }
    if (result.affectedRows == 1) {
      this.ctx.body={
        data:{msg:'评论成功',
        avatarPath:avatar
        }
      }
    }else{
      this.ctx.body={
        data:{msg:'评论失败'},
        avatarPath:null
      }
    }

  }
  //获取某文章的全部评论
  async getAllCommentsByArticleId() {
    let result = null,reply=null
    const  id = this.ctx.params.id
    console.log('id=============>',id)
    
    try {
      result = await this.app.mysql.select('comment',{
        where:{articleId:id,replyId:null}
      })
      reply = await this.app.mysql.query(`select c1.id,
      c1.nickname,
      c1.email,
      c1.appendTime,
      c1.comment,
      c1.avatar,
      c1.articleId,
      c1.replyId
      FROM comment  c1 ,comment c2 WHERE c1.replyId=c2.id and c1.articleId=${id}
       `)
    } catch (error) {
      console.log(error);
    }
    console.log('result=============>',result)

    for(let i=0;i<reply.length;i++ ){
      for(let j = 0 ;j<result.length;j++){
       if(result[j]['id']===reply[i]['replyId']){
          if(!result[j]['replyMsg']){
            result[j]['replyMsg']=[]
          }
          result[j]['replyMsg'].push(reply[i])
       }

      }
   
      
    }
    this.ctx.body = { data: result ,reply};
  }
  //根据id获取一个头像
  async getRandomAvatar() {
    const avatarPath = this.ctx.params.path
    const img = fs.readFileSync(dirName + avatarPath)
    this.ctx.set('content-type', 'image/jpeg')
    this.ctx.body = img;
  }
}
module.exports = HomeController;
