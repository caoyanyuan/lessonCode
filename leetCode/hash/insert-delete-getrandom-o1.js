/**
 * 常数时间插入、删除和获取随机元素
 *  
设计一个支持在平均 时间复杂度 O(1) 下，执行以下操作的数据结构。

insert(val)：当元素 val 不存在时，向集合中插入该项。
remove(val)：元素 val 存在时，从集合中移除该项。
getRandom：随机返回现有集合中的一项。每个元素应该有相同的概率被返回。
*/

// 608ms
var RandomizedSet1 = function() {
    this.hash = {}
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet1.prototype.insert = function(val) {
    if(this.hash[val] == undefined) {
        this.hash[val] = val
        return true
    }else{
        return false
    }
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet1.prototype.remove = function(val) {
    if(this.hash[val] != undefined) {
        delete this.hash[val]
        return true
    }
    return false
};

/**
 * Get a random element from the set.
 * @return {number}  
 */
RandomizedSet1.prototype.getRandom = function() {
    let keys = Object.keys(this.hash)
    let radomNumber = parseInt(Math.random()*keys.length) 

    return this.hash[keys[radomNumber]]
};

/** 180ms 
 *  set： 表示数组中的对应的值的下标是多少
    setMap： 用哈希表的键(key)存储val 用值(value)存储这个值在数组中的下标index
    然后删除的时候就可以根据val找到数组里面的下标 然后在数组中进行删除
    比如说当我想要找数组里面的10 就可以通过setMap[10]来找到数组中对应的下标然后删除 不需要遍历
 *  */ 
var RandomizedSet = function () {
    // this.set = new Set()
    //存放值
    this.set = []
    
    this.setMap = {}
};

RandomizedSet.prototype.insert = function (val) {
    if (typeof (this.setMap[val]) !== "undefined") return false
    
    this.setMap[val] = this.set.length
    this.set.push(val)
    
    return true
};

RandomizedSet.prototype.remove = function (val) {
    if(typeof (this.setMap[val]) === 'undefined') return false

    let lastIndex = this.set.length-1,
        lastVal = this.set[lastIndex],
        deleteIndex = this.setMap[val]
    
    this.setMap[lastVal] = deleteIndex
    this.set[deleteIndex] = lastVal

    this.set.pop()
    delete this.setMap[val]

    return true
};

RandomizedSet.prototype.getRandom = function () {
    let random = Math.floor(Math.random() * this.set.length)
    //以随机数为下标返回
    return this.set[random]
};


 // 初始化一个空的集合。
let randomSet = new RandomizedSet();

// 向集合中插入 1 。返回 true 表示 1 被成功地插入。
console.log(randomSet.insert(1));

// 返回 false ，表示集合中不存在 2 。
console.log(randomSet.remove(2));

//return 

// 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
console.log(randomSet.insert(2));

// getRandom 应随机返回 1 或 2 。
console.log(randomSet.getRandom());

// 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
console.log(randomSet.remove(1));

// 2 已在集合中，所以返回 false 。
console.log(randomSet.insert(2));

// 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
console.log(randomSet.getRandom());