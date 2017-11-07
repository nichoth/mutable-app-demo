var Store = require('@nichoth/state')

var Requests = Store.extend({
    _state: {
        resolving: [],
        errors: [],
        isResolving: false
    },

    start: function (req) {
        this._state.resolving.push(req)
        return this.publish()
    },

    resolve: function (req) {
        var i = this._state.resolving.findIndex(r => r.cid === req.cid)
        this._state.resolving.splice(i, 1)
        return this._state.publish()
    },

    error: function (err) {
        this._state.errors.push(err)
        return this.publish()
    }
})

module.exports = Requests

