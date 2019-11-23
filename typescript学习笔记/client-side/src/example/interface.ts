//  基本用法



interface NameInfo {
    firstName: string,
    lastName: string
}

const getFullName = ({ firstName, lastName }: NameInfo) => {
    return `${firstName}${lastName}`
}
getFullName({
    firstName: 'pan',
    lastName: '123',
})




// 函数类型
interface AddFunc {
    (num1: number, num2: number): number
}


const add: AddFunc = (N1, N2) => 123

// 可选属性
interface Vegetable {
    color?: string,
    type: string,
}
// 多余属性检查  绕开多余属性检查
// interface Vegetable {
//     color?: string,
//     type: string,
//     [prop: string]: any
// }
const getVegetables = ({ color, type }: Vegetable) => {
    return `A${color ? (color + '') : ''}${type}`
}
// getVegetables({
//     type: '123',
//     color: 'red',
//     size: 2
// } as Vegetable)
const vegetableInfo = {
    type: '123',
    color: 'red',
    size: 2
}
getVegetables(vegetableInfo)



interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label)
}

let myObj = { size: 10, label: "sieze 10 object" };
printLabel(myObj)

// 只读属性
interface Point {
    readonly x: number;
    readonly y: number
}

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

// declare const myPoint: { x: number; y: number };
interface P {
    x: number;
    y: number;
}

declare const myPoint: P;

// 索引类型
interface RoleDic {
    // [id: number]: string
    [id: string]: string
}

const role: RoleDic = {
    // 123: '123'
    'a': '213',
    1: 'admin' //会将数字类型转换为字符串
}

// 继承接口
interface Vegetables {
    color: string
}
interface Tomato extends Vegetables {
    radius: number
}
interface Carrot extends Vegetable {
    length: number
}
const tomato: Tomato = {
    radius: 1,
    color: 'red',
}
// const carrot: Carrot = {
//     length: 2,
//     color: 'or'
// }


// 混合类型接口
interface Counter {
    (): void,
    count: number
}

const getCounter = (): Counter => {
    const c = () => {
        c.count++
    }
    c.count = 0
    return c
}
const counter: Counter = getCounter()

counter()
console.log(counter.count)

counter()
console.log(counter.count)

counter()
console.log(counter.count)