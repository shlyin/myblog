const log = console.log.bind(console)
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const blog = require('./model/blog')
const heweather = require('./model/heweather')
app.use(bodyParser.json())
app.use(express.static('static'))


const sendJSON = function(response, data) {
    var r = JSON.stringify(data, null, 2)
    response.send(r)
}
const sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    var path = 'template/' + path
    fs.readFile(path, options, function(err, data){
        response.send(data)
    })
}


// 天气图表路由
app.get('/api/heweather', function(request, response) {
    var city = 'kunming'
    var b = heweather(city)
    log('b', b)
    sendJSON(response, b)
})

// blog 路由
app.get('/', function(request, response) {
    var path = 'blog_index.html'
    sendHtml(path, response)
})
// 所有博文
app.get('/api/blog/all', function(request, response) {
    var path = 'blog_index.html'
    var blogs = blog.blogAll()
    sendJSON(response, blogs)
})
// 通过日期查询博文
app.post('/api/blog/query', function(request, response){
    var form = request.body
    var b = blog.query(form)
    sendJSON(response, b)
})
// 博文详细页面
app.get('/api/blog/:blogid', function(request, response) {
    var blogid = Number(request.params.blogid)
    var b = blog.blogDetail(blogid)
    sendJSON(response, b)
})
// 新增博文
app.post('/api/blog/add', function(request, response){
    var form = request.body
    var b = blog.blogNew(form)
    sendJSON(response, b)
})
// 删除博文
app.post('/api/blog/delete', function(request, response){
    var form = request.body
    var success = blog.blogDelete(form.blogid)
    var result = {
        success: success,
    }
    sendJSON(response, result)
})
// 新增评论
app.post('/api/comment/add', function(request, response){
    var form = request.body
    var b = blog.commentNew(form)
    sendJSON(response, b)
})


const server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log(`应用实例，访问地址为 http://${host}:${port}`)
})
