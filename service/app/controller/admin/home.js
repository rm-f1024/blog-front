'use strict'
const Controller = require('egg').Controller
class MainController extends Controller {
  async index() {
    this.ctx.body = 'hello'
  }
  async checkLogin() {
    let userName = this.ctx.request.body.userName;
    let password = this.ctx.request.body.password;
    const sql = `select user_name from admin_user where user_name='${userName}' and password='${password}'`
    //console.log('sql=============>',sql)
    let result = null
    try {
      result = await this.app.mysql.query(sql)
    } catch (error) {
      //console.log(error);

    }
    //console.log('result=============>', result)
    if (result.length > 0) {
      let openId = +new Date()
      this.ctx.cookies.set('openId', openId, {
        maxAge: 30 * 60 * 1000,
        overwrite: true,
      });
      this.ctx.session.openId = openId

      this.ctx.body = {
        'data': '登录成功',
        'openId': openId,
        'result': result,
        'this.ctx.session.openId': this.ctx.session.openId
      }
    } else {
      this.ctx.body = {
        'data': '登录失败'
      }
    }

  }
  async type() {
    let type = null
    try {
      type = await this.app.mysql.select('type')
    } catch (error) {
      //console.log(error);
    }
    this.ctx.body = {
      'data': type
    }
  }
  //增加文章
  async addArticle() {
    let result = null
    const requestBody = this.ctx.request.body
    //console.log('requestBody=============>',requestBody)
    try {
      result = await this.app.mysql.insert('article', requestBody)
    } catch (error) {
      //console.log(error);
    }
    //console.log('result=============>',result)
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'data': '暂存文章成功',
        'insertId': result.insertId
      }
    }
  }
  //获取发布了的文章列表
  async getArticle() {
    let sql = `SELECT * from article WHERE article.publish=1`
    let result = null
    try {
      result = await this.app.mysql.query(sql)
    } catch (error) {
      //console.log(error);
    }
    if (result != null) {
      this.ctx.body = {
        'data': result
      }
    }
  }
  //获取未发布和发布的文章
  async getAllArticle() {
    let sql = `SELECT * from article `
    let result = null
    try {
      result = await this.app.mysql.query(sql)
    } catch (error) {
      //console.log(error);
    }
    if (result != null) {
      this.ctx.body = {
        'data': result
      }
    }
  }

  async updateArticle() {
    let body = this.ctx.request.body
    let result = null;
    try {
      result = await this.app.mysql.update('article', body)
    } catch (error) {
      //console.log(error);
    }
    //console.log('result=============>',result)
    if (result.affectedRows === 1) {
      this.ctx.body = {
        'data': '更新成功'
      }
    }
  }
  async publishArticle() {
    let requestBody = this.ctx.request.body
    let result = null;
    try {
      result = await this.app.mysql.update('article', requestBody)
    } catch (error) {
      //console.log(error);
    }
    if (result.affectedRows === 1) {
      this.ctx.body = {
        data: '发布成功'
      }
    }
  }
  //根据id获取文章
  async getArticleById() {
    const { article_id } = this.ctx.params
    let result = null
    try {
      result = await this.app.mysql.select('article', { where: { id: article_id } })
    } catch (error) {
      //console.log(error);
    }
    if (result.length !== 0) {
      this.ctx.body = {
        'data': result
      }
    }
    else {
      this.ctx.body = {
        'data': '404'
      }
    }
  }
  //删除文章
  async deleteArticle() {
    //请求url为/:id
    const id = this.ctx.params.id
    //  //console.log('id===============>',id)
    let result = null;
    try {
      result = await this.app.mysql.delete('article', { id: id })
    } catch (error) {
      //console.log(error);

    }
    //console.log('result===============>',result)
    if (result.affectedRows == 1) {
      this.ctx.body = {
        data: '删除成功'
      }
    }

  }

}

module.exports = MainController