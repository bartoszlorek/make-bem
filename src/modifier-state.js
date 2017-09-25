import modifierValue from './modifier-value';

function modifierState(state) {
    return (name, value, callback) => {
        let result = modifierValue(value);
        if (result !== state[name]) {
            state[name] = result;
            callback(state, result, name);
        }
    }
}

export default modifierState;