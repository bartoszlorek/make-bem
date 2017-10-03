import eachEntry from '../src/each-entry'

describe('each-entry.js', () => {

    it('should ignore callback', () => {
        let callback = jest.fn()
        let { calls } = callback.mock

        eachEntry({}, callback)
        eachEntry(null, callback)

        expect(calls.length).toBe(0)
    })

    it('should handle key[String]-value', () => {
        let callback = jest.fn()
        let { calls } = callback.mock

        eachEntry({
            key: 'active',
            value: true
        }, callback)

        expect(calls[0]).toEqual(['active', true])
    })

    it('should handle key[String] with multiple elements', () => {
        let callback = jest.fn()
        let { calls } = callback.mock

        eachEntry({
            key: 'primary disabled active'
        }, callback)

        expect(calls.length).toBe(3)
        expect(calls[0]).toEqual(['primary'])
        expect(calls[1]).toEqual(['disabled'])
        expect(calls[2]).toEqual(['active'])
    })

    it('should handle key[Object]', () => {
        let callback = jest.fn()
        let { calls } = callback.mock

        eachEntry({
            key: {
                disabled: false,
                active: true,
                primary: 'text'
            }
        }, callback)

        expect(calls.length).toBe(3)
        expect(calls[2]).toEqual(['primary', 'text'])
    })

    it('should handle key[Array]', () => {
        let callback = jest.fn()
        let { calls } = callback.mock

        eachEntry({
            key: [
                'disabled',
                'primary'
            ]
        }, callback);

        expect(calls.length).toBe(2)
        expect(calls[0]).toEqual(['disabled'])
        expect(calls[1]).toEqual(['primary'])
    })

})