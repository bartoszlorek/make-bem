import stateArray from '../src/state-array';

describe('state-array.js', () => {

    const initial = [];
    const setState = stateArray(initial);

    it('should add modifier', () => {
        setState(['active', true], (state) => {
            expect(state[0]).toBe('active');
        })
    })

    it('should call with state as argument', () => {
        let callback = jest.fn();
        setState(['disabled', true], callback)
        expect(callback.mock.calls[0]).toEqual([initial]);
    })

    it('should NOT add existing modifier', () => {
        let callback = jest.fn();
        setState(['active', true], callback)
        expect(callback.mock.calls.length).toBe(0);
    })

})