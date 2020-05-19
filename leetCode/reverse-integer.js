// 
/**
 *  给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 * 
 * 
 * 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2的32次幂,  2的31次幂 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
 */

 // while的使用

var reverse = function(x) {
    let _x = Math.abs(x)
    let ret = 0

    while(_x > 0) {
        ret = ret * 10 + _x % 10

        _x = Math.floor(_x/10)
    }

    if(x < 0) {
        return ret <= Math.pow(2,31) ? -ret : 0
    }else{
        return ret > Math.pow(2, 31) ? ret : 0
    }
};

console.log(reverse(321))