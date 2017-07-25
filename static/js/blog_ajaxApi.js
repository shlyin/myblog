
const blogAll = function(callback) {
    var request = {
        'method': 'GET',
        'url': '/api/blog/all',
        'contentType': 'application/json',
        'callback': function(response) {
            callback(response)
        }
    }
    ajax(request)
}
const blogs = function(date, callback) {
    var request = {
        'method': 'POST',
        'url': '/api/blog/query',
        'data': date,
        'contentType': 'application/json',
        'callback': function(response) {
            callback(response)
        }
    }
    ajax(request)
}
const blogDetail = function(blogid, callback) {
    var request = {
        'method': 'GET',
        'url': `/api/blog/${blogid}`,
        'contentType': 'application/json',
        'callback': function(response) {
            callback(response)
        }
    }
    ajax(request)
}
const blogNew = function(form, callback) {
    var request = {
        'method': 'POST',
        'url': '/api/blog/add',
        'data': form,
        'contentType': 'application/json',
        'callback': function(response) {
            callback(response)
        }
    }
    ajax(request)
}

const commentNew = function(form, callback) {
    var request = {
        'method': 'POST',
        'url': '/api/comment/add',
        'data': form,
        'contentType': 'application/json',
        'callback': function(response) {
            callback(response)
        }
    }
    ajax(request)
}
const blogDelete = function(form, callback) {
    var request = {
        'method': 'POST',
        'url': '/api/blog/delete',
        'data': form,
        'contentType': 'application/json',
        'callback': function(response) {
            callback(response)
        }
    }
    ajax(request)
}
const apiDateQuery = function(form, callback) {
    var request = {
        'method': 'POST',
        'url': '/api/blog/query',
        'data': form,
        'contentType': 'application/json',
        'callback': function(response) {
            callback(response)
        }
    }
    ajax(request)
}
const apiHeweather = function(callback) {
    var request = {
        'method': 'GET',
        'url': '/api/heweather',
        'contentType': 'application/json',
        'callback': function(response) {
            callback(response)
        }
    }
    ajax(request)
}
