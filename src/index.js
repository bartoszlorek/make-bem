import modifierNames from './modifier-names';
import modifierState from './modifier-state';
import extraState from './extra-state';
import selector from './selector';

// BEM methodology pattern:
// block__element--modifier-value

function add(value) {
    if (value != null && value.length) {
        return ' ' + value.join(' ');
    }
    return '';
}

function makeBem(style) {
    if (style == null) {
        throw 'making bem, first argument should be style';
    }
    const construct = (blockName, elementName) => {
        let _block = blockName || '',
            _element = elementName || '',
            _modifiers = [],
            _extra = [];

        // modifiers need additional value
        // check inside private variable
        const setModifier = modifierState({});
        const setExtra = extraState(_extra);

        const self = {
            elem: (name) => {
                return construct(_block, name);
            },
            mod: (...args) => {
                setModifier(args, (state) => {
                    _modifiers = modifierNames(state);
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
