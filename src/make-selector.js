function makeSelector({ element, modifier }) {
    return (blockName, elemName, modName) => {
        let result = blockName || '';

        if (elemName) {
            result += element + elemName;
        }
        if (modName) {
            result += modifier + modName;
        }
        return result;
    }
}

export default makeSelector;