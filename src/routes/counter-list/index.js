var connect = require('@nichoth/preact-connect')
var CounterListView = require('../../view/counter-list')
var Store = require('@nichoth/state')
var CountersStore = require('../../data/counter-list')
var RequestsStore = require('../../data/requests')
var evs = require('../../EVENTS').counterList
var Effects = require('./effects')
var Update = require('./update')

var PendingEdits = Store.extend({
    _state: {
        id: null,
        count: null
    },

    add: function (counter) {
        this._state.id = counter.id
        this._state.count = counter.count
        return this.publish()
    },

    clear: function () {
        this._state.id = null
        this._state.count = null
        return this.publish()
    },

    inc: function () {
        this._state.count++
        return this.publish()
    },

    dec: function () {
        this._state.count--
        return this.publish()
    }
})

function CounterListRoute (bus) {
    var stores = Store.Merge({
        counters: CountersStore(),
        pending: PendingEdits(),
        http: RequestsStore()
    })

    if (process.env.NODE_ENV === 'development') {
        bus.on('*', console.log.bind(console, 'event::'))

        stores.state(function onChange (state) {
            console.log('state~~', JSON.parse(JSON.stringify(state)))
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
