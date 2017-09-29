import stateObject from '../src/state-object';

describe('state-object.js', () => {

    const initial = {};
    const setState = stateObject(initial);

    it('should add new item', () => {
        setState(['active', true], (state) => {
            expect(state['active']).toBe('');
        })
    })

    it('should call with state as argument', () => {
        let callback = jest.fn();
        setState(['disabled', false], callback)
        expect(callback.mock.calls[0]).toEqual([initial]);
    })

    it('should NOT add existing item', () => {
        let callback = jest.fn();
        setState(['active', true], callback)
        expect(callback.mock.calls.length).toBe(0);
    })

})