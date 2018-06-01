function makeSelector(spec) {
    return (block, element, modifier, value) => {
        let result = ''

        if (block) {
            result += block
        }
        if (element) {
            result += spec.element + element
        }
        if (modifier) {
            result += spec.modifier + modifier
            if (value && value !== true) {
                result += spec.value + value
            }
        }
        if (result && spec.prefix) {
            result = spec.prefix + result
        }

        return result
    }
}

export default makeSelector
