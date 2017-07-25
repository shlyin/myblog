const log = console.log.bind(console)
const fs = require('fs')
const blogFilePath = 'db/blog.json'

// 用来存储 comment 数据
const ModelComment = function(form) {
    this.author = form.author || ''
    this.content = form.content || ''
    this.blogid = Number(form.blogid || 0)
    this.createdtime = Math.floor(new Date() / 1000)
    this.commentid = Math.floor(new Date() / 1000)
}
// 用来存储 Blog 数据
const ModelBlog = function(form) {
    this.title = form.title || ''
    this.author = form.author || ''
    this.content = form.content || ''
    this.createdtime = Math.floor(new Date() / 1000)
    this.blogid = Math.floor(new Date() / 1000)
    this.comments = []
}

const loadBlogs = function() {
    var content = fs.readFileSync(blogFilePath, 'utf8')
    var blogs = JSON.parse(content)
    return blogs
}

//  b 博文数据及方法
const b = {
    data: loadBlogs()
}

b.blogAll = function() {
    return this.data
}
b.query = function(form) {
    var time = form.time
    var blogs = this.data
    var dateBlogs = []
    for (var i = 0; i < blogs.length; i++) {
        var blog = blogs[i]
        var createdtime = new Date(blog.createdtime * 1000)
        var y = createdtime.getFullYear()
        var m = String(createdtime.getMonth() + 1)
        var d = createdtime.getDate()
        if (m.length < 2) {
            m = '0' + m
        }
        var blogtime = `${y}-${m}-${d}`
        if (blogtime == time) {
            dateBlogs.push(blog)
        }
    }
    return dateBlogs
}
b.blogDetail = function(blogid) {
    var blogs = this.data
    for(var i = 0; i < blogs.length; i++){
        var blog = blogs[i]
        if(blog.blogid == blogid) {
            return blog
        }
    }
    return {}
}
b.blogNew = function(form) {
    var m = new ModelBlog(form)
    this.data.push(m)
    this.blogSave()
    return m
}

b.blogDelete = function(id) {
    var blogs = this.data
    var found = false
    for (var i = 0; i < blogs.length; i++) {
        var blog = blogs[i]
        if (blog.blogid == id) {
            found = true
            break
        }
    }
    var del = blogs.splice(i, 1)[0]
    this.blogSave()
    return del
}


b.commentNew = function(form) {
    var blogid = form.blogid
    var blogs = this.data
    var found = false
    for (var i = 0; i < blogs.length; i++) {
        var blog = blogs[i]
        if (blog.blogid == blogid) {
            found = true
            break
        }
    }
    var m = new ModelBlog(form)
    blogs[i].comments.push(m)
    this.blogSave()
    return m
}

b.blogSave = function() {
    var s = JSON.stringify(this.data, null, 2)
    fs.writeFile(blogFilePath, s, (err) => {
    })
}

// 导出
module.exports = b
