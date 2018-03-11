# challenges

Sometimes I convince myself to write convoluted code for fun.

* [coin-change](#coin-change)
* [compose](#compose)
* [readme](#readme)
## coin-change

Solve the [change-making problem](https://en.wikipedia.org/wiki/Change-making_problem) with js.

Requirements:

 * Use only one js statement
 * No mutation
 * Implement a memoized recursive solution
## compose

Write a generic `compose` in C.

Sample `compose` in js:

```js
function compose(f, g) {
  return function(x) {
    return f(g(x))
  }
}
```
## readme

Create a bash script that generates a `README.md` for the root of this repo.

Requirements:

* Concatenate the `README.md`s from the subdirectories.
* Convert `h1`s to `h2`s, `h2`s to `h3`s, and so on.
* Include an intro and table of contents.
* Script should be a one-liner with no subshells.
* Overuse regex and make the script fragile af.
