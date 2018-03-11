((
  yCombinator,
  withState,
  memoize,
  bind,
) =>

1

)(
  f => (x => f(y => x(x)(y)))(x => f(y => x(x)(y))),

  f => ({ value, state }) => ({ value: f(value), {} }),

  f => ({ value, state }) => 
    ((key) =>
      key in state ?
        { value: state[key], state: {} }
        :
        (({ valF }) =>
           ({ value: valF, {[key]: valF} })
        )(f(value))
    )(JSON.stringify(value))

  (f, g) => (value, state) => 
    (({ value: valF, state: stateF }) => 
      (({ value: valG, state: stateG }) =>
        ({ value: valG, state: {...stateF, ...stateG} })
      )(g(valF, stateF)) 
    )(f(value, state))
)