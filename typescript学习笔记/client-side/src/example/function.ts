//函数类型
// 为函数定义类型
// 完整的函数类型
// 使用接口定义函数类型
// 使用类型别名

// 参数
// 可选参数
// 默认参数
// 剩余参数


// 重载



// function add(arg1: number, arg2: number): number {
//     return arg1 + arg2
// }

// const add = (arg1: number, arg2: number) => arg1 + arg2

interface Foo {
    foo: string
}

function foo(sample: Foo): Foo {
    return sample
}

// 函数重载
function padding(all: number);
function padding(topAndBottom: number, leftAndRight: number);
function padding(top: number, right: number, bottom: number, left: number);
function padding(a: number, b?: number, c?: number, d?: number) {
    if (!b && !c && !d) {
        b = c = d = a
    } else if (!c && !d) {
        c = a;
        d = b
    }
    return {
        top: a,
        right: b,
        bottom: c,
        left: d
    }
}
