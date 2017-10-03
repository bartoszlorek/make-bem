import { PROTO_NAME } from './make-bem'

function eachArray(array, callback) {
    let length = array.length,
        index = -1

    while (++index < length) {
        let item = array[index]
        if (typeof item === 'string') {
            callback(item)
        }
    }
}

function eachObject(object, callback) {
    let keys = Object.keys(object),
        length = keys.length,
        index = -1

    while (++index < length) {
        let prop = keys[index]
        callback(prop, object[prop])
    }
}

function eachEntry(entry, callback) {
    let key = entry != null && entry.key
    if (!key) {
        return;
    }
    if (key.instanceOf === PROTO_NAME) {
        key = key.toString()
    }
    let type = typeof key
    if (type === 'string') {
        return key.indexOf(' ') < 0
            ? callback(key, entry.value)
            : eachArray(key.split(' '), callback)
    }
    if (Array.isArray(key)) {
        return eachArray(key, callback)
    }
    if (type === 'object') {
        return eachObject(key, callback)
    }
}

export default eachEntry