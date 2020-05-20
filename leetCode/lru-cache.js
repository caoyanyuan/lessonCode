/*
运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制。它应该支持以下操作： 获取数据 get 和 写入数据 put 。

获取数据 get(key) - 如果密钥 (key) 存在于缓存中，则获取密钥的值（总是正数），否则返回 -1。
写入数据 put(key, value) - 如果密钥已经存在，则变更其数据值；如果密钥不存在，则插入该组「密钥/数据值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

你是否可以在 O(1) 时间复杂度内完成这两种操作？

例子：
*/

/**
 * @param {number} capacity  LRUCache1 Map对象实现 
 */
var LRUCache1 = function(capacity) {
    this.max = capacity
    this.cache = new Map()
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache1.prototype.get = function(key) {
    let value = this.cache.get(key)

    if(!value) return -1
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache1.prototype.put = function(key, value) {
    this.cache.delete(key)

    if(this.cache.size > this.max-1) {
        const keys = this.cache.keys().next().value;
        this.cache.delete(keys);
    }
    this.cache.set(key, value)
    
};


// LRUCache2 数组实现  复杂度为n
var LRUCache2 = function(max) {
    this.max = max
    this.cache = []
}

LRUCache2.prototype.put = function(key, value) {

    this.cache.find((item,index) => {
        let flag = item.key == key
        if(flag) {
            this.cache.splice(index, 1)
            return flag
        }
    })

    if(this.cache.length >= this.max) {
        this.cache.shift()
    }

    this.cache.push({key, value})
}

LRUCache2.prototype.get = function(key) {

    let cur, ret = -1
    this.cache.find((item,index) => {
        let flag = item.key == key
        if(flag) {
            cur = item
            ret = cur.value
            this.cache.splice(index, 1)
            this.cache.push(cur)
            return flag
        }
    })
    
    return ret
}

// 版本 3 数组+对象 复杂度为 1
var LRUCache = function(max) {
    this.max = max
    this.cache = Object.create(null)
    this.keys = []
}

LRUCache.prototype.put = function(key, value) {
    // 如果存在即覆盖
    if(this.cache[key]) {
        remove(this.keys, key)
        this.cache[key] = value
        this.keys.push(key)
    }else{
        if(this.keys.length >= this.max) {
            delete this.cache[this.keys[0]]
            this.keys.shift()
        }
        this.cache[key] = value
        this.keys.push(key)
    }
}

LRUCache.prototype.get = function(key) {
    let value = this.cache[key]

    if(value) {
        remove(this.keys, key)
        this.keys.push(key)
    }
    
    return value || -1
}

function remove(arr, key) {
    let index = arr.indexOf(key)

    arr.splice(index, 1)
}

let cache = new LRUCache( 2 ); //缓存容量

console.log(cache.get(1));
console.log(cache.get(2));       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
console.log(cache.get(2));       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
console.log(cache.get(1));       // 返回 -1 (未找到)
console.log(cache.get(3));       // 返回  3
console.log(cache.get(4));       // 返回  4


//github瓶子君的讲解链接 https://github.com/sisterAn/JavaScript-Algorithms/issues/9