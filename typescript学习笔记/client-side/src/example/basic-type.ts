// 布尔类型

// let bool:boolean = false;

let bool: boolean

// bool = 123

let num: number = 123
// num = 'abc'
num = 0b1111011
num = undefined

// 字符串类型

let str: string

str = 'abc'

str = `数值是${str}`

console.log(str)


// 数组类型

let arr: number[]

// arr = [1,'0002']

let arr2: Array<number>

let arr3: (string | number)[]

// 元组类型

let tuple: [string, number, boolean]

tuple = ['a', 123, false]

// 枚举类型

enum Rolese {
    SUPER_ADMIN,
    ADMIN,
    USER
}
console.log(Rolese.SUPER_ADMIN)

// any 类型

let value: any;

const arr4: any[] = [1, 'a']

// void 类型

const consoleText = (text: string): void => {
    console.log(text)
}
let v: void
v = undefined
v = null
consoleText("123")

// null 和undefined 

let u: undefined


// never 类型

const errorFunc = (message: string): never => {
    throw new Error(message)
}

// 类型断言

const getLength = (target: string | number): number => {
    if ((<string>target).length || (target as string).length === 0) {
        return (target as string).length;
    } else {
        return target.toString().length
    }
}

getLength(123)
enum Color { Red, Green, Blue = "blue".length };
// const enum Color {Red, Green, Blue = "blue".length};



let size = Symbol('size');
class Collection {
    constructor() {
        this[size] = 0
    }
    add(item) {
        this[this[size]] = item;
        this[size]++;
    }
    static sizeOf(instance) {
        return instance[size];
    }
}


