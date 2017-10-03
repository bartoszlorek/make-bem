import setObjectState from '../src/set-object-state'

describe('set-object-state.js', () => {

    it('should add new entry', () => {
        let state = {},
            result = setObjectState(state, {
                key: 'active',
                value: true
            })
        expect(result).toEqual({ active: '' })
        expect(result).not.toBe(state)
    })

    it('should NOT add existing entry', () => {
        let state = { disabled: '' },
            result = setObjectState(state, {
                key: 'disabled',
                value: true
            })
        expect(result).toEqual({ disabled: '' })
        expect(result).toBe(state)
    })

})