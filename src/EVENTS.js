var namespace = require('@nichoth/event-utils')

var ASYNC = ['start', 'resolve', 'err']

module.exports = namespace({
    counterList: {
        http: {
            add: ASYNC,
            save: ASYNC
        },
        view: ['addCounter', 'saveCounter', 'inc', 'dec', 'reset']
    }
})

