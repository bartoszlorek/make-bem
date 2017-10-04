function instanceToString(value, proto) {
    if (value != null && value.instanceOf === proto) {
        return value.toString()
    }
    return value
}

export default instanceToString