var Store = require('@nichoth/state')

var Requests = Store.extend({
    _state: {
        resolving: [],
        errors: [],
        isResolving: false
    },

    start: function (req) {
        this._state.resolving.push(req)
        this._state.isResolving = !!this._state.resolving.length
        return this.publish()
    },

    resolve: function (req) {
        var i = this._state.resolving.findIndex(r => r.cid === req.cid)
        this._state.resolving.splice(i, 1)
        this._state.isResolving = !!this._state.resolving.length
        return this.publish()
    },

    error: function (err) {
        this._state.errors.push(err)
        this._state.resolving = this._state.resolving.filter(function (r) {
            return r.cid !== err.cid
        })
        this._state.isResolving = !!this._state.resolving.length
        return this.publish()
    }
})

module.exports = Requests

