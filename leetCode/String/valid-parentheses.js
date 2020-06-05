/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

第20题
 */

// 栈的实践
function isValid(s) {
    if(!str) return true
    if(str.length%2!=0) return false
    var map = {
        "(": ")",
        "[": "]",
        "{": "}"
    }
    var leftArr = []
    for (var ch of s){
        if (ch in map) leftArr.push(ch); //为左括号时，顺序保存
        else { //为右括号时，与数组末位匹配
            if(ch != map[leftArr.pop()]) return false;
        }
    }
    return !leftArr.length //防止全部为左括号
}

//true
console.log(match("(([]){})"))  
//true
console.log(match('()[]{}'))
//false
console.log(match('(]'))
//false
console.log(match('([))'))
//true
console.log(match('{[]}'))