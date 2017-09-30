import stateObject from './state-object';
import stateArray from './state-array';
import joinState from './join-state';
import makeSelector from './make-selector';
import prefixedJoin from './.utils/prefixed-join';

// chosen BEM methodology scheme:
// block-name__element-name--modifier-name[-value]
// block-name--modifier-name[-value]

export const protoName = 'MAKE_BEM';
export const defaults = {
    element: '__',
    modifier: '--',
    value: '-'
}

function makeBem(style, params) {
    const spec = Object.assign(defaults, params);
    const getSelector = makeSelector(spec);

    const constructor = (blockName, elementName) => {
        let _block = blockName || '',
            _element = elementName || '',
            _modifiers = [],
            _extra = [];

        const setModifier = stateObject({});
        const setExtra = stateArray(_extra);
        const getEntities = (modifier) => {
            let selector = getSelector(_block, _element, modifier);
            return style != null ? style[selector] : selector;
        }

        const self = {
            elem: (name) => {
                return constructor(_block, name);
            },
            mod: (...args) => {
                setModifier(args, (state) =>
                    _modifiers = joinState(state, spec.value));
                return self;
            },
            extra: (...args) => {
                setExtra(args);
                return self;
            },
            instanceOf: protoName,
            toString: () => (getEntities() || '')
                + prefixedJoin(_modifiers.map(getEntities), ' ')
                + prefixedJoin(_extra, ' ')
        }
        return self;
    }
    return constructor;
}

export default makeBem;