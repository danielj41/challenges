# existential-proxy

Implement something similar to the [existential operator](https://github.com/tc39/proposal-optional-chaining) with a `Proxy`.

```js
let foo = {
  bar: {
    baz: 'hello'
  }
};

let fooˀ = ˀ(foo);

fooˀ.barˀ.baz // 'hello'
fooˀ.xˀ.baz // undefined

fooˀ.barˀ.test = 10
fooˀ.barˀ.test // 10

fooˀ.xˀ.test = 10
fooˀ.xˀ.test // undefined

fooˀ.barˀ.bazˀ.toUpperCaseˀ() // 'HELLO'
fooˀ.xˀ.bazˀ.toUpperCaseˀ() // undefined
```

