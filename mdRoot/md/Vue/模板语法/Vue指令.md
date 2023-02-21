### 数据绑定指令

```js
V-txt	// 纯文本
v-html	// 更新元素内容,不建议使用
v-pre	// 填充原始信息,不经过编译
v-once	// 只编译一次,没有数据监听
v-model	// 双向数据绑定,
```



### 事件绑定

```js
v-on 简写 @
@click = "funName('$event')"

  事件修饰符
    @cilck.stop		// 阻止冒泡
	@cilck.prevent	// 阻止默认行为
  按键修饰符
  	@keyup.112
```



### 属性绑定

```js
v-bind 简写 :
:href = 'msg'
```

> class 样式绑定

```html
<div v-bind:class="{ active: isActive,error: isError }"/>  
<div v-bind:class="[activeClass, errorClass]"></div>
```

> style 样式绑定

```html
:style="{ color: activeColor, fontSize: fontSize }"
:style="[baseStyles, overridingStyles]"
```



### 分支循环

```html
v-if  v-esle-if  v-esle  // 是否在DOM上渲染
<li :key='index+"LI"' v-for='(item,indexLI) in list'>{{item}}{{index}}</li>
v-show	// display的值是否为none
<div v-if='index===1' v-for='(value, key, index) in object'>{{value}}</div>
```

