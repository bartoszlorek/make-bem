function modifierNames(state) {
    if (state == null) {
        return [];
    }
    let names = Object.keys(state),
        length = names.length,
        resIndex = 0,
        index = -1;

    const result = [];
    while (++index < length) {
        let name = names[index],
            value = state[name];
        if (value !== null) {
            if (value !== '') {
                name += '-' + value;
            }
            result[resIndex++] = name;
        }
    }
    return result;
}

export default modifierNames;