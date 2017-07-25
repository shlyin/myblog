
const blogPageTemplate = () => {
    var t = `
        <div class="blogpage">
            <div class="blogpage-side-cgci"></div>
            <div class="blogpage-side">
                <p class="blog-write blog-side" data-action="blog_write">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    写日志
                </p>
                <p class="blog-list blog-side" data-action="blog_list">
                    <i class="fa fa-clipboard"></i>
                    日志列表
                </p>
                <div class="blog-search">
                    <input id="id-search-date" type="date" name="" value="">
                    <i class="fa fa-search blog-search blog-side" aria-hidden="true" data-action="blog_search"></i>
                </div>
            </div>
            <div class="blogpage-main-cgci"></div>
            <div class="blogpage-main">
            </div>
        </div>
    `
    e('#id-div-mainpage').innerHTML = t
}
const insertBlogWrite = () => {
    var t = `
        <div class="blogcontent-write">
            <label class="write-title">
                <input id='id-input-title' type="text" placeholder="标题..." value="">
            </label>
            <br>
            <label class="write-author">
                <input id='id-input-author' type="text" placeholder="作者..." value="">
            </label>
            <br>
            <div class="editor">
                <textarea id="id-input-src" wrap="physical" placeholder="Markdown 语法输入..." value=""></textarea>
            </div>
            <button id='id-button-submit' class="blog-new" data-action="blog_new">发表新博文</button>
        </div>
    `
    e('.blogpage-main').innerHTML = t
}

const blogTemplate = (blog) => {
    var id = blog.blogid
    var title = blog.title
    var author = blog.author
    var d = new Date(blog.createdtime * 1000)
    var time = d.toLocaleString()
    var number = blog.comments.length
    var t = `
    <div class="blog-cell"  data-id="${id}">
        <p class="blog-cell-title">
            <span class="blog-detail" data-action="blog_detail">
                <i class="fa fa-file-text" aria-hidden="true"></i>
                ${title}
            </span>
            <i class="fa fa-trash blog-delete" aria-hidden="true" data-action="blog_delete"></i>
        </p>
        <p class="blog-cell-other">
            <span>文/${author}</span>
            <span>更新于 ${time}</span>
            <span>评论(${number})</span>
        </p>
    </div>
    `
    e('.blogpage-main').insertAdjacentHTML('beforeEnd', t)
}
const insertBlogAll = (blogs) => {
    e('.blogpage-main').innerHTML = ''
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        blogTemplate(b)
    }
}

const insertBlogDetail = (blog) => {
    var id = blog.blogid
    var title = blog.title
    var author = blog.author
    var d = new Date(blog.createdtime * 1000)
    var time = d.toLocaleString()
    var content = blog.content
    var number = blog.comments.length
    var t = `
    <div class="blogdetail-cell" data-id="${id}">
        <h3 class="blog-title">
            ${title}
        </h3>
        <div class="title-other">
            <span>作者：${author}</span> 更新于 <span>${time}</span>
        </div>
        <hr class="blog-content-hr">
        <div class="blog-content">
            ${content}
        </div>
        <hr class="blog-content-hr">
        <div class="blog-comments">
            <i class="fa fa-commenting" aria-hidden="true"></i>
            评论(<span class="comments-number">${number}</span>条)
        </div>
        <hr class="blog-content-hr">
        <div class='new-comment' data-id="${id}">
            <input class='comment-author' type="text" value="" placeholder="你的姓名...">
            <br>
            <textarea class='comment-content' placeholder="你想说的话..."></textarea>
            <br>
            <button class='comment-add' data-action="comment_new">发表评论</button>
        </div>
    </div>
    `
    e('.blogpage-main').innerHTML = t
}
const insertComment = (comment) => {
    var blogid = comment.blogid
    var id = comment.id
    var author = comment.author
    var content = comment.content
    var d = new Date(comment.createdtime * 1000)
    var time = d.toLocaleString()
    var t = `
        <div class="comment-cell" data-blogid="${blogid}" data-id="${id}">
            <p class="comment-time">
                <span class="commenter">${author}</span> 更新于 ${time}
            </p>
            <p class="comment">${content}</p>
        </div>
    `
    e('.blog-comments').insertAdjacentHTML('beforeEnd', t)
}
const insertComments = (blog) => {
    var comments = blog.comments
    for (var i = 0; i < comments.length; i++) {
        var comment = comments[i]
        insertComment(comment)
    }
}

const setChart = (date, max, min) => {
    var c = e('.heweather-chart')
    var myChart = echarts.init(c)
    var option = {
        title: {
            text: '昆明：三天内气温变化',
            subtext: '和风天气',
            textStyle: {
                color: 'black'
            },
            subtextStyle: {
                color: 'black'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['最高气温','最低气温'],
            textStyle: {
                color: '#fff'
            },
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            },
            iconStyle: {
                normal: {
                    color: 'grey'
                }
            },
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: date,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff'
                },
            },
            axisLine:{
                lineStyle:{
                    color:'#fff'
                },
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C',
                textStyle: {
                    color: '#fff'
                }
            },
            axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            },
            max: 40,
            min: -20,
            splitNumber: 8,
        },
        series: [
            {
                name:'最高气温',
                type:'line',
                data: max,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'最低气温',
                type:'line',
                data: min,
                markPoint: {
                    data: [
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'},
                        [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        }, {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    position: 'start',
                                    formatter: '最大值'
                                }
                            },
                            type: 'max',
                            name: '最高点'
                        }]
                    ]
                }
            }
        ]
    }
    myChart.setOption(option)
}
const insertHeweather = (data) => {
    var p = JSON.parse(data)
    var obj = p.HeWeather5[0]
    var daily = obj.daily_forecast
    var date = []
    var max = []
    var min = []
    for (var i = 0; i < daily.length; i++) {
        var day = daily[i]
        date.push(day.date)
        var m1 = Number(day.tmp.max)
        max.push(m1)
        var m2 = Number(day.tmp.min)
        min.push(m2)
    }
    setChart(date, max, min)
}
const checkTime = (i) => {
    if (i < 10) {
        i = "0" + i
    }
    return i
}
const nowGreeting = (h) => {
    var g = ''
    if (h >= 0 && h < 6) {
        g = '凌晨了'
    }
    if (h >= 6 && h < 12) {
        g = '上午好'
    }
    if (h >= 12 && h < 19) {
        g = '下午好'
    }
    if (h >= 19 && h < 24) {
        g = '晚上好'
    }
    return g
}
const insertGreeting = () => {
    var d = new Date()
    var date = d.toLocaleTimeString()
    var h = d.getHours()
    h = Number(h)
    var greeting = nowGreeting(h)
    var t = `
        <p class="greeting-date">${date}</p>
        <p class="greeting">shylin, ${greeting}</p>
    `
    e('.greeting').innerHTML = t
}
const insertTodo = () => {
    var t = `
        <p class="todo-question">你现在的任务是什么？</p>
        <div class="todo-form">
            <span id='id-span-todo' contenteditable='true' placeholder="todo..."></span>
            <i id='id-span-add' class="fa fa-plus-circle" aria-hidden="true" data-action="todo_add" title="新增todo"></i>
        </div>
        <div id="id-div-container">
        </div>
    `
    e('.todo').insertAdjacentHTML('beforeEnd', t)
}
