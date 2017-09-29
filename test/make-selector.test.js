import makeSelector from '../src/make-selector';

describe('make-selector.js', () => {

    const selector = makeSelector({
        element: '__',
        modifier: '--'
    })

    it('should return empty string', () => {
        expect(selector()).toBe('');
        expect(selector('')).toBe('');
        expect(selector(null)).toBe('');
    })

    it('should return block__element', () => {
        expect(selector('block', 'element'))
            .toBe('block__element');
    })

    it('should return block__element--modifier', () => {
        expect(selector('block', 'element', 'modifier'))
            .toBe('block__element--modifier');
    })

})