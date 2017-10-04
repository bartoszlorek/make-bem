import deepMap from '../../src/.utils/deep-map'

describe('deep-map.js', () => {

    const addTwo = (value, key, ancestor) => {
        return value + 2
    }

    it('should return base data', () => {
        expect(deepMap()).toBe(null)
        expect(deepMap(null)).toBe(null)
        expect(deepMap([])).toEqual([])
        expect(deepMap({})).toEqual({})
    })

    it('should handle plain value', () => {
        expect(deepMap('Jake', addTwo)).toBe('Jake2')
        expect(deepMap(2, addTwo)).toBe(4)
    })

    it('should iterate multidimensional array', () => {
        let result = deepMap([
            'dog',
            ['fish', 'shark'],
            'cat'
        ], addTwo)

        expect(result[0]).toBe('dog2')
        expect(result[1][1]).toBe('shark2')
        expect(result[2]).toBe('cat2')
    })

    it('should iterate multidimensional object', () => {
        let result = deepMap({
            dog: 'Jake',
            fish: ['Goldie', 'Sunny'],
            cat: 'Kitty'
        }, addTwo)

        expect(result.dog).toBe('Jake2')
        expect(result.fish[1]).toBe('Sunny2')
        expect(result.cat).toBe('Kitty2')
    })

})