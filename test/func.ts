// 这是一个很重要的实现方式！！！
const func = new Function(`a`, `b`, `console.log('hello world', a+b)`)
func(1, 2)

