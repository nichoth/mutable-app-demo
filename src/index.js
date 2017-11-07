var Router = require('./routes')
var { render, h } = require('preact')

var root

Router(function onMatch (view) {
    root = render(
        h('div', {}, [ h(view) ]),
        document.getElementById('content'),
        root
    )
})

