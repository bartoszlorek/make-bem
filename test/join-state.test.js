import joinState from '../src/join-state';

describe('join-state.js', () => {

    let state = {
        theme: 'dark',
        active: '',
        disabled: null
    }

    it('should return empty array', () => {
        expect(joinState()).toEqual([]);
        expect(joinState(null)).toEqual([]);
        expect(joinState({})).toEqual([]);
        expect(joinState([])).toEqual([]);
    })

    it('should join keys with values', () => {
        expect(joinState(state)).toEqual([
            'theme-dark',
            'active'
        ])
    })

})