import deepEach from '../../src/.utils/deep-each'

describe('deep-each.js', () => {

    const addTwo = (value, key, ancestor) => {
        return value + 2
    }

    it('should return input', () => {
        let none = () => { },
            object = { a: 'A' },
            array = ['A']

        expect(deepEach('A', none)).toBe('A')
        expect(deepEach(object, none)).toBe(object)
        expect(deepEach(array, none)).toBe(array)
        expect(deepEach(null, none)).toBe(null)
    })

    it('should break multidimensional array', () => {
        let iteratee = jest.fn((value, key) => {
            if (value === 'D') {
                return false
            }
        })
        deepEach(['A', ['B', 'C', ['D']], 'E'], iteratee)

        let { calls } = iteratee.mock
        expect(calls.length).toBe(4)
        expect(calls[0]).toEqual(['A', 0, undefined])
        expect(calls[1]).toEqual(['B', 0, 1])
        expect(calls[3]).toEqual(['D', 0, 2])
    })

    it('should break multidimensional object', () => {
        let iteratee = jest.fn((value, key) => {
            if (value === 'D') {
                return false
            }
        })
        deepEach({
            a: 'A',
            b: ['B', 'C', {
                d: 'D'
            }],
            e: 'E'
        }, iteratee)

        let { calls } = iteratee.mock
        expect(calls.length).toBe(4)
        expect(calls[0]).toEqual(['A', 'a', undefined])
        expect(calls[1]).toEqual(['B', 0, 'b'])
        expect(calls[3]).toEqual(['D', 'd', 2])
    })

})