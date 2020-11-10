### 百度：什么是浅拷贝和深拷贝？有什么区别？如何实现 Object 的深拷贝
 
#### 一 数据类型

数据分为基本数据类型(String, Number, Boolean, Null, Undefined，Symbol)和对象数据类型。
1、基本数据类型的特点：直接存储在栈(stack)中的数据

2、引用数据类型的特点：存储的是该对象在栈中引用，真实的数据存放在堆内存里


#### 二 赋值、深拷贝和浅拷贝

深拷贝和浅拷贝是只针对Object和Array这样的引用数据类型的

1. 赋值： 当我们把一个对象赋值给一个新的变量时，赋的其实是该对象的在栈中的地址，而不是堆中的数据。也就是两个对象指向的是同一个存储空间，无论哪个对象发生改变，其实都是改变的存储空间的内容，因此，两个对象是联动的。
2. 浅拷贝：浅拷贝是按位拷贝对象，它会创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。
    - 如果属性是基本类型，拷贝的就是基本类型的值；
    - 如果属性是内存地址（引用类型），拷贝的就是内存地址 ，因此如果其中一个对象改变了这个地址，就会影响到另一个对象。即默认拷贝构造函数只是对对象进行浅拷贝复制(逐个成员依次拷贝)s

```
function shawllowCopy(obj) {
    let ret = {}

    for(let key in obj) {
        ret[key] = obj[key]
    }
    return ret
}
```
> 如果obj只有一层的时候， 浅拷贝就是深拷贝

3. 深拷贝：另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。
   
3.1 JSON.parse(JSON.stringify())
   
```
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
}

```
但是这种方式不是和属性有函数的时候

3.2 递归实现

```
function deepCopy(obj) {
    let ret = {}
    for(let key in obj) {
        let cur = obj[key]

        if(cur instanceof Array || cur instanceof Object) {
            ret[key] = deepCopy(cur)
        }else{
            ret[key] = cur
        }
       
    }

    return ret
}
```
> https://www.jianshu.com/p/35d69cf24f1f








