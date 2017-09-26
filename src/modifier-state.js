import modifierValue from './modifier-value';
import eachArg from './each-arg';

function modifierState(state) {
    return (args, callback) => {
        let updated = eachArg(args, (name, value) => {
            let result = modifierValue(value);
            if (result !== state[name]) {
                state[name] = result;
                return true;
            }
        })
        if (updated && callback != null) {
            callback(state);
        }
    }
}

export default modifierState;