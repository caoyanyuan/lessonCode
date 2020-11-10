
/*
判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
*/

//1. 反转数字法
var isPalindrome1 = function(x) {
    if(x<0) {
        return false
    }
    let num = 0,
        _x = x

    while(x>0){
        num = num*10 + x%10

        x = Math.floor(x/10)
    }

    return _x == num
};

//双指针： 逐位判断法： 判断左右边每一位的数是否相等
var isPalindrome = function(x) {
    if(x<0) return false
    if(x<10) return true

    let right = 1, left = 0, sum = x

    while(sum>0) {
        right++;
        sum = Math.floor(sum/10)
    }

    //获取每一位上的数字
    let getNum = (n) => {
        return Math.floor(x % Math.pow(10, n) / Math.pow(10, n-1))
    }

    while(left < right) {
        if(getNum(left) != getNum(right)) return false
        left++;
        right--;
    }
    return true
}



console.log(isPalindrome(121))
console.log(isPalindrome(-121))
console.log(isPalindrome(12021))

