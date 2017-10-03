import setArrayState from '../src/set-array-state'

describe('set-array-state.js', () => {

    it('should add new entry', () => {
        let state = [],
            result = setArrayState(state, {
                key: 'active',
                value: true
            })
        expect(result).toEqual(['active'])
        expect(result).not.toBe(state)
    })

    it('should NOT add existing entry', () => {
        let state = ['disabled'],
            result = setArrayState(state, {
                key: 'disabled',
                value: true
            })
        expect(result).toEqual(['disabled'])
        expect(result).toBe(state)
    })

})