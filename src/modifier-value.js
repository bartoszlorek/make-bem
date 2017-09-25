function modifierValue(value) {
    if (value === undefined ||
        value === true) {
        return '';
    }
    let type = typeof value;
    if (type === 'string' ||
        type === 'number') {
        return value;
    }
    return null;
}

export default modifierValue;