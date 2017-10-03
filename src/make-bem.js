import setObjectState from './set-object-state'
import setArrayState from './set-array-state'
import joinState from './join-state'
import makeSelector from './make-selector'
import prefixedJoin from './.utils/prefixed-join'

// chosen BEM methodology scheme:
// block-name__element-name--modifier-name[-value]
// block-name--modifier-name[-value]

export const PROTO_NAME = 'make-bem'

const defaults = {
    element: '__',
    modifier: '--',
    value: '-'
}

function makeBem(style, params) {
    const spec = Object.assign(defaults, params)
    const getSelector = makeSelector(spec)

    const constructor = (blockName, elementName) => {
        let _block = blockName || '',
            _element = elementName || '',
            _modifiersMap = {},
            _modifiers = [],
            _extra = []

        const getEntities = (modifier) => {
            let selector = getSelector(_block, _element, modifier)
            return style != null ? style[selector] : selector
        }
        const self = {
            elem: (name) => {
                return constructor(_block, name)
            },
            mod: (name, value) => {
                let result = setObjectState(_modifiersMap, {
                    key: name,
                    value
                })
                if (_modifiersMap !== result) {
                    _modifiers = joinState(result, spec.value)
                    _modifiersMap = result
                }
                return self
            },
            extra: (name, value) => {
                _extra = setArrayState(_extra, {
                    key: name,
                    value
                })
                return self
            },
            instanceOf: PROTO_NAME,
            toString: () => (getEntities() || '')
                + prefixedJoin(_modifiers.map(getEntities), ' ')
                + prefixedJoin(_extra, ' ')
        }
        return self
    }
    return constructor
}

export default makeBem