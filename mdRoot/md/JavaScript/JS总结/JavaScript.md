# JavaScript

###  1.数据类型：值类型与引用类型

	js六大数据类型：
		String			[基本类型]
		Number			[基本类型]
		Boolean			[基本类型]
		Undefined		[基本类型]
		Null			[基本类型]
		Symbol			[基本类型]
		BigInt			[基本类型]
		Object			[引用类型]
		
	js数据类型判断：
	typeOf、constructor、instance、Object.prototype.toString
	
	typeof variable_name:
		返回格式"string" "number" "boolean" "object" "undefined" "object" "function"
		typeof无法用来判断null，判断null返回 "object"
		typeof只能用来判断值类型，对于引用类型返回都是 "object"
		
	--------------------------------------------------------
	
	variable_name.constructor ：
		console.log(bool.constructor === Boolean);// true
		console.log(num.constructor === Number);// true
		console.log(str.constructor === String);// true
		console.log(arr.constructor === Array);// true
		console.log(obj.constructor === Object);// true
		console.log(fun.constructor === Function);// true
		
		constructor不能判断undefined和null
		contructor的指向是可以改变的，因此使用它是不安全的
		
	--------------------------------------------------------
	
	variable_name instanceof 实例原型 
	
		console.log(bool instanceof Boolean);// false
		console.log(num instanceof Number);// false
		console.log(str instanceof String);// false
		console.log(und instanceof Object);// false
		console.log(arr instanceof Array);// true
		console.log(nul instanceof Object);// false
		console.log(obj instanceof Object);// true
		console.log(fun instanceof Function);// true
	
		var bool2 = new Boolean()
		console.log(bool2 instanceof Boolean);// true
	
		var num2 = new Number()
		console.log(num2 instanceof Number);// true
	
		var str2 = new String()
		console.log(str2 instanceof String);//  true
		
		instanceof不能区别undefined和null
		
	---------------------------------------------------------
	
	bject.prototype.toString.call()
	
		console.log(Object.prototype.toString.call(bool));//[object Boolean]
		console.log(Object.prototype.toString.call(num));//[object Number]
		console.log(Object.prototype.toString.call(str));//[object String]
		console.log(Object.prototype.toString.call(und));//[object Undefined]
		console.log(Object.prototype.toString.call(nul));//[object Null]
		console.log(Object.prototype.toString.call(arr));//[object Array]
		console.log(Object.prototype.toString.call(obj));//[object Object]
		console.log(Object.prototype.toString.call(fun));//[object Function]
		
		在任何值上调用 Object 原生的 toString() 方法，都会返回一个 [object NativeConstructorName] 格式的字符串。
		每个类在内部都有一个 [[Class]] 属性，这个属性中就指定了上述字符串中的构造函数名。
		
	----------------------------------------------------------
	
	Array.isArray()  // 判断数组类型

### 2. var、let、const
​	var ：
​		var 声明的变量有预解析，在其执行环境中会被提升
​		var 定义的变量没有块级作用域，只有全局作用域和局部（函数）作用域
​		var 声明的变量可以被重复声明
​	

	let
		let没有预解析过程，变量不会提前
		let 有块级作用域
		let 不允许在同一块作用域内重复声明同一个变量
		let 声明的变量不会成为全局对象的属性
	
	const
		const 只可以声明一次，且必须赋值
		const 变量不能修改（栈引用地址，堆值可以修改）

### 3.单体内置对象

	释义：由ECMAScript实现提供的、不依赖于宿主环境的对象，这些对象在ECMAScript程序执行之前就已经存在了，开发人员不必显式的实例化内置对象，因为他们在使用之前已经被实例化了。
	
	Global、Math：
	
	Global
	
	所有在全局定义的属性和函数，都是Global对象的属性。
	
	Global的方法：isNan、isFinite、ParseInt、parseFloat、encodeURI、encodeURIComponent、定时器、console、
	
	在浏览器环境中，Global是以window对象存在的。在nodejs中也有global，process.env。
	
	Math
	
	Math.min、Math.max、Math.random、Math.ceil、Math.floor、Math.round

### 4. 数组操作方法

	队列、栈方法：
		push 添加任意个元素到数组后端，返回操作后数组的长度
		pop  删除最后一个元素，返回被删除的元素
		unshift 添加任意个元素到数组前端 返回新数组的长度
		shift   删除数组中的第一个元素，返回被删除的元素
		【都改变原数组】
	
	排序方法：
		reverse 反转数组，倒叙
		sort 默认按字符串顺序排序，接受回调函数做为对比方法
		【都改变原数组】
		sort判断对象数组时，使用a.id和b.id来排序
	
	操作方法：
		concat       基于当前数组合并其他数组到新数组 【不改变原数组】
		slice        数组截取，【不改变原数组】
		splice       删除、插入、替换，返回被删除的元素组成的数组 【改变原数组】
	
	位置方法：
		indexOf      判断元素在数组中第一次出现的索引，从左侧开始判断
		lastIndexOf  从右侧开始判断
		findIndex    对于数组中的每个元素，findIndex 方法都会调用一次回调函数，直到有元素返回 true，findIndex 立即返回该返回 true 的元素的索引值，否则返回-1
	
	迭代方法：
		forEach    对数组中的每一项运行给定函数，无返回值 【不改变原始数组】
		map        对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组【不改变原始数组】
		filter     对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组 【不改变原始数组】
		some       对数组中的每一项运行给定函数，如果该函数对任一项返回true，则返回true
		every      对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true
		keys，values，entries 用于遍历数组。它们都返回一个遍历器对象，可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
	
	归并方法：
		reduce
		reduceRight
		
	查找：
		find 接收函数作为参数，返回数组中符合测试函数条件的第一个元素，否则返回undefined 
		includes 方法返回一个布尔值，表示某个数组是否包含给定的值
		
	转换类数组
		Array.from 方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
		Array.prototype.slice.call(arr_like)
		扩展操作符 [... arr_like]

### 5. Object

	创建对象
		对象字面量方式
		new Object()方式
		Object.create()
	
	访问属性、修改属性/添加属性/删除属性/检测属性
		访问、修改、添加 obj.proto_name 或 obj['proto_name']、obj[proto_variable_name]
		
		添加 Object.assign()、Object.defineProperty()
		
		删除 delete obj.proto_name
		
		检测 
			in操作符 检测对象的自有属性和继承属性中是否有该属性。有则返回true， 否则返回false
			hasOwnProperty hasOwnProperty方法只能测试当前属性是不是对象的自有属性
	
	对象合并、复制/拷贝
		合并 Object.assign(target_obj, {}, {})
		
		复制/拷贝 
			1、let obj = Object.assign({}, source_target) 【浅拷贝】
			2、JSON.stringify()和JSON.parse() 【深拷贝】
				缺点：
				null和undefined无法处理
				无法拷贝是函数的属性	
			3、Object.create() 【深拷贝】
			4、js遍历判断数据类型 【深拷贝】
	
	对象遍历
		for...in 遍历自身属性和继承属性（原型上的属性）
			直接遍历
			结合hasOwnProperty方法区分自身属性和原型属性
			
		Object.keys、Object.values、Object.entries 自身属性
			需要先对对象返回key、value、key-value属性数组之后对属性数组进行遍历
			
		Object.getOwnPropertyNames(obj) 自身属性
			返回属性数组，对属性数组进行遍历
			
	扩展
		Object.is() 严格相等
		
		??: Null判断运算符，行为类似&&和||，但是只有在左侧为null和undefined时才会执行右侧的表达式

###  6.js中的遍历：for、for...in、for...of、forEach

	for
	
		语法：
			for(var i = 0; i < len; i++){
				......
			}
			
		用来遍历数组，需要先获取数组的length，切记：如果将获取长度的操作直接放在for语句中，不要在遍历的时候改变数组的长度。
		
	-------------------------------------------------------
	
	for...in
	
		语法：
			for (var item in obj){
				......
			}
			
		可以用来遍历数组和对象的属性，for...in语句不仅会遍历对象自身属性还会遍历对象从原型链上继承的属性。
		
		一般用来遍历对象的属性，结合hasOwnProperty使用，区分对象的自有属性和继承属性。
		
		如果需要遍历数组可以使用for...of、数组的forEach或for语句。
	
	-------------------------------------------------------
	
	for...of
	
		语法：
			for (var value of obj){
				......
			}
			
		for...of适用遍历数值/数组对象/字符串/map/set等拥有迭代器对象的集合，但是不能遍历对象,因为对象不具有迭代器对象。
	
	-------------------------------------------------------
	
	forEach
	
		语法
			[...].forEach(function(item, index){
				......
			})
		
		数组遍历方法，与对象无关，只是带个for看起来跟前面哥几个长的有点像。
		
	-------------------------------------------------------
	
	总结：
		
		for...in 用来遍历对象属性，一般结合hasOwnProperty使用，区分对象的自身属性和继承属性。虽然可以用来遍历数组，但是实际场景中没有任何必要使用for...in来遍历数组，如果需要遍历数组，请使用遍历数组的方法。
		
		for...of 具备迭代器对象的数据类型，可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）以及字符串等，因为这些数据类型已经内置实现了迭代器对象，不可以遍历对象类型，因为对象类型不具备迭代器对象（除非自己对对象实现迭代器对象）。
			let list = [Array, String, Set, Map]
			list.forEach(function(item){
				console.log(item.prototype[Symbol.iterator])
			})
			
			Object.prototype[Symbol.iterator] // undefined
		
		for 可以指定长度的遍历，具备长度的数据都可用用来遍历。
		
		forEach 数组的遍历方法，只能用来遍历数组对象，与map相同，但也有不同：
		
			1、forEach返回undefined，map返回一个新数组，不改变原数组
			2、forEach无法中断或跳出，如果需要中断或跳出请使用for。

### 7.Promise

	Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其
	写进了语言标准，统一了用法，原生提供了Promise对象。
	
	所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，
	Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
	
	有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，
	Promise对象提供统一的接口，使得控制异步操作更加容易。
	
	基本用法：
	
		const promise = new Promise(function(resolve, reject) {

  			// ... some code

  			if (/* 异步操作成功 */){
  			
    			resolve(value);

  			} else {
  			
    			reject(error);

  			}
		})
		
			Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 
			引擎提供，不用自己部署。
		
			resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从pending 变为 resolved），在异步操作成功
			时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”
			（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
	
			Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
			
			promise.then(function(value) {
  				// success
			}, function(error) {
  				// failure
			});
			
			then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是
			Promise对象的状态变为rejected时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象
			传出的值作为参数。
			
			function timeout(ms) {
  				return new Promise((resolve, reject) => {
    				setTimeout(resolve, ms, 'done')
  				})
			}

			timeout(100).then((value) => {
  				console.log(value);
			});
		
		如何将ajax封装到Promise中？
		
			const getJSON = function(url) {
  				const promise = new Promise(function(resolve, reject){
    				const handler = function() {
      					if (this.readyState !== 4) {
        					return;
      					}
      		
     					if (this.status === 200) {
            				resolve(this.response);
          				} else {
        					reject(new Error(this.statusText));
      					}
        			};
        			const client = new XMLHttpRequest();
        			client.open("GET", url);
        			client.onreadystatechange = handler;
        			client.responseType = "json";
        			client.setRequestHeader("Accept", "application/json");
        			client.send();
  				});

	  			return promise;
			};
	
			getJSON("/posts.json").then(function(json) {
	  			console.log('Contents: ' + json);
			}, function(error) {
	  			console.error('出错了', error);
			});
			
		Promise.prototype.then()
		
			Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例
			添加状态改变时的回调函数。前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态
			的回调函数。then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法
			后面再调用另一个then方法。
			
			getJSON("/posts.json").then(function(json) {
			  return new Promise()
			}).then(function(post) {
			  // ...
			});
			
	Promise.all()
	
		Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
		
		const p = Promise.all([p1, p2, p3]);
		
			p的状态由p1、p2、p3决定，分成两种情况:
			
				（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值
				组成一个数组，传递给p的回调函数。
				
				（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，
				会传递给p的回调函数。
				
	ES7 await/async实现异步
	
		async await是ES7重要特性之一，是目前公认的异步解决方案。async/await的作用是直接将Promise异步代码
		变为同步的写法，注意，代码仍然是异步的。
		
		await只能用在async修饰的方法中，但是有async不要求一定有await。
		
		await后面只能跟async方法和Promise对象。
		
		async函数返回的是一个Promise对象，可以使用then方法添加回调函数；async函数中return的内容会变为then方法的resolve方法
		的参数，而抛出的错误会被catch方法捕获。
				
		async函数中的await表明async中有异步操作，当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数
		体内后面的语句。

### 8.ES6包管理

		自js诞生之初，其定位就是浏览器脚本语言，是为了做一些简单的交互效果和表单提交为目的的，随着前端的发展，web开发中对浏览器端
	的依赖越来越大，js的地位逐渐变得重要起来，使用计js的地方越来越多，网站功能越来越复杂，同时，网站的js文件的规模也越来越大。
	
		由于js语言本身作用域的设计问题，使得js在做文件管理的时候相对麻烦一些，早期的包管理基本是通过js的闭包函数来模拟命名空间，
	减少文件命名冲突，但即使是这样，随着js文件数量的增多，命名同样会产生冲突。
	
		不仅如此，由于js执行顺序的原因，js加载的顺序极其重要，在有许多js文件需要管理的情况下，文件彼此的依赖管理日渐变得繁琐和难以梳理。
	
		随即，js包管理的概念和规范以及具体实现都开始出现。
		
	ES6规范：
	
		在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言
	标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。
	
		ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
		
		ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。
		
		ES6 模块之中，顶层的this指向undefined，而不是ES5及之前的window对象，所以在ES6+中不应该在顶层代码使用this。
		
		基本使用：
		
			模块功能主要由两个命令构成：export和import。
			
			export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
			
			export：ES6中的一个模块就是一个独立的文件，该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的
			某个变量，就必须使用export关键字输出该变量。
			
			export有两种书写方式，我们称之为单个导出和对象导出：
			
				单个导出：
					export var m = 'hello world'
					export function func() {}
					
				对象导出：
					var m = 'hello world'
					function func() {}
					export {m, func}
					export {m as alias_name} // 导出时可以指定别名
					
					// 以下这种方式错误
					var m = 'hello world'
					export m 
					
				export语句只能出现在包文件中的顶层（不能是函数中），但可以在任意行处。
				
			import：使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。
			
				import { m, func} from './myfile.js';
				import { m, func as alias_name} from './myfile.js'; // 导入时可以指定别名
				
				由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
			
					// 报错
					import { 'f' + 'oo' } from 'my_module';
					
					// 报错
					let module = 'my_module';
					import { foo } from module;
					
					// 报错
					if (x === 1) {
					  import { foo } from 'module1';
					} else {
					  import { foo } from 'module2';
					}
					
				import语句只能出现在包文件中的顶层（不能是函数中），但可以在任意行处。
				
			模块的整体导入：
		
				import { area, circumference } from './circle';
				console.log('圆面积：' + area(4));
				console.log('圆周长：' + circumference(14));
				等同于：
				import * as circle from './circle';
				console.log('圆面积：' + circle.area(4));
				console.log('圆周长：' + circle.circumference(14));
				
			export default 语句：
				
				// export-default.js
				export default function () {
  					console.log('foo');
				}	
				
				// import-default.js
				import customName from './export-default'; // 不需要使用大括号
				customName(); // 'foo'

###  9.表单相关

	form属性设置
	
		action：数据提交的地址
		
		method：要发送的HTTP请求类型，通常是“get”或“post”
		
		enctype：请求的编码类型
			
			application/x-www-form-urlencode
				表单默认的编码类型，使用该类型时，会将表单数据中非字母数字的字符转换成转义字符，当action为get时候，
				组合成这种形式key1=value1&key2=value2添加到url中“?”以后。所以后端在取数据后，要进行解码
				当action为post时候，浏览器把form数据封装到http body中，然后发送到server。
			
			mutipart/formdata
			
				一般来说，method和enctype是两个不同的互不影响的属性，但在传文件时，method必须要指定为POST
				
				当没有传文件时，enctype会改回默认的application/x-www-form-urlencoded
			
			text/plain
			
				按照键值对排列表单数据key1=value1\r\nkey2=value2，不进行转义。
				若表单中有文件类型input，但又指定了enctype为text/plain，则最终键值对中只会有文件项目的文件名
			
			json（jquery ajax中指定的dataType）
				我们在使用jquery或其他ajax类库的时候，设定的dataType类型为json，此处的dataType并不是设定的enctype，
				enctype设置的是请求头，而jquery ajax中的dataType设定的其实是响应头，告诉服务器客户端期望的
				数据格式为json。
			
	表单提交
		
		<input type="submit" value="Submit Form">
		<button type="submit">Submit Form</button>
	
	表单重置
	
		<input type="reset" value="Submit Form">
		<button type="reset">Submit Form</button>
	
	阻止表单默认事件
	
		event.preventDefault()
	
	http methods：
	
		GET、POST、OPTIONS、HEAD、PUT、DELETE、TRACE、CONNECT
	
		get与post区别：
		
			1、GET是从服务器上获取数据，POST是向服务器传送数据。
	
			2、在客户端， GET方式在通过URL提交数据，数据在URL中可以看到；POST方式，数据放置在http请求体内提交
			
			3、对于GET方式，服务器端用Request.QueryString获取变量的值，对于POST方式，服务器端用Request.Form获取提交的数据。
			
			4、GET方式提交的数据最多只能有1024字节，而POST则没有此限制
			
			5、浏览器会缓存GET请求，但不会缓存POST请求
			
			6、GET产生一个TCP数据包;POST产生两个TCP数据包，GET方式的请求，浏览器会把http header和data一并发送出去，
			服务器响应200(返回数据);POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，
			服务器响应200 ok(返回数据)。

###  10.Ajax、Ajax跨域以及解决方案

	Ajax实现：
		原生js使用XmlHttpRequest对象、fetch api
		jQuery
		axios
		小程序wx.request
		
	Ajax参数详解
	
	跨域原因：浏览器同源策略
	
	跨域场景：
	
		协议不同、域名不同、端口不同
		canvas的toDataURL方法的图片跨域
		font字体文件跨域（iconfont字体）
	
	跨域解决方案：
	
		jsonp
			
			原理：script标签无同源策略限制 + script标签添加后立即执行 + 指定回调函数
			
			注意：
				jsonp跨域方式只适用于get请求
				需要服务器端设置Access-Control-Allow-Origin: "domain_name/*"
		
		document.domain + iframe(主域相同，子域不同)
			
			通过在父iframe和子iframe设置document.domain为同一主域（不带www），父子iframe通过通信来获取定义在彼此window上的属性。
			
			父子iframe通信：
				1. 子页面调用父页面方法：window.parent.property_name;
				2. 父页面调用子页面方法： window.sonFrameName.property_name;
		
		postMessage
		
			通常，对于两个不同页面的脚本，只有当执行它们的页面位于具有相同的协议（通常为https），端口号（443为https的默认值），
			以及主机  (两个页面的模数 Document.domain设置为相同的值) 时，这两个脚本才能相互通信。
			window.postMessage() 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全。
			
			利用postMessage不能和服务端交换数据，只能在两个窗口（iframe）之间交换数据
		
		代理跨域
		
			服务端请求数据是不存在跨域问题的（服务端无同源策略限制），所以开发者可以通过设置中间代理服务器来代理请求端的请求到目标
			服务器，并将目标服务器的响应原封不动的返回给请求端。

###  11.浏览器本地存储与URL取参

	浏览器的本地存储方式：cookies、localStorage、sessionStorage
	
	cookies：
		设置操作：document.cookie="key=value"
			可反复调用document.cookie设置多个cookie，也可以使用分号分隔cookie字符串，一次性设置多个cookie
	
		获取操作：var cookies = document.cookie // 需要序列化字符串为对象，或使用其他方式获取某个cookie
		
		cookie可设置过期时间，如果不指定过期时间，则在关闭浏览器时，就会清除cookie。
		
		如何清除设定过期时间的cookie：将过期时间设定为当前时间之前的时间即可
		
		如何清除所有cookie：遍历所有cookie，设置每个cookie的过期时间为当前时间之前。
		
		cookie的过期时间可以通过设置expires或max-age来实现。
		
		cookie可以指定域名，支持主域和子域。
		
		示例：document.cookie = "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
	
	localStorage：
		设置：localStorage.setItem("username", "John")
		
		获取：localStorage.getItem('username')
		
		删除：localStorage.removeItem('myCat')
		
		删除所有：localStorage.clear()


​	
​	sessionStorage
​	
​		设置：sessionStorage.setItem("username", "John")
​		
		获取：sessionStorage.getItem('username')
		
		删除：sessionStorage.removeItem('myCat')
		
		删除所有：sessionStorage.clear()
	
	cookies、localStorage、sessionStorage三者区别:
	
		1、存储在 localStorage 的数据可以长期保留；而当页面会话结束——也就是说，当页面被关闭时，存储在 sessionStorage 的数据会被清除;
		2、cookie会随着http请求发往服务端，而localStorage和sessionStorage则不会；
		3、cookie存储有长度限制，localStorage和sessionStorage则没有；
	
		基本上，localStorage和sessionStorage可以分别用来替代cookie有过期时间和无过期时间的两种使用场景，但如果需要将某些数据
		在请求的时候传递给服务端，那就还是cookie比较合适。
	
	URL取参
		
		通过序列化location.search属性
			1、对location.search进行字符串操作，序列化为对象
			2、使用URLSearchParams构造函数
				has()方法、get()方法、append方法等
				
		正则表达式获取

###  12.事件循环：eventLoop

	先看一段代码，请判断一下打印结果的顺序。
	
		async function async1() {
		  console.log("async1 start");
		  await async2();
		  console.log("async1 end");
		}
		async function async2() {
		  console.log("async2");
		}
		console.log("script start");
		
		setTimeout(function() {
			console.log("setTimeout");
		}, 0);
		
		async1();
		
		new Promise(function(resolve) {
		  console.log("promise1");
		  resolve();
		}).then(function() {
		  console.log("promise end");
		});
		console.log("script end");
	
	事件轮训是js中比较深的一个概念，但相对来说，并不难理解。前端开发者掌握了解了事件轮训的原理，对js代码中的一些执行顺序的问题，
	将会理解的更加清晰。
	
	事件轮训相关的概念：单线程模型、执行栈、同步任务与异步任务、任务队列、Microtasks、Macrotasks。
	
	【单线程模型】：JavaScript 只在一个线程上运行。也就是说，JavaScript 同时只能执行一个任务，其他任务都必须在后面排队等待。
	
	【执行栈】：执行中的任务（队列），可以是同步代码，也可以是异步代码。
	
	【同步任务】：是指那些没有被引擎挂起、在主线程上排队执行的任务。只有前一个任务执行完毕，才能执行后一个任务。
	
	【异步任务】：是指那些被引擎放在一边，不进入主线程、而进入任务队列的任务。只有引擎认为某个异步任务可以执行了（比如 Ajax 操作从
	服务器得到了结果），该任务（采用回调函数的形式）才会进入主线程执行。排在异步任务后面的代码，不用等待异步任务结束会马上运行，
	也就是说，异步任务不具有“堵塞”效应。
	
	举例来说，Ajax 操作可以当作同步任务处理，也可以当作异步任务处理，由开发者决定。如果是同步任务，主线程就等着 Ajax 
	操作返回结果，再往下执行；如果是异步任务，主线程在发出 Ajax 请求以后，就直接往下执行，等到 Ajax 操作有了结果，
	主线程再执行对应的回调函数。
	
	JavaScript中的异步任务有两种，即Microtasks（微任务） 和 Macrotasks（宏任务）。
	
	Microtasks的优先级要高于Macrotasks，Microtasks 用于处理 I/O 和计时器等事件，每次执行一个。Microtask 为 async/await 
	和 Promise 实现延迟执行，并在每个 task 结束时执行。
	
	在每一个事件循环之前，microtask 队列总是被清空（执行）。
	
	【宏任务】列表：
	
		script(整体代码)
		setTimeout
		setImmediate
		setInterval
		I/O
		UI 渲染
		
		ajax请求不属于宏任务，js线程遇到ajax请求，会将请求交给对应的http线程处理，一旦请求返回结果，就会将对应的回调放入
		宏任务队列，等请求完成执行。
		
	【微任务】列表：
		process.nextTick
		Promise
		Object.observe(已废弃)
		MutationObserver(html5新特性)
	
	【任务队列】：简单理解来说，就是同步代码以外的异步代码，需要被在同步代码执行完毕后再去执行的异步代码，异步代码会先被放到任务
	队列中，等同步代码执行完毕后，回去执行任务队列中的代码。
	
	执行过程
	
	JavaScript 运行时，除了一个正在运行的主线程即执行栈（执行队列），引擎还提供一个任务队列（等待执行队列），里面是各种需要当前程序
	处理的异步任务。
	
	首先，主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。如果满足条件，那么异步任务
	就重新进入主线程开始执行，这时它就变成同步任务了。等到执行完，下一个异步任务再进入主线程开始执行。一旦任务队列清空，
	程序就结束执行。
	
	异步任务的写法通常是回调函数。一旦异步任务重新进入主线程，就会执行对应的回调函数。如果一个异步任务没有回调函数，
	就不会进入任务队列，也就是说，不会重新进入主线程，因为没有用回调函数指定下一步的操作。
	
	JavaScript 引擎怎么知道异步任务有没有结果，能不能进入主线程呢？答案就是引擎在不停地检查，一遍又一遍，只要同步任务
	执行完了，引擎就会去检查那些挂起来的异步任务，是不是可以进入主线程了。这种循环检查的机制，就叫做事件循环（Event Loop）。
	
	JavaScript代码执行顺序；
	
		1、当遇到函数（同步）时，会先将函数入栈，函数运行结束后再将该函数出栈；
	
		2、当遇到 task 任务（异步）时，这些 task 会返回一个值，让主线程不在此阻塞，使主线程继续执行下去，
	而真正的 task 任务将交给 浏览器内核 执行，浏览器内核执行结束后，会将该任务事先定义好的回调函数
	加入相应的任务队列（microtasks queue/ macrotasks queue）中。
	
		3、当JS主线程清空执行栈之后，会按先入先出的顺序读取microtasks queue中的回调函数，并将该函数入栈，
	继续运行执行栈，直到清空执行栈，再去读取microtasks的任务队列。
	
		4、当microtasks 队列中的任务执行完成后，会提取 macrotask 队列中的一个任务回调入栈 ，
	 继续运行执行栈，直到清空执行栈，依次执行下去直至所有任务执行结束。
		 
	 	console.log('第一行')
		setTimeout(() => {
		    console.log('第三行')
		});
		console.log('第五行')
		
		// 输出顺序第一行->第五行->第三行
		
		---------------------------------------------
		
		console.log("第一行");
		let promise = new Promise(function(resolve) {
			console.log("before resolve");
			resolve();
			console.log("after resolve");
		}).then(function() {
			console.log("promise.then");
		});
		
		console.log("script end");
		
		// 输出顺序: 第一行->promise1->before resolve->after resolve->script end->promise.then	
		
		---------------------------------------------
		
		async function async1(){
   			console.log('async1 start');
    		await async2();
    		console.log('async1 end')
		}
		
		async function async2(){
			console.log('async2')
		}
	
		console.log('script start');
		async1();
		console.log('script end')
	
		// 输出顺序：script start->async1 start->async2->script end->async1 end
	
		---------------------------------------------
		
		console.log("start");
	
		setTimeout(function() {
		  console.log("timeout");
		}, 0);
		
		new Promise(function(resolve) {
		  console.log("promise");
		  resolve();
		}).then(function() {
		  console.log("promise resolved");
		});
		
		console.log("end");
		// 执行顺序start->promise->end->promise resolved->timeout
		
		---------------------------------------------
		
		async function async1() {
			console.log("async1 start"); // 同步代码2
			await async2(); // 调用async2(),async2()的返回值是promise，不执行promise的resolve,让出线程
			console.log("async1 end");
		}
		async function async2() {
			console.log("async2"); // 同步代码3
		}
		console.log("script start"); // 同步代码1
			
		setTimeout(function() {
			// 异步 setTimeout放入event-loop中的macro-tasks队列，暂不执行
			console.log("setTimeout");
		}, 0);
			
		async1();
			
		new Promise(function(resolve) {
			console.log("promise1"); // 同步代码4
			resolve();
		}).then(function() {
			console.log("promise end"); // 不执行
		});
		console.log("script end"); // 同步代码5

###  13.作用域与this

	作用域：浏览器给js的一个生存环境。
	
	作用域链：js中的关键字var和fuanction都可以提前声明和定义，提前声明和定义的放在我们的内存地址中。然后js从上到下逐行执行，
	遇到变量就去内存地址查找是否存在这个变量，如果有就使用，没有就继续向父级作用域查找直到window下结束，这种查找机制叫做作用域链。 
	 
	this的问题
	
	this是js中的一个关键字，指代js当前执行代码的上下文环境，也就是当前代码执行的作用域。
	
	函数内的this和函数外的this，函数内的this指向行为发生的主体（调用者），函数外的this都指向上层函数或者window对象。
	
	this是和定义时无关的，而和调用时有关，换句话说，函数内的this和函数在什么环境中定义没有关系，而只和自己的主体（调用者）有关。
	
	如何寻找主体？
	
	不人为改变this指向的前提下，就看函数 (方法)带不带“.”操作符，如果函数和方法执行时带“.”操作符，那么this就
	指向“.”操作符前面的对象，如果不带“.”操作符，就指向window。
	
	请注意：如果在函数中使用严格模式，则原本this指向window的上下文会指向undefined。
	
	常见场景：setTimeout、对象中的函数调用自身属性
	
	注意：
		1、自执行函数中的主体都指向window
		2、给元素中的某一事件绑定方法，当事件触发时，执行绑定的方法，方法中的this指向当前元素。
		
	请记住函数是引用数据类型数据，所以当我们在使用setTimeout方法时，如果为第一个参数指定一个对象中的函数，则主体也是window对象。
	
	绑定/改变this的指向：call、apply、bind、箭头函数、变量持有外层this对象（var that = this）
	
	call、apply、bind三者区别：
	
		它们在功能上是没有区别的，都是改变this的指向，它们的区别主要是在于方法的实现形式和参数传递上的不同。
		
			1、call和bind方法的参数需要直接传入，以逗号分隔多个参数；
			2、call和apply方法都是在调用之后立即执行的，而bind调用之后是返回原函数，需要再调用一次才行。
			
	箭头函数：
	
		箭头函数表达式的语法比函数表达式更简洁，并且没有自己的this，arguments，super或new.target。
	
		箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。
		
		箭头函数没有自己的this, 它的this是继承而来，默认指向在定义它时所处的对象(宿主对象)的this,而不是执行时的对象的this，即
		箭头函数的this是继承父执行上下文里面的this。


​	
​		
​		