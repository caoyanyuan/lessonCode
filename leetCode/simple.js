// reverse-integer
/**
 *  给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 * 
 * 
 * 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2的32次幂,  2的31次幂 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
 */

var reverse = function(x) {
    let n = 0
    //console.log(x/10/10/10)

    while(x > 0 ) {
        n++
        x = parseInt(x / 10)
        
    }
};

console.log(reverse(321))