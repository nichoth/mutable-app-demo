var xtend = require('xtend')

var id = 0
function getId () {
    return id++
}

function Effects (evs, bus, stores) {
    var server = ApiServer()

    // call server to create a new counter
    bus.on(evs.view.addCounter, function (ev) {
        ev.preventDefault()
        console.log('here', ev)

        var _id = getId()
        var counter = Counter()
        var req = {
            cid: _id,
            counter: counter
        }

        bus.emit(evs.http.add.start, req)

        server.addCounter(counter, function (err, res) {
            if (err) return bus.emit(evs.http.add.err, xtend(err, {
                cid: _id
            }))
            bus.emit(evs.http.add.resolve, {
                req: req,
                res: res
            })
        })
    })

    bus.on(evs.view.saveCounter, function (ev) {
        var _id = getId()
        var counter = stores.pending.state()
        var _ev = {
            cid: _id,
            counter: { id: counter.id, count: counter.count }
        }

        bus.emit(evs.http.save.start, _ev)

        server.saveCounter(_ev.counter, function (err, res) {
            if (err) return bus.emit(evs.http.save.err, xtend(err, {
                cid: _id
            }))
            bus.emit(evs.http.save.resolve, {
                req: _ev,
                res: res
            })
        })
    })
}

module.exports = Effects


// --------------------

function ApiServer () {
    return {
        addCounter: function (data, cb) {
            setTimeout(function () {
                cb(null, xtend(data, { id: getId() }))
            }, 1000)
        },

        saveCounter: function (data, cb) {
            setTimeout(function () {
                cb(null, data)
            }, 1000)
        }
    }
}

function Counter () {
    return { count: 0 }
}
