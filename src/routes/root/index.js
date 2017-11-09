var h = require('preact').h

function HomeRoute (bus) {
    return function onMatch (params) {
        return RootView
    }
}

function RootView (props) {
    return <div>
        <h1>root</h1>
        <p>this is the root view</p>
    </div>
}

module.exports = HomeRoute

