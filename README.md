# make-bem
A small library that provides an API for managing BEM classes provided by `css-loader`. Without a `style` guidelines, it is a simple class name generator.

## Initialization
```javascript
makeBem(style, options) // parameters are optional
```
- `style [Object]` selector-identifier pairs provided by `css-loader`
- `options [Object]` characters separating BEM entities, default:

```javascript
{
    prefix: '',
    element: '__',
    modifier: '--',
    value: '--'
}
```

## Query Instance
``` javascript
import makeBem from './make-bem'
import style from './style.css'

const b = makeBem(style)
```

The `makeBem` function returns function that creates new `bem-query` instance.
``` javascript
const instance = b(block, element, modifiers, extras)
```

- `block [String]` name of the block that defines the namespace for its elements
- `element [String]` optional, name of the element inside the block
- `modifiers [Object|String|Number]` optional, modifiers added by constructor
- `extras [Object|String|Number]` optional, additional classes added by constructor

## Methods
### elem
```javascript
.elem(name, modifiers, extras)
```
Returns new `bem-query` instance, being an element of the block. The child element gets the value of the parent element block.
- `name [String]` name of the element inside the block
- `modifiers [Object|String|Number]` optional, modifiers added by constructor
- `extras [Object|String|Number]` optional, additional classes added by constructor

Element inheritance
``` javascript
const list = b('list')                  // list
const item = list.elem('item')          // list__item
const text = item.elem('text')          // list__text
```

### mod
```javascript
.mod(name, name, { name: value, name: predicate }, ...)
```
Adds or changes modifiers and returns the same instance.
- `name [String|Number]` name of the modifier entity
- `value [String|Number]` value assigned to the modifier entity
- `predicate [Boolean]` adds or removes the modifier entity

### extra
```javascript
.extra(name, name, { name: predicate }, ...)
```
Adds or changes additional classes and returns the same instance.
- `name [String|Number]` name of the class entity
- `predicate [Boolean]` adds or removes the class entity

### toString
Returns formatted BEM class as a `String`. **Important!** Some type-checking functions require class as a `String`. Use `toString` method to handle this case. In most scenario, pass `bem-query` instance and let type coercion do the "job".

## Examples
with a `style` guidelines object

``` javascript
import makeBem from './make-bem'
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

const b = makeBem(style)

b('button')                             // _btn
b('button').mod('active')               // _btn _btna

let btn = b('button')
btn.mod('primary', { active: true })    // _btn _btnp _btna
btn.elem('label')                       // _btn_l

b('button', 'label', 'hover')           // _btn_l _btn_lh
```

custom separators (alternative naming scheme) without a `style` guidelines

``` javascript
import makeBem from './make-bem'

const b = makeBem(null, {
    element: '_'
    modifier: '-'
})

b('button')                             // button
b('button').mod('active')               // button button-active

let btn = b('button')
btn.mod('primary', { active: true })    // button button-primary button-active
btn.elem('label')                       // button_label

b('button', 'label', 'hover')           // button_label button__label--hover
```
