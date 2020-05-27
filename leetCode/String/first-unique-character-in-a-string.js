/**
 * 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
 * 
示例：
s = "leetcode"
返回 0.

s = "loveleetcode",
返回 2.
 */

function firstUniqChar1(str) {
    let _str = str, ret = ""

    while(_str) {
        ret = _str.slice(0, 1)
        let fIndex = str.indexOf(ret)
        console.log(fIndex)
        if(str.indexOf(ret, fIndex+1) == -1) {
            return fIndex
        }
        _str = _str.slice(1)
    }

    return -1
}


const firstUniqChar = (w) => {
    if(w.length <= 1) return w.length - 1;
    if(w.length > 26) {
        const ps = 'abcdefghijklmnopqrstuvwxyz';
        let found = w.length;
        for (let i = 0; i < ps.length; ++i) {
            const left = w.indexOf(ps[i]);
            if (left === w.lastIndexOf(ps[i])) {
                if (found > left && left > -1) found = left;
            }
            const right = w.indexOf(ps[ps.length - 1 - i]);
            if (right === w.lastIndexOf(ps[ps.length - 1 - i])) {
                if (found > right && right > -1)
                    found = right;
            }
            if(found === 0) break;
            if (i >= ps.length / 2) {
                break;
            }
        }
        if(found === w.length) return -1;
        return found;
    } else {
        let i = 0;
        while(true) {
            if(w.indexOf(w[i], i + 1) === -1 && w.lastIndexOf(w[i], i - 1) === -1) {
                return i;
            } else if(i === 0) {
                if(w.indexOf(w[i], i + 1) === -1) return i;
            } else if(i === w.length - 1) {
                if(w.lastIndexOf(w[i], i - 1) === -1) return i;
                return -1;
            }
            ++i;
        }
    }
}

var firstUniqChar2 = function(s) {
    let map = {}
    for (const char of s) {
        map[char] = ++map[char] || 0
    }
    for (let i = 0; i < s.length; ++i) {
        if (map[s[i]] == 0) return i
    }
    return -1
};



console.time(1)
console.log(firstUniqChar2('ABABD666'))
console.timeEnd(1)
