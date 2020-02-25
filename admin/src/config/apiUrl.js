
const ipUrl = 'http://127.0.0.1:7001/admin/'

const servicePath = {
    checkLogin : ipUrl + 'checkLogin', //  校验用户名密码
    getTypeInfo : ipUrl + 'getTypeInfo', // 获取文章类型
    addArticle : ipUrl + 'addArticle', // 添加文章
    updateArticle : ipUrl + 'updateArticle', // 修该文章
    getArticleList : ipUrl + 'getArticleList', // 修该文章
    delArticle: ipUrl + 'delArticle/', // 删除文章
    getArticleById: ipUrl + 'getArticleById/' // 编辑文章
}

export default servicePath
