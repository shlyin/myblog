// 博文列表
const actionBlogAll = event => {
    blogAll(function(blogs){
        insertBlogAll(blogs)
    })
}
// 博文基本页面
const actionBlogPage = event => {
    blogPageTemplate()
    actionBlogAll()
}
// 通过日期查找博文
const actionQuery = event => {
    var date = e('#id-search-date').value
    var form = {
        'time': date,
    }
    apiDateQuery(form, function(blogs){
        log('response', blogs)
        insertBlogAll(blogs)
    })
}
// 博文详细页面
const actionBlogDetail = event => {
    var self = event.target
    var f = self.closest('.blog-cell')
    var blogid = f.dataset.id
    blogDetail(blogid, function(blog){
        insertBlogDetail(blog)
        insertComments(blog)
    })
}
// 发表新博文
const actionBlogAdd = event => {
    var self = event.target
    var form = self.closest('.blogcontent-write')
    var title = form.querySelector('#id-input-title').value
    var author = form.querySelector('#id-input-author').value
    var src = form.querySelector('#id-input-src').value
    var md = new Remarkable()
    var html = md.render(src)
    var f = {
        'title': title,
        'author': author,
        'content': html,
    }
    blogNew(f, function(blog) {
        insertBlogDetail(blog)
    })
}
// 删除博文
const actionBlogDelete = function(event) {
    var self = event.target
    var f = self.closest('.blog-cell')
    var blogid = f.dataset.id
    var form = {
        'blogid': blogid,
    }
    blogDelete(form, function(blog){
        f.remove()
    })
}
// 添加评论
const actionCommentAdd = event => {
    var self = event.target
    var form = self.closest('.new-comment')
    var blogid = form.dataset.id
    var author = form.querySelector('.comment-author').value
    var content = form.querySelector('.comment-content').value
    var form = {
        'blogid': blogid,
        'author': author,
        'content': content,
    }
    commentNew(form, function(comment) {
        insertComment(comment)
        var n = e('.comments-number').innerHTML
        e('.comments-number').innerHTML = Number(n) + 1
        e('.comment-author').value = ''
        e('.comment-content').value = ''
    })
}
// 天气数据图表
const actionHeweatherShow = (event) => {
    apiHeweather(function(data){
        e('.heweather-chart').classList.toggle('heweather-show')
        e('.chart-cgci').classList.toggle('heweather-show')
        insertHeweather(data)
    })
}
// 首页欢迎时间
const actionGreeting = () => {
    setInterval(function(){
        insertGreeting()
    }, 1000 / 2)
}

// 绑定点击事件
const bindBlogClickEvents = () => {
    var actions = {
        'blog_page': actionBlogPage,
        'blog_write': insertBlogWrite,
        'blog_search': actionQuery,
        'blog_list': actionBlogAll,
        'blog_detail': actionBlogDetail,
        'blog_new': actionBlogAdd,
        'blog_delete': actionBlogDelete,
        'comment_new': actionCommentAdd,
        'heweather_tag':actionHeweatherShow,
    }
    var b = e('body')
    b.addEventListener('click', function(event){
        var self = event.target
        var actionName = self.dataset.action
        var action = actions[actionName]
        if (action != undefined) {
            action(event)
        }
    })
}
const __main = () => {
    actionGreeting()
    insertTodo()
    insertTodos(todos)
    bindTodoClickEvents()
    bindBlogClickEvents()
}

__main()
