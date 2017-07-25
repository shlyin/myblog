const log = console.log.bind(console)
const e = sel => document.querySelector(sel)
const ajax = request => {
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function(event) {
        if(r.readyState === 4) {
            var response = JSON.parse(r.response)
            request.callback(response)
        }
    }
    request.data = JSON.stringify(request.data, null, 2)
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}
