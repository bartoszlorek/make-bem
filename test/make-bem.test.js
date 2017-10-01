import makeBem from '../src/make-bem';

describe('make-bem.js', () => {

    const style = {
        'button': '_btn1',
        'button--active': '_btna',
        'button--primary': '_btnp',
        'button__label': '_btn_l',
        'button__label--hover': '_btn_lh'
    }
    const bem = makeBem(style);

    it('should handle multiple modifiers', () => {
        let button = bem('button')
            .mod('hover', false)
            .mod('active');
        expect(button.toString())
            .toBe('_btn1 _btna');
    })

})