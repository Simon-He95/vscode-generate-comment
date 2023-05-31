<p align="center">
<img height="200" src="./assets/kv.png" alt="vscode generate comment">
</p>
<p align="center"> English | <a href="./README_zh.md">简体中文</a></p>

## Before:
```
function minus(a: number, b: number) {
  return a - b
}
```

## After:
```
/* vscode-generate-comment */
/**
 * Subtracts two numbers.
 * @param {number} a The first number.
 * @param {number} b The second number.
 * @returns {number} The difference of a and b.
 */
function minus(a: number, b: number) {
  return a - b
}
```

## :coffee:

[buy me a cup of coffee](https://github.com/Simon-He95/sponsor)

## License

[MIT](./license)
