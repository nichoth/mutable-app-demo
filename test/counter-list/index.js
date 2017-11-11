var Bus = require('nanobus')
var test = require('tape')
var parse = require('@nichoth/wslog/parse')
var update = require('../../src/routes/counter-list/update')
var Stores = require('../../src/routes/counter-list/stores')
var evs = require('../../src/EVENTS').counterList

function deserialize (ev) {
    return [ev[0], parse.deserialize(ev[1])]
}

test('counter list route', function (t) {
    var bus = Bus()
    var stores = Stores()
    update(evs, bus, stores)

    var states = []
    stores.state(function onChange (state) {
        states.push(JSON.parse(JSON.stringify(state)))
    })

    parse(__dirname + '/log.json', function (err, logs) {
        var evs = logs.event.map(deserialize)
        evs.forEach(function (ev) {
            bus.emit(ev[0], ev[1])
        })
        t.deepEqual(states, logs.state, 'create a counter and add numbers')
        t.end()
    })
})

