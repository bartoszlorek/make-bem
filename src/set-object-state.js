import sanitizeValue from './sanitize-value'
import eachEntry from './each-entry'

function setObjectState(state = {}, entry) {
    let nextState = Object.assign({}, state),
        differences = 0

    eachEntry(entry, (name, value) => {
        let result = sanitizeValue(value)
        if (result !== nextState[name]) {
            nextState[name] = result
            differences += 1
            return
        }
    })

    return differences > 0 ? nextState : state
}

export default setObjectState;