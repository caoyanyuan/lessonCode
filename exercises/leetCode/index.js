
// 数组 对象 函数
function deepCopy(obj) {
    let ret = {}
    for(let key in obj) {
        let cur = obj[key]

        if(cur instanceof Array || cur instanceof Object) {
            ret[key] = deepCopy(cur)
        }else{
            ret[key] = cur
        }
       
    }

    return ret
}


let obj = { 
    a: {
        a_1: '1',
        a_2: '2'
    }, 
    b: [1,3,4],
    c: function() {
        alert(1)
    }
}

let obj2 = deepCopy(obj)

console.log(obj, obj2)



