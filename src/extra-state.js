import eachArg from './each-arg';

function extraState(state) {
    return (args, callback) => {
        let updated = eachArg(args, (name, value) => {
            if (value === undefined) {
                value = true;
            }
            let index = state.indexOf(name);
            if (index < 0) {
                if (value) {
                    state.push(name);
                    return true;
                }
            } else if (!value) {
                state.splice(index, 1);
                return true;
            }
        })
        if (updated && callback != null) {
            callback(state);
        }
    }
}

export default extraState;