var Router = require('routes')
var Bus = require('nanobus')
var onPathChange = require('route-event')

var routeList = [
    ['/', require('./root')],
    ['/counters', require('./counter-list')]
]

function Routes (onMatch) {
    var router = Router()

    routeList.forEach(function (route) {
        var bus = Bus()
        router.addRoute(route[0], route[1](bus))
    })

    onPathChange(function (path) {
        var match = router.match(path)
        if (!match) return console.log('404')
        var view = match.fn(match)
        onMatch(view)
    })
}

module.exports = Routes

