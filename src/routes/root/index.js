function HomeRoute (bus) {
    return function onMatch (params) {
        console.log('root', params)
    }
}

module.exports = HomeRoute

