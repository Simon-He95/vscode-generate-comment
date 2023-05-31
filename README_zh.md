<p align="center">
<img height="200" src="./assets/kv.png" alt="vscode generate comment">
</p>
<p align="center"> <a href="./README.md">English</a> | 简体中文</p>

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

[请我喝一杯咖啡](https://github.com/Simon-He95/sponsor)

## License

[MIT](./license)
