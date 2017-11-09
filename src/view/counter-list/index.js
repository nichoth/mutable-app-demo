var { h } = require('preact')
var evs = require('../../EVENTS').counterList.view

function CounterListView (props) {
    console.log('props', props)

    return <div className="counter-list">
        <h1>counter list</h1>

        {props.http.isResolving ?
            <div className="loading">Loading</div> :
            null
        }

        <p>
            {props.counters.sorted.length + ' ' +
                (props.counters.sorted.length === 1 ? 'counter' : 'counters')
            }
        </p>

        <form onSubmit={props.emit(evs.addCounter)}>
            <button type="submit" disabled={props.http.isResolving}>
                add counter
            </button>
        </form>

        <ul>
            {props.counters.sorted.map(function (counter, i) {
                return <li key={i}>
                    <Counter {...counter}
                        pending={props.pending}
                        onPlus={props.emit(evs.inc).bind(null, counter)}
                        onMinus={props.emit(evs.dec).bind(null, counter)}
                        onReset={props.emit(evs.reset)}
                        onSave={props.emit(evs.saveCounter)}
                    />
                </li>
            })}
        </ul>
    </div>
}

function Counter (props) {
    var isEditing = props.pending.id === props.id

    return <div className="counter">
        <span>count: {props.pending.id === props.id ?
            props.pending.count : props.count}</span>
        <button onClick={props.onPlus}>plus</button>
        <button onClick={props.onMinus}>minus</button>
        <button onClick={props.onReset} disabled={!isEditing}>reset</button>
        <button onClick={props.onSave} disabled={!isEditing}>save</button>
    </div>
}

module.exports = CounterListView

