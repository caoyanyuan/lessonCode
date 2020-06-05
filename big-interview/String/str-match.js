let matchMap = {
    '(': ')',
    "[": ']',
    "{": '}',
}

function match(str) {
    if(!str) return true
    if(str.length%2!=0) return false
    
    var flag = true
    while(str) {
        let prev = str.slice(0, 1)
        
        str = str.slice(1)
        let _index = str.indexOf(matchMap[prev]),
            lastIndex = str.lastIndexOf(matchMap[prev]) 

        console.log(str, _index, lastIndex)
        if(_index == 0) {
            str = str.slice(1)
        }else if(lastIndex == str.length - 1) {
            str = str.slice(0, str.length-1)
        }else{
            flag =  false
            return false
        }
    }

    return flag
}



