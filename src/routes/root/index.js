var h = require('preact').h

function HomeRoute (bus) {
    return function onMatch (params) {
        return RootView
    }
}

function RootView (props) {
    return <div>
        <h1>root</h1>
    </div>
}

module.exports = HomeRoute

