import sanitizeValue from '../src/sanitize-value'

describe('sanitize-value.js', () => {

    it('should return null', () => {
        expect(sanitizeValue(null)).toBe(null)
        expect(sanitizeValue([])).toBe(null)
        expect(sanitizeValue({})).toBe(null)
    })

    it('should empty string', () => {
        expect(sanitizeValue()).toBe('')
        expect(sanitizeValue(true)).toBe('')
    })

    it('should string value', () => {
        expect(sanitizeValue('active')).toBe('active')
    })

    it('should numeric value', () => {
        expect(sanitizeValue(10)).toBe(10)
    })

})