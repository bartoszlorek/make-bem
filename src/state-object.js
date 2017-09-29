import sanitizeValue from './sanitize-value';
import eachArg from './each-arg';

function stateObject(state) {
    return (args, callback) => {
        let updated = eachArg(args, (name, value) => {
            let result = sanitizeValue(value);
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

export default stateObject;