console.log(
  ((
    Y,
    lift,
    bind,
    memoize,
  ) =>
    (coinChange =>

      // main
      bind(
        lift({ total: 100, coins: [22, 7, 5, 1] }),
        coinChange
      )({})

    )(

      // coinChange
      Y(coinChange => memoize(({ total, coins }) =>
        total === 0
          ? lift([])
          : (findBest =>

              bind(
                lift({
                  loopCoins: coins.filter(coinAmount => coinAmount <= total),
                  best: null,
                }),
                findBest,
              )

            )(

              // findBest
              Y(findBest => ({ loopCoins, best }) =>
                loopCoins.length === 0
                  ? lift(best)
                  : bind(
                    bind(
                    bind(
                      lift({ total: total - loopCoins[0], coins }),
                      coinChange
                    ),
                      cur =>
                        lift({
                          loopCoins: loopCoins.slice(1),
                          best:
                            best === null ||
                            (cur !== null && cur.length + 1 < best.length)
                              ? [loopCoins[0], ...cur]
                              : best
                        })
                    ),
                      findBest
                    ))))))
  )(

    // Y (combinator)
    f => (x => f(y => x(x)(y)))(x => f(y => x(x)(y))),

    // lift
    value => state => [value, {}],

    // bind
    (a, b) => state =>
      (([valueA, stateA]) =>
        (([valueB, stateB]) =>
          [valueB, { ...state, ...stateA, ...stateB }]
        )(b(valueA)({ ...state, ...stateA })
      ))(a(state)),

    // memoize
    f => value => state =>
      (key =>
        key in state
          ? [state[key], {}]
          : (([valueF, stateF]) =>
              [valueF, { [key]: valueF, ...stateF }]
            )(f(value)(state))
      )(JSON.stringify(value))
  )
);
