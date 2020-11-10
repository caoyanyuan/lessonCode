/**
 * https://leetcode-cn.com/problems/container-with-most-water/
 * 11. 盛最多水的容器
 * 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。
 * 在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 */

//我的 复杂度 n2
var maxArea_1 = function(height) {
    if(!height) return 0

    let len = height.length, max = 0
    for(let i=0; i<len; i++) {
        for(let j=i; j<len; j++) {
            let area = Math.min(height[j], height[i]) * (j - i)
            max = Math.max(max, area)
        }
    }
    return max
};

//双指针法 o(n) 
var maxArea = function(height) {
    if(!height) return 0

    let left = 0, right = height.length - 1, max = 0
    while(left <= right) {
        let area = Math.min(height[left], height[right] ) * (right - left)
        max = Math.max(max, area)

        if(height[left] < height[right]) {
            ++left
        }else{
            --right
        }
    }
    return max
}


maxArea([1,8,6,2,5,4,8,3,7])