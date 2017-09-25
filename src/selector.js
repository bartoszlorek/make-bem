function selector(block, element, modifier) {
    let result = block || '';

    if (element) {
        result += '__' + element;
    }
    if (modifier) {
        result += '--' + modifier;
    }
    return result;
}

export default selector;