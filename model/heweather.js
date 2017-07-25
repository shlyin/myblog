const log = console.log.bind(console)
const request = require('sync-request')
const fs = require('fs')

const guasync = function(callback) {
    setTimeout(function() {
        callback()
    }, 0)
}

const dataFromUrl = () => {
    var d = new Date()
    var s = d.toLocaleDateString()
    var cacheFile = `db/${s}heweather.json`
    var exists = fs.existsSync(cacheFile)
    if (exists) {
        var data = fs.readFileSync(cacheFile, 'utf-8')
        return data
    } else {
        var url = `https://free-api.heweather.com/v5/forecast?city=kunming&key=bf0624a624174ed2a163e487055eaf0b`
        var r = request('GET', url)
        var body = r.getBody('utf-8')
        fs.writeFileSync(cacheFile, body)
        return body
    }
}

guasync(function () {
    dataFromUrl()
})

module.exports = dataFromUrl
