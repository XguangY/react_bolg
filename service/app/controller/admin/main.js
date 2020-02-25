
'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    // 首页的文章列表数据
    this.ctx.body = 'api 后台';
  }
  // 判断用户名密码是否正确
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
      "' AND password = '" + password + "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: '登录成功', openId };

    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }
  // 后台文章类分类信息
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }

  // 新增文章数据
  async addArticle() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1; // affectedRows 是 result 下属的一个对象
    const insertId = result.insertId;
    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    };
  }

  // 修改文章
  async updateArticle() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1; // affectedRows 是 result 下属的一个对象
    this.ctx.body = {
      isScuccess: insertSuccess,
    };
  }
  // 获得文章列表
  async getArticleList() {

    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.addTime as addTime,' +
      'article.view_count as view_count,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY article.id DESC ';

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };

  }
}

module.exports = MainController;
