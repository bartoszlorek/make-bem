// the default naming scheme is Two Dashes style
// block-name__elem-name--mod-name--mod-val

import objectAssign from 'object-assign'
import baseClassNames from './.internal/base-class-names'
import joinClassNames from './.internal/join-class-names'
import makeSelector from './.internal/make-selector'

const defaults = {
    prefix: '',
    element: '__',
    modifier: '--',
    value: '--'
}

function makeBem(style, options) {
    const spec = objectAssign({}, defaults, options)
    const getSelector = makeSelector(spec)

    const constructor = (block, element, modifiers, extras) => {
        let _block = block || '',
            _element = element || '',
            _modifiers = {},
            _extras = {}

        const getEntity = (modifier, value) => {
            let selector = getSelector(_block, _element, modifier, value)
            return style != null ? style[selector] || selector : selector
        }

        const self = {
            elem: (name, modifiers, extras) => {
                return constructor(_block, name, modifiers, extras)
            },
            mod: (...args) => {
                _modifiers = objectAssign({}, _modifiers, baseClassNames(args))
                return self
            },
            extra: (...args) => {
                _extras = objectAssign({}, _extras, baseClassNames(args))
                return self
            },
            toString: () => {
                return (
                    getEntity() +
                    joinClassNames(_modifiers, getEntity) +
                    joinClassNames(_extras)
                )
            }
        }

        if (modifiers != null) {
            self.mod(modifiers)
        }
        if (extras != null) {
            self.extra(extras)
        }
        return self
    }

    return constructor
}

export default makeBem
