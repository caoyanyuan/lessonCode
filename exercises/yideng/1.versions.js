/**
 * 规则化处理数组，版本号处理函数
 *  => 1.5 1.45 3.3.3 6
 */

var versions = [ '1.45', '1.5', '6','3.3.3']

function sortVersions(versions) {
    versions.sort((a, b) => {
        let arr = a.split('.'),
            arr1 = b.split('.'),
            len  = arr.length > arr1.length ? arr1.length : arr.length

        for(let i=0; i<len; i++) {
            let m = arr[i] || 0,
                n = arr1[i] || 0
            
            if(m-n !=0) return m-n 
        }
    })

}

sortVersions(versions)

console.log(versions)
