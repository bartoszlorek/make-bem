import { isPlainObject } from 'lodash'

function arrayMap(array, parent, func, iteratee) {
    let length = array.length,
        index = -1,
        result = []

    while (++index < length) {
        result[index] = func(iteratee, array[index], index, parent)
    }
    return result
}

function objectMap(object, parent, func, iteratee) {
    let props = Object.keys(object),
        length = props.length,
        index = -1,
        result = {}

    while (length--) {
        let key = props[++index]
        result[key] = func(iteratee, object[key], key, parent)
    }
    return result
}

function baseMap(iteratee, value, key, parent) {
    if (Array.isArray(value)) {
        return arrayMap(value, key, baseMap, iteratee)
    }
    if (isPlainObject(value)) {
        return objectMap(value, key, baseMap, iteratee)
    }
    return iteratee(value, key, parent)
}

function deepMap(value, iteratee) {
    if (value == null) {
        return null
    }
    if (iteratee == null) {
        return value
    }
    return baseMap(iteratee, value)
}

export default deepMap