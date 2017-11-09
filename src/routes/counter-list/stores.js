var Store = require('@nichoth/state')
var CountersStore = require('../../data/counter-list')
var RequestsStore = require('../../data/requests')

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

function counterListStores () {
    var stores = Store.Merge({
        counters: CountersStore(),
        pending: PendingEdits(),
        http: RequestsStore()
    })

    return stores
}

module.exports = counterListStores
