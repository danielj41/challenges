# compose

Write `compose` in C.

Sample `compose` in js:

```js
function compose(f, g) {
  return function(x) {
    return f(g(x))
  }
}
```
