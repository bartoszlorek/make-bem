import modifierValue from '../src/modifier-value';

describe('modifier-value.js', () => {

    it('should return null', () => {
        expect(modifierValue(null)).toBe(null);
        expect(modifierValue([])).toBe(null);
        expect(modifierValue({})).toBe(null);
    })

    it('should empty string', () => {
        expect(modifierValue()).toBe('');
        expect(modifierValue(true)).toBe('');
    })

    it('should string value', () => {
        expect(modifierValue('active')).toBe('active');
    })

    it('should numeric value', () => {
        expect(modifierValue(10)).toBe(10);
    })

})