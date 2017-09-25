import modifierNames from '../src/modifier-names';

describe('modifier-names.js', () => {

    it('should return empty array', () => {
        expect(modifierNames()).toEqual([]);
        expect(modifierNames({})).toEqual([]);
    })

    it('should combine modifier names with values', () => {
        let modifiers = {
            active: '',
            disabled: null,
            error: 'high'
        }
        expect(modifierNames(modifiers)).toEqual([
            'active',
            'error-high'
        ]);
    })

})