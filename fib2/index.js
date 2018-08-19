
const bound = gen => memo => {
    let it = gen();
    let done, value, result, stateMonad;

    while (true) {
        ({ done, value } = it.next(result));

        if (done) {
            return [value, memo];
        } else {
            stateMonad = value;
        }

        [result, memo] = stateMonad(memo);
    }
}

console.log(((
    Y,
    unit,
    bind,
    memoize,
) => 
    // fib
    Y(fib => memoize(x =>
        x === 0 ? unit(0) :
        x === 1 ? unit(1) :
        bound(function *() {
            return (yield fib(x - 1)) + (yield fib(x - 2));
        })
    ))
)(
    // Y
    f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v))),
    // unit
    x => memo => [x, memo],
    // bind
    (s, f) => memo =>
        (([result1, memo1]) =>
            f(result1)(memo1)
        )(s(memo)),
    // memoize
    f => x => memo =>
        x in memo
        ? [memo[x], memo]
        : (([result, memo1]) => [
            result,
            {
                ...memo1,
                [x]: result
            }
        ])(f(x)(memo)),
)(100)({}))