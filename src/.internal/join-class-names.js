function joinClassNames(classes, filter) {
    if (classes == null) {
        return ''
    }
    const withFilter = typeof filter === 'function'
    const props = Object.keys(classes)
    const length = props.length

    let index = -1,
        result = ''

    while (++index < length) {
        let prop = props[index],
            value = classes[prop]

        if (value) {
            result += ' ' + (withFilter
                ? filter(prop, value)
                : prop)
        }
    }

    return result
}

export default joinClassNames
