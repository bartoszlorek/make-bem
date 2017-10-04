import { isPlainObject } from 'lodash'

function arrayEach(array, parent, func, iteratee) {
    let length = array.length,
        index = -1

    while (++index < length) {
        if (func(iteratee, array[index], index, parent) === false) {
            return false
        }
    }
}

function objectEach(object, parent, func, iteratee) {
    let props = Object.keys(object),
        length = props.length,
        index = -1

    while (length--) {
        let key = props[++index]
        if (func(iteratee, object[key], key, parent) === false) {
            return false
        }
    }
}

function baseEach(iteratee, value, key, parent) {
    if (Array.isArray(value)) {
        return arrayEach(value, key, baseEach, iteratee)
    }
    if (isPlainObject(value)) {
        return objectEach(value, key, baseEach, iteratee)
    }
    return iteratee(value, key, parent)
}

function deepEach(value, iteratee) {
    if (value == null) {
        return null
    }
    if (iteratee == null) {
        return value
    }
    baseEach(iteratee, value)
    return value
}

export default deepEach