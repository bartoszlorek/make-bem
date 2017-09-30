import eachArg from '../src/each-arg';

describe('each-arg.js', () => {

    it('should ignore callback', () => {
        let callback = jest.fn();
        eachArg([], callback);
        expect(callback.mock.calls.length).toBe(0);
    })

    it('should handle string-value', () => {
        let callback = jest.fn();
        eachArg(['active', true], callback);
        expect(callback.mock.calls[0]).toEqual(['active', true]);
    })

    it('should handle string with multiple values', () => {
        let callback = jest.fn();
        eachArg(['primary disabled active'], callback);
        expect(callback.mock.calls.length).toBe(3);
        expect(callback.mock.calls[0]).toEqual(['primary']);
        expect(callback.mock.calls[2]).toEqual(['active']);
    })

    it('should handle object', () => {
        let callback = jest.fn(),
            object = {
                disabled: false,
                active: true,
                primary: 'text'
            }
        eachArg([object], callback);
        expect(callback.mock.calls.length).toBe(3);
        expect(callback.mock.calls[2]).toEqual(['primary', 'text']);
    })

    it('should handle array', () => {
        let callback = jest.fn(),
            array = ['disabled', 'primary'];
        eachArg([array], callback);
        expect(callback.mock.calls.length).toBe(2);
        expect(callback.mock.calls[0]).toEqual(['disabled']);
        expect(callback.mock.calls[1]).toEqual(['primary']);
    })

})