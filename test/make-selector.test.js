import makeSelector from '../src/.internal/make-selector'

const selector = makeSelector({
    element: '__',
    modifier: '--',
    value: '--',
    prefix: 'x-'
})

it('should return empty string', () => {
    expect(selector()).toBe('')
    expect(selector('')).toBe('')
    expect(selector(null)).toBe('')
})

it('should return block', () => {
    let result = selector('block')
    expect(result).toBe('x-block')
})

it('should return block with own element', () => {
    let result = selector('block', 'element')
    expect(result).toBe('x-block__element')
})

it('should return block with own modified element', () => {
    let result = selector('block', 'element', 'modifier')
    expect(result).toBe('x-block__element--modifier')
})

it('should return block with own modified element with value', () => {
    let result = selector('block', 'element', 'modifier', 'value')
    expect(result).toBe('x-block__element--modifier--value')
})

it('should accept string and number values', () => {
    expect(selector('b', 'e', 'm', 'value')).toBe('x-b__e--m--value')
    expect(selector('b', 'e', 'm', 10)).toBe('x-b__e--m--10')
})

it('should ignore boolean values', () => {
    expect(selector('b', 'e', 'm', true)).toBe('x-b__e--m')
    expect(selector('b', 'e', 'm', false)).toBe('x-b__e--m')
})
