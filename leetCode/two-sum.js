/*  给定一个整数数组 nums 和一个目标值 target，
    请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
    你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
    
    给定 nums = [2, 7, 11, 15], target = 9

    因为 nums[0] + nums[1] = 2 + 7 = 9
    所以返回 [0, 1]

*/

/**
 * 特别注明： 这个问题可以联想到 点位聚合的算法问题
 * 
 * 之前：要计算每两个点之前的距离 复杂度是 o(n2)
 * 改善：可以调整复杂度为o(n) 
 * 
 * 结果：达不到改善。待继续学习算法之后在讨论。 保留问题
 */

//自己第一次 执行300ms
var twoSum = function(nums, target) {
    let fIndex = null, sIndex = null
    nums.find((num, index) => {
        let res = target - num,
            isExistedRes = nums.find((rnum, rIndex) => {
                let flag = rnum == res&&index!=rIndex
                if(flag) {
                    fIndex = index
                    sIndex = rIndex
                }
                return flag
            })
        return isExistedRes
    })
    return [fIndex, sIndex]
};

//js比较优秀的代码  执行100+ms 这个复杂度也是 n
var twoSum2 = function(nums, target) {
    let i = nums.length;
    while(i > 1) {
        let last = nums.pop();
        if (nums.indexOf(target - last) > -1) {
            return [nums.indexOf(target - last), nums.length]
        }
        i--
    }
};

//考虑到复杂度 n
var twoSum3 = function(nums, target) {
    let resArr = [],
        ret = []
    
    nums.find((num,index) => {
        let sIndex = resArr.indexOf(target-num),
            flag = sIndex > -1
        if( flag ) {
            ret = [index, sIndex]
            return flag
        }
        resArr.push(num)
    })
    return ret
};

// 4比3 更快 所以for还是比find更快
var twoSum4 = function(nums, target) {
    let resArr = [],
        len = nums.length
    for(let i=0; i<len; i++) {
        let sIndex = resArr.indexOf(target - nums[i])
        
        if(sIndex > -1) {
            return [i, sIndex]
        }
        resArr.push(nums[i])
    }
};

let nums = [1,5,3,2,4], target = 6
console.log(twoSum3(nums, 6))