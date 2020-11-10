/** 26
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
 * 
给定一个 排序数组 ，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。


 */
//只要不和下一个相同。。就去重了
var removeDuplicates = function(nums) {
    let index = 0
    for( let i=0,len=nums.length; i<len; i++ ){
        if( nums[i] != nums[i+1] ) {
            nums[index] = nums[i]
            index++
        }
    }
    return index
};

console.log(removeDuplicates([1,1,2,3,4,3]))