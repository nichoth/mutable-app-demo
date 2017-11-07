var Store = require('@nichoth/state')

var CounterStore = Store.extend({
    _state: {
        count: 0
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

module.exports = CounterStore

