var namespace = require('@nichoth/event-utils')

module.exports = namespace({
    counterList: {
        view: ['addCounter']
    },

    counter: {
        view: ['inc', 'dec']
    }
})

