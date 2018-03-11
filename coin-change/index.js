console.log(((
  yComb,
  lift,
  withState,
  memoize,
  bind,
  run,
) =>
    ((
      coinChange,
    ) =>
      
      run({}, bind(
        withState(() => ({ total: 100, coins: [22, 14, 7, 5, 1] })),
        coinChange,
      ))

    )(
      yComb(coinChange =>
        memoize(
          ({state, value: { total, coins }}) => total === 0 ? lift([]) :

            ((
              findBest
            ) =>


                findBest({
                  state,
                  value: {
                    loopCoins: coins.filter(coinAmount => coinAmount <= total),
                    best: null
                  }
                })


            )(
              yComb(findBest => ({state, value: { loopCoins, best }}) => loopCoins.length === 0 ? lift(best) :
                run(state,
                  bind(
                    withState(() => ({ total: total - loopCoins[0], coins })),
                  bind(
                    coinChange,
                  bind(
                    withState((cur) => ({
                      loopCoins: loopCoins.slice(1),
                      best: best === null || (cur !== null && cur.length + 1 < best.length) ?
                              [loopCoins[0], ...cur]
                            :
                              best
                    })),
                    findBest
                  )))
                )
              )
            )



        )
      )
    )
  

)(
  f => (x => f(y => x(x)(y)))(x => f(y => x(x)(y))),

  value => ({ value, state: {} }),

  f => ({ value, state }) => ({ value: f(value), state: {} }),

  f => ({ value, state }) =>
    (key =>
      key in state ?
        { value: state[key], state: {} }
        :
        (({ value: valF, state }) =>
           ({ value: valF, state: {[key]: valF, ...state} })
        )(f({ value, state} ))
    )(JSON.stringify(value)),

  (f, g) => ({ value, state }) => 
    (({ value: valF, state: stateF }) =>
      (({ value: valG, state: stateG }) => 
        ({ value: valG, state: {...state, ...stateF, ...stateG} })
      )(g({ value: valF, state: { ...state, ...stateF } })) 
    )(f({ value, state })),

  (initial, fn) => fn({ value: null, state: initial }),
))
