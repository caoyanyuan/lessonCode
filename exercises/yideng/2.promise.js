//Promise.allSettled(iterable)

// 1. 例子
const resolved = Promise.resolve(42)
const rejected = Promise.reject(-1)

const allSettled = Promise.allSettled([resolved, rejected])

allSettled.then(res => {
    console.log(res)
})

// 
// [
//     { status: 'fulfilled', value: 42 },
//     { status: 'rejected', reason: -1 }
//   ]

/** 2. 特点
 * 1.Promise.allSettled 方法接受一组Promise实例作为参数,返回一个新的Promise
 * 2.只有等到所有promise都返回结果，不论fulfilled还是rejected， 包装实例才会结束
 * 3.返回的新Promise实例，一旦结束。状态总是fulfilled。不会变成rejected
 * 4.新的Promise实例给监听函数传递一个数组results。 该数组的每个成员都是一个对象，对应的Promise.allSettled
 * 里的Promise实例。每个对象都有status熟悉。fulfilled的时候，会有value，rejected的时候。会有reason
 */


// 3.手写实现
const formatSettledResult = (success, value)  =>
    success 
        ? { status: 'fulfilled', value } 
        : { status: 'fulfilled', reason: value }

Promise.all_settled  = (iterators) => {
    const promises = Array.from(iterators)
    const num = promises.length
    const results = new Array(num)
    let resultNum = 0

    return new Promise((resolve) => {
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(value => {
                results[index] = formatSettledResult(true, value)

                if(++resultNum == num) {
                    resolve(results)
                }
            }).catch(error => {
                results[index] = formatSettledResult(true, error)

                if(++resultNum == num) {
                    resolve(results)
                }
            })
        })
    })
}

const m = Promise.all_settled([resolved, rejected])
m.then(res => {
    console.log(res)
})

// 4 使用场景： 不关心异步操作的结果，只关心这些操作有没有结束。