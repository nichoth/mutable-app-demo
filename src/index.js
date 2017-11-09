var Router = require('./routes')
var { render, h } = require('preact')

var root

Router(function onMatch (view) {
    root = render(
        h(AppView, { view: view }, []),
        document.getElementById('content'),
        root
    )
})

function AppView (props) {
    var View = props.view
    return <div>
        <div className="navigation">
            this is the navigation
            <nav>
                <li><a href="/">home</a></li>
                <li><a href="/counters">counters</a></li>
            </nav>
        </div>

        <View />
    </div>
}

