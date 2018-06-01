import joinClassNames from '../src/.internal/join-class-names'

it('should return empty string', () => {
    expect(joinClassNames()).toBe('')
    expect(joinClassNames(null)).toBe('')
    expect(joinClassNames([])).toBe('')
})

it('should join object properties that have truthy value', () => {
    let result = joinClassNames({ red: true, '10': true, blue: true })
    expect(result).toBe(' 10 red blue')
})

it('should omit object properties that have falsy value', () => {
    let result = joinClassNames({ red: true, '10': false, blue: true })
    expect(result).toBe(' red blue')
})

it('should handle optional filter', () => {
    const filter = jest.fn((prop, value) => prop + '-' + value)
    let result = joinClassNames({ type: 'static', blue: true }, filter)
    expect(result).toBe(' type-static blue-true')
})
