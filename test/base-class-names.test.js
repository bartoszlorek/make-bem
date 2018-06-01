import baseClassNames from '../src/.internal/base-class-names'

it('should return empty object', () => {
    expect(baseClassNames()).toEqual({})
    expect(baseClassNames(null)).toEqual({})
    expect(baseClassNames([])).toEqual({})
})

it('should pick string, number and object', () => {
    let result = baseClassNames(['red', 10, { blue: true }])
    expect(result).toEqual({ red: true, '10': true, blue: true })
})

it('should omit boolean, array and falsy values', () => {
    let result = baseClassNames([false, true, null, undefined, ['red']])
    expect(result).toEqual({})
})

it('should convert values other than string and number to boolean', () => {
    let result = baseClassNames([{ cols: 4, type: 'radio', big: null }])
    expect(result).toEqual({ cols: 4, type: 'radio', big: false })
})
