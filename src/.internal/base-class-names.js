// based on classnames by Jed Watson
// http://jedwatson.github.io/classnames

function classValue(value) {
    let type = typeof value
    if (type === 'string' || type === 'number') {
        return value
    }
    return !!value
}

function baseClassNames(props) {
    let index = -1
    const length = props == null ? 0 : props.length
    const result = {}

    while (++index < length) {
        let prop = props[index]
        if (!prop) {
            continue
        }

        let type = typeof prop
        if (type === 'string' || type === 'number') {
            result[prop] = true

        } else if (type === 'object' && !Array.isArray(prop)) {
            for (let key in prop) {
                if (Object.hasOwnProperty.call(prop, key)) {
                    result[key] = classValue(prop[key])
                }
            }
        }
    }

    return result
}

export default baseClassNames
