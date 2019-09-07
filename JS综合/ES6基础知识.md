1、开发环境已经普及使用
2、浏览器环境目前支持不是很友好（需要开发环境编译）
3、内容偏多，主要了解常用语法
4、面试：开发环境的使用+重点语法的掌握

问题
1、ES6模块化如何使用，开发环境如何打包
-模块化的基本语法
```
export default {
     a:100
}
export function a () {
    return "hello''
}
```

-关于js众多模块化标准
没有模块化 --> AMD成为标准，require.js (国内CMD) -->前端打包工具，使nodejs模块化可以被使用 -->ES6出现，想统一现在所有模块化标准-->nodejs积极支持，浏览器尚未统一 --> 你可以自造lib，但是不要自造标准

-开发环境配置
```
- node 环境 
 -npm install --save-dev babel-core babel-preset-es2015 babel-preset-latest
-创建.babelrc文件
-babel --version
```
关于rollup
- rollup 功能单一 ,webpack功能强大
- 参考设计原则和《linux/Unix设计思想》
- 工具要尽量功能单一，可集成，可扩展
Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序

webpack ：是一个现代js应用程序的静态模块打包器（module bundleer）。当webpack处理应用程序时，他会递归地构建一个依赖关系图（dependency graph）,其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle.
场景区别：Rollup偏向应用于js库，webpack偏向应用于前端工程，UI库；如果你的应用场景中只是js代码，希望做ES转换，模块解析，可以使用Rollup。如果你的场景中涉及到css、html，涉及到复杂的代码拆分合并，建议使用webpack


### 原型链
>**prototype属性的作用**
>JavaScript 继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享。
- 原型对象的作用
> 就是定义所有实例对象共享的属性和方法。这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象。


#### 知识点
- instanceof 运算符
>instanceof运算符返回一个布尔值，表示对象是否为某个构造函数的实例。

##### 构造函数
>constructor属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。
```
function F() {};
var f = new F();

f.constructor === F // true
f.constructor === RegExp // false
```
```
function Foo(name,age) {
	this.name = name
	this.age = age
	this.class = 'class-1'
	//return this //最后
}
var f = new Foo('zhangsan',20)
//var f1 = new Foo('lisi',22)
```
##### 构造函数扩展
- var a = {} 其实是var a=new Object()的语法糖
- var a = [] 其实是var a = new Array)()的语法糖 
- function Foo(){...}其实是var Foo = new Function(...)
- 使用instanceof 判断一个函数是否是一个变量的构造函数
 
#####原型规则和示例
>5条原型规则 原型规则是学习原型链的基础

- 所有的引用类型（数组、对象、函数），都对象特性，即可自由扩展属性（除了“null”意外）
- 所有的引用类型（数组、对象、函数），都有一个\__proto\__(隐式原型)属性，属性值是一个普通的对象
- 所有的函数，都有一个prototype属性，属性值也是一个普通的函数
- 所有的引用类型（数组、对象、函数），\__proto\__属性值指向它的构造函数的 prototype(显性属性)属性值
- 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去他的\__proto\__（即他的构造函数的prototype）中寻找。console.log(obj.\__proto\__ === Object.prototype).

- ![图片](http://www.mollypages.org/tutorials/jsobj_full.jpg) 
```
var obj = {}; obj.a = 100;
var arr = []; arr.a = 100;
function fn() {}
fn.a = 100

console.log(obj.__proto__)
console.log(arr.__proto__)
console.log(fn.__proto__)

console.log(fn.prototype)
console.log(obj.__proto__ === Object.prototype)
```

- this && hasOwnProperty
```
function Foo(name,age) {
	this.name = name
}
Foo.prototype.alertName = function () {
	console.log(this.name)
}
//创建示例
var f = new Foo('zhangsan')
f.printName = function() {
	console.log(this.name)
}
//
f.printName()
f.alertName()

//通过hasOwnProperty筛选出原型链上的属性
var item 
for(item in f) {
	//高级浏览器已经在for in 中屏蔽来自原型的属性
	//但是保证程序的稳定健壮，建议还是加上
	if(f.hasOwnProperty(item)) {
		console.log(item)
}
	
}
```
##### f.toSting()改怎么网上找
>我们知道JS是单继承的，`Object.prototype`是原型链的顶端，所有对象从它继承了包括`toString`等等方法和属性。
 >要去f.\__proto\__.\__proto\__中查找  f ---> Function.prototype ---> Object.prototype ---> null
##### /__proto/__
>/__proto/__并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的JS引擎中都提供这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用Object.getPrototypeOf方法来获取实例对象的原型，然后再来为原型添加方法/属性

#### zepto原型实现DOM的实例
```
(function(window){
    var zepto = {};

	function Z(dom,selector) {
		var i, len = dom?dom.length : 0;
		for( i = 0;i < len;i++){
			this[i] = dom[i];
		}
		this.length = len;
		this.selector = selector || ''
	}
	
	zepto.Z = function (dom,selector) {
		return new Z(dom,selector)
	}
	

	zepto.init = function(selector){
		var slice = Array.prototype.slice;
		var dom = slice.call(document.querySelectorAll(selector));
		return zepto.Z(dom,selector);
	}
	var $ = function (selector){
	 	return zepto.init(selector)
	}
	
 	window.$ = $;
	$.fn = {
		css:function(key,value) {
			console.log('this is put css')
		},
		html:function(value){
			console.log('this html')
		}
	}

	Z.prototype = $.fn
})(window)

```


#### 一些常见问题
1、如何准确判断一个变量是数组类型
```
var arr = []
arr instanceof Array //true
typeof arr //object,typeof是无法判断是否属数组的
```
2、写一个原型链继承的例子
```
function Elem(id) {
	this.elem = document.getElementById(id)
};
Elem.prototype.html = function(val) {
	var elem = this.elem;
	if(val) {
		elem.innerHTML = val;
		return this	
	}else {
		return elem.innerHTML
	}
};
Elem.prototype.on = function(type,fn) {
	var elem = this.elem
	elem.addEventListener(type,fn)
	return this
};

var div1 = new Elem('divID');
div1.html('<p>hello world</p>').on('click',function(){
  console.log('i am coming')
}).html('<h1>footer</h1>')

```

3、描述new一个对象的过程
```
function Foo(name) {
	this.name = name
}

var xing = new Foo('liu')
```

4、zepto(或其他框架)源码中如何使用原型链
- 阅读源码是高效提高技能的方式
- 但不能‘埋头苦战’有技巧在其中


#### 原型继承
> **继承的原型链：`Object.prototype(root)`<---`Function.prototype`<---`Function|Object|Array...`**


##### 作用域和闭包

#### 知识点
- 执行上下文
- this
1、作为构造函数执行
2、作为对象属性执行
3、作为普通函数执行
4、call apply bind
可以写一篇 比如说this 的使用场景
- 作用域
>js没有块级作用域  
> 只有函数和全局作用域
- 作用域链
> 当前作用域没有定义的变量，即“自由变量”
- 闭包
1、函数作为返回值
2、函数作为参数传递
```
闭包例子
var a = 200
function fun() {
	var a = 100 
	return function(){
		console.log(a)
	}
} 
a = 300
var fn1 = fun()

function fun2(fn) {
	fn&&fn()
}
fun2(fn1)
```

####常见题目
1、说下对变量提升的理解
2、说明this几种不同的使用场景
3、创建10个<a>标签 点击的时候弹出来对应的序号
```
var i
for(i=0;i<10;i++) {
	(function(i){
	var a = document.createElement('a');
	a.innerHTML = i + '<br>';
	a.addEventListener('click',function(e){
		e.preventDefault()
		alert(i)
	})
	document.body.appendChild(a)

})(i)

}
或者
var i
for(i=0;i<10;i++) {
	
	var a = document.createElement('a');
	a.innerHTML = i + '<br>';
    var fun = function (i) {
   alert(i)
}
	a.addEventListener('click',fun.bind(this,i))
	document.body.appendChild(a)

}
```
    
##### JS构造函数
##### Class 基本语法
##### 语法糖
#### Class 优点
- Class 在语法上更加贴合面向对象的写法
- Class 实现继承更加易读，易理解
- 更易于写java等后端语言的使用
- 本质还是语法糖，使用prototype
#### Class与ES5不一致的地方
- class 内部定义的方法是不可枚举
- 类必须使用new 调用，否则会报错
- 不存在提升 类不存在变量提升（hoist）因为ES6不会把类的声明提升到代码头部。原因是和继承有关，必须保证子类在父类之后定义
```
{
	let Foo = class{}
	class Bar extends Foo{
	}
}
//上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。但是，如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义。
```

####  性能优化的几个点
- 静态资源的压缩合并
webpack打包工具压缩 
- 静态资源缓存
一些静态资源本地缓存
- 使用CDN让资源加载更快
- 使用SSR后端渲染，数据直接输出到HTML中
一般只是交互少，静态页面的网站
- CSS放前面，JS放后面
浏览器的原理
- 懒加载（路由懒加载、图片懒加载，下拉加载更多）

- 减少DOM查询，对DOM查询做缓存
浏览器的渲染原理
- 减少DOM操作，多个操作尽量合并在一起执行
- 事件节流
比如说防抖  节流函数
- 尽早执行操作（如DOMContentLoaded）

安全性
#### XSS跨域请求攻击
新浪博客写了一篇文章，同时偷偷插入一段<script>
攻击代码中，获取cokkie,发送自己的服务器
发布博客，有人查看

**如何预防**
- 前端替换关键字，例如替换< 为&lt;>为&gt
- 后端替换

#### XSRF
- 你已登录一个购物网站，正在浏览商品
- 该网站付费接口是xxxxxxx,但是没有任何验证
- 然后收到一封邮件，隐藏着 <img src=xxxxxx>
- 然后被偷偷付费

**如何预防**
- 增加验证流程，如输入指纹，密码，短信验证码


### 简历
- 简洁明了，重点突出项目经历和解决方案
- 把个人博客放在简历中，并且定期维护更新博客
- 把个人的开源项目放在简历中，并维护开源项目
- 如何看待加班？加班就像借钱，救急不救穷
- 千万不可挑战面试官，不要反考面试官
- 学会给面试官惊喜，但不要太多
- 遇到不会回答的问题，说出你知道的也可以
- 谈谈你的缺点---说一下你最近正在学什么就可以了

##### callback

```
function loadImg(src,callback,fail){
	var img = document.createElement('img');
	img.onload = function(){
		callback(img)
	}
	img.onerror = function(){
		fail()
	}
	img.src= src
}
var src = 'img'
loadImg(src,function(img){
	console.log(img.with)
},function(){
  	console.log('failed')
})
```

#### Promise 语法
- 是异步编程的一种解决方案
**两个特点**
- 对象的状态不受外界影响
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果
**缺点**
- 无法取消promise ,一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
- 当处于pending状态时，无法得知目前进展到哪一个阶段
```
function loadImg(src){
	const promise = new Promise(function() {
		var img = document.createElement('img');
		img.onload = function(){
			resolve(img)
		}
		img.onerror = function(){
			reject()
		}
		img.src= src
	})
	return promise;
}
var src = 'xxxx'
var result = loadImg(src);
result.then(function(img){
	console.log(img.width)
},function(){
 	console.log('failed')
})
```


### 异步

###### 什么是单线程，和异步的关系

- 单线程 只有一个线程，只能做一件事
- 原因-避免DOM渲染的冲突
- 解决方案-异步

###### 浏览器为什么是单线程
- 浏览器需要渲染DOM
- js可以修改DOM结构
- JS执行的时候，浏览器DOM渲染会暂停
- 两段JS也不能同时执行(都修改DOM就冲突了)
- webworker支持多线程，但是不能访问DON

###### 异步的缺点
- 没有按照书写方式执行，可读性差
- callback中不容易模块化

##### 什么是event-loop
- 事件轮询，JS实现异步的具体解决方案
- 同步代码，直接执行
- 异步函数先放在异步队列中
- 待同步函数执行完毕，轮询执行 异步队列的函数


#### 异步实现的很早期实现 $.Deferred()



### Promise

**缺点**
- 无法取消Promise,一旦新建就会立即执行，无法中途取消。
- 如果不设置回调函数，promise内部抛出的错误，不会反应到外部。
- 处于pending状态时，无法得知目前进展到了哪一个阶段。

**注意点**
```
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
```
调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。


**for... in 循环的几个缺点**
- 数组的键名是数字，但是for...in循环是以字符串作为键名'0','1','2'
- for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
- 某些情况下，for...in循环会以任意顺序遍历键名。
