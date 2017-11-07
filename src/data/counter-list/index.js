var Store = require('@nichoth/state')
var mxtend = require('xtend/mutable')

var CounterList = Store.extend({
    _state: {
        data: {},
        sorted: [],
        hasFetched: false
    },

    get: function (counters) {
        this._state.data = counters.reduce(function (acc, counter) {
            acc[counter.id] = counter
            return acc
        }, {})
        this.state.sorted = counters
        this._state.hasFetched = true
        return this.publish()
    },

    edit: function (counter) {
        this._state.data[counter.id] = mxtend(this._state.data[counter.id],
            counter)
        return this.publish()
    },

    delete: function (id) {
        delete this._state.data[id]
        var i = this._state.sorted.findIndex(counter => counter.id === id)
        this._state.sorted.splice(i, 1)
        return this.publish()
    },

    add: function (counter) {
        this._state.data[counter.id] = counter
        // @TODO you would need to keep things sorted here
        this._state.sorted.push(counter)
        return this.publish()
    }
})

module.exports = CounterList

