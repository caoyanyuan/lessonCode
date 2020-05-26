#### 看一遍vue的源码

##### 一、生命周期

1. beforeCreate  之前的

   初始化事件：定义$on,$emit,$offff,$once

   初始化生命周期：$parent $root _watcher 等vue组件实例里面用到的常用属性初始化 

2. created 之前的

   初始化注入:  注入内容的响应化 处理vm.$options.inject 和 vm.$options.provide

> 思考
>
> 子传父 通信： $emit的事件是在子还是父触发的？
>
> 答： 子触发，但是事件是在父组件中定义的



##### 二、vue数据响应式

1. Observer: Observer对象根据数据类型(数组/对象)执行对应的响应化操作
2. Dep: 负责管理一组Watcher，包括watcher实例的增删及通知更新
3. 数组响应化: 数组数据变化采取的策略是拦截push、pop、splice、shift、unshift、sort、reverse7个方法执行dep通知。

##### 三、vue异步更新队列

Vue 在更新 DOM 时是**异步**执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的

所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免

不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重

的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then 、 MutationObserver 和 setImmediate ，

如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。



宏任务： setTimeout, 

微任务：  Promise.then 、 MutationObserver、setImmediate

```
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');

控制台打印顺序:
script start, script end, promise1, promise2, setTimeout
```

> 一句话总结： 微任务先执行

##### 四、VDom

4.1 patching算法

​	patch将新老VNode节点进行比对（diffff算法），然后根据比较结果进行最小量DOM操作，而不是将整个视图根据新的VNode重绘。

​	diff： 通过**同层的树节点进行比较**而非对树进行逐层搜索遍历的方式，同层级只做三件事：增删改。

具体规则是：

​				new VNode不存在就删；

​				old VNode不存在就增；

​				都存在就比较类型，类型不同直接替换、类型相同执行更新；



4.2  patchVnode： 

​	两个VNode相同执行更新操作，包括三种操作：**属性更新、文本更新、子节点更新**，规则如下：

1. 如果新旧VNode都是静态的，同时它们的key相同（代表同一节点），并且新的VNode是clone或者是标记了

v-once，那么只需要替换elm以及componentInstance即可。

2. 新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren，这个updateChildren也是

diff的核心。

3. 如果老节点没有子节点而新节点存在子节点，先清空老节点DOM的文本内容，然后为当前DOM节点加入子节

点。

4. 当新节点没有子节点而老节点有子节点的时候，则移除该DOM节点的所有子节点。

5. 当新老节点都无子节点的时候，只是文本的替换。

4.3 updateChildren

updateChildren主要作用是比对新旧两个VNode的children得出具体DOM操作。执行一个双循环是传统方式，vue中针对web场景特点做了特别的算法优化：在新老两组VNode节点的左右头尾两侧都有一个变量标记，在**遍历过程中这几个变量都会向中间靠拢**。当**oldStartIdx > oldEndIdx**或者**newStartIdx > newEndIdx**时结束循环。



> 这个过程是diff的核心  具体查看老师文档