//群里碰见的面试题 玩一下

/*请通过示例找到算法规律
"aaba", 'abac' => 'aba'
'a9310990', '133990b' => ['3990','1990']
'vue','fusev' => 'ue'
'ab3dc','cae3fd' => 'a3d

console.time(1)
console.timeEnd(1)

想不出来 
*/

function find(a, b) {
    let _a = a, i=0, ret = []
    
    while(_a) {
        let str = _a.slice(0, 1),
            bIndex = findAllIndex(b, str)

        //console.log(bIndex)

        if(bIndex.length > 0) {
            ret.push({
                str,
                i,
                bIndex
            })
        }
        i=i+1
        _a = _a.slice(1)

        console.log(ret,str)
    }
}

function findAllIndex(str, str2) {
    let _index = str.indexOf(str2),
        ret = []

    while(_index != -1) {
        ret.push(_index)

        _index = str.indexOf(str2, _index+1)
    }
    return ret.join(',')
}

find('aaba', 'abac')
findAllIndex('aaba', 'a')

