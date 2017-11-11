var Wslog = require('@nichoth/wslog/client')
var connect = require('@nichoth/preact-connect')
var CounterListView = require('../../view/counter-list')
var Store = require('@nichoth/state')
var evs = require('../../EVENTS').counterList
var Effects = require('./effects')
var Update = require('./update')
var Stores = require('./stores')

function CounterListRoute (bus) {
    var stores = Stores()

    if (process.env.NODE_ENV === 'development') {
        var wslog = Wslog()

        bus.on('*', function (evName, data) {
            console.log('event::', evName, data)
            wslog.event([evName, Wslog.serialize(data)])
        })

        stores.state(function onChange (state) {
            console.log('state~~', JSON.parse(JSON.stringify(state)))
            wslog.state(state)
        })

    }

    Effects(evs, bus, stores)
    Update(evs, bus, stores)

    var _view = connect.observe(bus, CounterListView)
    return function onMatch (params) {
        return connect.subscribe(stores.state, _view)
    }
}

module.exports = CounterListRoute
