import { protoName } from './index';

function baseArray(array, callback) {
    let length = array.length,
        index = -1,
        result;

    while (++index < length) {
        let item = array[index];
        if (typeof item === 'string') {
            result = callback(item);
        }
    }
    return result;
}

function baseObject(object, callback) {
    let keys = Object.keys(object),
        length = keys.length,
        index = -1,
        result;

    while (++index < length) {
        let prop = keys[index];
        result = callback(prop, object[prop]);
    }
    return result;
}

function eachArg(args, callback) {
    let data = args[0];
    if (data == null) {
        return;
    }
    if (data.instanceOf === protoName) {
        data = data.toString();
    }
    let dataType = typeof data;
    if (dataType === 'string') {
        return data.indexOf(' ') < 0
            ? callback(data, args[1])
            : baseArray(data.split(' '), callback);
    }
    if (Array.isArray(data)) {
        return baseArray(data, callback);
    }
    if (dataType === 'object') {
        return baseObject(data, callback);
    }
}

export default eachArg;