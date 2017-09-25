import makeBem from '../src/index';

describe('make-bem.js', () => {

    const style = {
        'button': '_30_bc',
        'button--active': '_21Q2a',
        'button--primary': '_305tL',
        'button__label': '_1LjQQ',
        'button__label--hover': '_3pnpX'
    }
    const bem = makeBem(style);

    it('should handle multiple modifiers', () => {
        let button = bem('button')
            .mod('hover', false)
            .mod('active');
        expect(button.toString())
            .toBe('_30_bc _21Q2a');
    })

})