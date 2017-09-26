function baseArray(array, callback) {
    let length = array.length,
        index = -1,
        result;

    while (++index < length) {
        result = callback(array[index], true);
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
    let name = args[0];
    if (name == null) {
        return;
    }
    if (name.instanceOf === 'BEM') {
        name = '' + name;
    }
    let nameType = typeof name;
    if (nameType === 'string') {
        return name.indexOf(' ') > -1
            ? baseArray(name.split(' '), callback)
            : callback(name, args[1]);
    }
    if (Array.isArray(name)) {
        return baseArray(name, callback);
    }
    if (nameType === 'object') {
        return baseObject(name, callback);
    }
}

export default eachArg;