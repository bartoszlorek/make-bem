# make-bem

Small library which provides an API managing BEM-like classes from `style-loader`. Without `style` guidelines, it's simple class generator.

## Initialization

```
makeBem(style, separators)
```

- `style [Object]` contained CSS classes injected by `style-loader`
- `separators [Object]` with delimiters joining BEM entities, default:
```
{
    element: '__',
    modifier: '--',
    value: '-'
}
```

### Example

``` javascript
import makeBem from './make-bem.min'
import style from './style.css'

const bem = makeBem(style)
```

## Methods

`makeBem` returns function that create new `bem-query` objects with methods:

**.elem()** returns new instance, being an `element` of a given `block`

```javascript
elem(name)    // [String]
```

**.mod()** adds modifier and returns the same instance

```javascript
.mod(name)                              // [String]
.mod(name, value)                       // [String|Number] value
.mod(name, predicate)                   // [Boolean] predicate
.mod([name, name, name])                // [Array]
.mod({name: value, name: predicate})    // [Object]
```

**.extra()** adds additional classes and returns the same instance

```javascript
.extra(name)                  // [String]
.extra(name, predicate)       // [Boolean] predicate
.extra([name, name, name])    // [Array]
.extra({name: predicate})     // [Object]
```

**.toString()** returns formatted BEM-like classes

Important! Some type-checking functions require class name as a `String`. Use this method to handle this case. In most scenario, pass `bem-query` instance and let type coercion do the "job".

## Usage

with `style`

``` javascript
import makeBem from './make-bem.min'
import style from './style.css'

/*
style = {
    'button': '_btn',
    'button--active': '_btna',
    'button--primary': '_btnp',
    'button__label': '_btn_l',
    'button__label--hover': '_btn_lh'
}
*/

const bem = makeBem(style)

bem('button')                     // '_btn'
bem('button').mod('active')       // '_btn _btna'

let btn = bem('button')
btn.mod(['active', 'primary'])    // '_btn _btna _btnp'
btn.elem('label')                 // '_btn_l'

bem('button', 'label')            // '_btn_l'
```

without `style`, but with custom `separators`

``` javascript
import makeBem from './make-bem.min'

const bem = makeBem(null, {
    element: '_'
    modifier: '-'
})

bem('button')                     // 'button'
bem('button').mod('active')       // 'button button-active'

let btn = bem('button')
btn.mod(['active', 'primary'])    // 'button button-active button-primary'
btn.elem('label')                 // 'button_label'

bem('button', 'label')            // 'button_label'
```
