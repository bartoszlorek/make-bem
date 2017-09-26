import modifierState from '../src/modifier-state';

describe('modifier-state.js', () => {

    const state = {};
    const setModifier = modifierState(state);

    it('should add modifier', () => {
        setModifier(['active', true], () => {
            expect(state['active']).toBe('');
        })
    })

    it('should call with state as argument', () => {
        let callback = jest.fn();
        setModifier(['disabled', false], callback)
        expect(callback.mock.calls[0]).toEqual([state]);
    })

    it('should NOT add existing modifier', () => {
        let callback = jest.fn();
        setModifier(['active', true], callback)
        expect(callback.mock.calls.length).toBe(0);
    })

})