function Update (evs, bus, stores) {
    // requests
    bus.on(evs.http.add.start, function (req) {
        stores.http.start(req)
    })

    bus.on(evs.http.add.resolve, function (ev) {
        stores.http.resolve(ev.req)
        stores.counters.add(ev.res)
    })

    bus.on(evs.http.save.start, function (req) {
        stores.http.start(req)
    })

    bus.on(evs.http.save.resolve, function (ev) {
        console.log('here', ev)
        stores.pending.clear()
        stores.counters.edit(ev.res)
        stores.http.resolve(ev.req)
    })

    // view
    bus.on(evs.view.inc, function (ev) {
        if (stores.pending.state().id !== ev.id) stores.pending.add(ev)
        stores.pending.inc()
    })

    bus.on(evs.view.dec, function (ev) {
        if (stores.pending.state().id !== ev.id) stores.pending.add(ev)
        stores.pending.dec()
    })

    bus.on(evs.view.reset, function (ev) {
        stores.pending.clear()
    })
}

module.exports = Update
