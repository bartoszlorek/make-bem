import modifierNames from './modifier-names';
import modifierState from './modifier-state';
import selector from './selector';

// BEM methodology pattern:
// block__element--modifier-value

function add(value) {
    return value ? ' ' + value : '';
}

function makeBem(style) {
    if (style == null) {
        throw 'making bem, first argument should be style';
    }
    const construct = (blockName, elementName) => {
        let _block = blockName || '',
            _element = elementName || '',
            _modifiers = [],
            _extra = '';

        const setModifier = modifierState({});

        const self = {
            elem: (name) => {
                return construct(_block, name);
            },
            mod: (name, value) => {
                setModifier(name, value, (state) => {
                    _modifiers = modifierNames(state);
                })
                return self;
            },
            extra: (value) => {
                _extra = value;
                return self;
            },
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
                    ).join(' '))
                }
                result += add(_extra);
                return result;
            }
        }
        return self;
    }
    return construct;
}

export default makeBem;