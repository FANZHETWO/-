const s = Symbol()
console.log(s)

const s2 = Symbol()

console.log(s2)

const s3 = Symbol('lison')


let prop = 'name';

const info = {
    // name:'lison'
    ['name']: 'lison'
}

console.log(info)

const s5 = Symbol('name');

const info2 = {
    [s5]: 'lison'
}