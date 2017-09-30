function prefixedJoin(array, separator = ',') {
    if (array != null && array.length) {
        return separator + array.join(separator);
    }
    return '';
}

export default prefixedJoin;