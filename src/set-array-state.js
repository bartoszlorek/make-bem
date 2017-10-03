import eachEntry from './each-entry'

function setArrayState(state = [], entry) {
    let nextState = [...state],
        differences = 0

    eachEntry(entry, (name, value) => {
        if (value === undefined) {
            value = true
        }
        let index = nextState.indexOf(name)
        if (index < 0) {
            if (value) {
                nextState.push(name)
                differences += 1
                return
            }
        } else if (!value) {
            nextState.splice(index, 1)
            differences += 1
            return
        }
    })

    return differences > 0 ? nextState : state
}

export default setArrayState