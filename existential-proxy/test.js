const ˀ = require('./index')

function assert(value, expected) {
  console.log(value === expected ? '✅' : '❌', value, expected);
}

const foo = {
  bar: {
    baz: null,
    abc: 'hi'
  },
  a: {
    b: {
      c: {
        d: () => 'hello'
      }
    }
  },
  num: {
    val: 100
  }
};

const fooˀ = ˀ(foo);

assert(fooˀ.barˀ.baz, null);
assert(fooˀ.barˀ.bazˀ.too, undefined);
assert(fooˀ.barˀ.abc, 'hi');
assert(fooˀ.barˀ.abcˀ.length, 2);
assert(fooˀ.barˀ.defˀ.length, undefined);

assert(fooˀ.aˀ.bˀ.cˀ.dˀ(), 'hello');
assert(fooˀ.aˀ.bˀ.cˀ.dˀ.eˀ(), undefined);
assert(fooˀ.aˀ.cˀ.dˀ(), undefined);

assert(fooˀ.numˀ.val, 100);
assert(fooˀ.numˀ.valˀ.toStringˀ(), "100");
assert(fooˀ.numˀ.numˀ.val, undefined);
assert(fooˀ.numˀ.numˀ.valˀ.toStringˀ(), undefined);

fooˀ.barˀ.def = 'hey';
assert(fooˀ.barˀ.def, 'hey');

fooˀ.barˀ.bazˀ.def = 'hey';
assert(fooˀ.barˀ.bazˀ.def, undefined);
