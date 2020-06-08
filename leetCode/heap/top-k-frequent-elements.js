/**
 * 347
 * 给定一个非空的整数数组，返回其中出现频率最高的k个元素。
 * 
你可以假设给定的 k 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
你的算法的时间复杂度必须优于 O(n log n) , n 是数组的大小。
题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的。
你可以按任意顺序返回答案。

https://github.com/sisterAn/JavaScript-Algorithms/issues/61
https://leetcode-cn.com/problems/top-k-frequent-elements/solution/javascript-qian-k-ge-gao-pin-yuan-su-by-user7746o/

1. nlogn 复杂度是怎么样的  n* (1-n)
 */

//0 我凌乱的思绪 xxxx
var topKFrequent_0 = function(nums, k) {
    var temp = {}, arr = [], temp2 = {},
        ret = []

    nums.map(num => {
        if(temp[num] != undefined) {
            
            temp[num] ++
        }else{
            temp[num] = 1
        }
    })

    for(let key in temp) {
        arr.push(temp[key])
        temp2[temp[key]] = key
    }

    arr.reduce((a, b) => b-a)

    console.log(arr)
    arr.forEach(num => {
        if(num >= k) {
            ret.push(temp2[num])
        }
    })

    return ret
};

//1 数组+map  时间 nlogn 空间  其他解法 不懂
let topKFrequent = function(nums, k) {
    let map = new Map(), arr = [...new Set(nums)]
    nums.map((num) => {
        if(map.has(num)) map.set(num, map.get(num)+1)
        else map.set(num, 1)
    })
    
    return arr.sort((a, b) => map.get(b) - map.get(a)).slice(0, k);
};

//2. map+小顶堆
/**
 * 
遍历一遍数组统计每个元素的频率，并将元素值（ key ）与出现的频率（ value ）保存到 map 中
通过 map 数据构建一个前 k 个高频元素小顶堆，小顶堆上的任意节点值都必须小于等于其左右子节点值，即堆顶是最小值。
具体步骤如下：

    遍历数据，统计每个元素的频率，并将元素值（ key ）与出现的频率（ value ）保存到 map 中
    遍历 map ，将前 k 个数，构造一个小顶堆
    从 k 位开始，继续遍历 map ，每一个数据出现频率都和小顶堆的堆顶元素出现频率进行比较，如果小于堆顶元素，则不做任何处理，继续遍历下一元素；如果大于堆顶元素，则将这个元素替换掉堆顶元素，然后再堆化成一个小顶堆。
    遍历完成后，堆中的数据就是前 k 大的数据
 */

let topKFrequent_2 = function(nums, k) {
    let map = new Map(), heap = [,]
    nums.map(num => {
        if(map.has(num)) map.set(num, map[num]++)
        else map.set(num, 1)
    })

    //如果元素数量小于等于k
    if(map.size <= k) {
        return [ ...map.keys() ]
    }

    let i = 0
    map.forEach((value, key) => {
        if(i < k) {
            // 取前k个建堆, 插入堆
            heap.push(key)
            // 原地建立前 k 堆
            if(i === k-1) buildHeap(heap, map, k)
        } else if(map.get(heap[1]) < value) {
            // 替换并堆化
            heap[1] = key
            // 自上而下式堆化第一个元素
            heapify(heap, map, k, 1)
        }
        i++
    })
    // 删除heap中第一个元素
    heap.shift()
    return heap 
}

let buildHeap = (heap, map, k) => {
    if(k === 1) return
    //从最后一个非叶子节点开始，自上而下式堆化
    for(let i=Math.floor(k/2); i>=1; i--) {
        heapify(heap, map, k, i)
    }
}

let heapify = (heap, map, k, i) => {
    // 自上而下式堆化
    while(true) {
        let minIndex = i
        if(2*i <= k && map.get(heap[2*i]) < map.get(heap[i])) {
            minIndex = 2*i
        }
        if(2*i+1 <= k && map.get(heap[2*i+1]) < map.get(heap[minIndex])) {
            minIndex = 2*i+1
        }
        if(minIndex !== i) {
            swap(heap, i, minIndex)
            i = minIndex
        } else {
            break
        }
    }
}


// 交换
let swap = (arr, i , j) => {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

console.log(topKFrequent([1,1,1,2,2,3], 2))
console.log(topKFrequent([3,0,1,0], 2))
