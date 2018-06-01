import makeBem from '../src/index'

describe('without style', () => {
    const b = makeBem()

    it('should return clean block', () => {
        expect(b('btn').toString()).toBe('btn')
    })

    it('should return own element', () => {
        const label = b('btn').elem('label')
        expect(label.toString()).toBe('btn__label')
    })

    it('should handle modifiers and extras', () => {
        const btn = b('btn')
            .mod('red', { big: true })
            .extra('good', { add: true })
        expect(btn.toString()).toBe('btn btn--red btn--big good add')
    })

    it('should handle modifiers value', () => {
        const btn = b('btn').mod({ big: true, type: 'submit' })
        expect(btn.toString()).toBe('btn btn--big btn--type--submit')
    })
})

describe('with hashed style', () => {
    // prettier-ignore
    const b = makeBem({
        'button': '_btn1',
        'button--active': '_btna',
        'button--primary': '_btnp',
        'button__label': '_btn_l',
        'button__label--hover': '_btn_lh'
    })

    it('should return hashed block', () => {
        expect(b('button').toString()).toBe('_btn1')
    })

    it('should return clean block', () => {
        expect(b('undefined').toString()).toBe('undefined')
    })

    it('should return own element', () => {
        const label = b('button').elem('label')
        expect(label.toString()).toBe('_btn_l')
    })

    it('should handle modifiers', () => {
        const btn = b('button').mod('primary', { active: true })
        expect(btn.toString()).toBe('_btn1 _btnp _btna')
    })

    it("should handle own element's modifiers and extras", () => {
        const label = b('button').elem('label', { hover: true }, 'good')
        expect(label.toString()).toBe('_btn_l _btn_lh good')
    })
})

describe('with custom delimiters', () => {
    const b = makeBem(null, {
        prefix: 'x-',
        element: '_',
        modifier: '-',
        value: '---'
    })

    it('should return own element', () => {
        const label = b('button').elem('label')
        expect(label.toString()).toBe('x-button_label')
    })

    it('should handle modifiers', () => {
        const btn = b('button').mod('primary', { active: true, type: 'submit' })
        expect(btn.toString()).toBe('x-button x-button-primary x-button-active x-button-type---submit')
    })
})
