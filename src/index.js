import stateArray from './state-array';
import stateObject from './state-object';
import joinState from './join-state';
import makeSelector from './make-selector';

// BEM methodology pattern:
// block-name__element-name--modifier-value

function add(value) {
    if (value != null && value.length) {
        return ' ' + value.join(' ');
    }
    return '';
}

function makeBem(style, spec = {}) {
    if (style == null) {
        throw 'making bem, first argument should be style';
    }
    const separator = {
        element: spec.element || '__',
        modifier: spec.modifier || '--',
        value: spec.value || '-'
    }

    const construct = (blockName, elementName) => {
        let _block = blockName || '',
            _element = elementName || '',
            _modifiers = [],
            _extra = [];

        const setModifier = stateObject({});
        const setExtra = stateArray(_extra);
        const selector = makeSelector(separator);

        const self = {
            elem: (name) => {
                return construct(_block, name);
            },
            mod: (...args) => {
                setModifier(args, (state) => {
                    _modifiers = joinState(
                        state,
                        separator.value
                    )
                })
                return self;
            },
            extra: (...args) => {
                setExtra(args);
                return self;
            },
            instanceOf: 'BEM',
            toString: () => {
                let result = style[selector(
                    _block,
                    _element
                )] || '';

                if (_modifiers.length > 0) {
                    result += add(_modifiers.map(
                        name => style[selector(
                            _block,
                            _element,
                            name
                        )]
                    ))
                }
                if (_extra.length > 0) {
                    result += add(_extra);
                }
                return result;
            }
        }
        return self;
    }
    return construct;
}

export default makeBem;
