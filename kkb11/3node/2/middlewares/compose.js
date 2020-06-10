function compose(mws) {
    return function() {
        return dispatch(0)
        function dispatch(i) {
            let fn = mws[i]
            if(!fn) {
                return Promise.resolve()
            }else{
                fn(function next(){
                    return dispatch(i + 1)
                })
            }
        }
    }
}

//redux式 旧版本
function compose_2(mws) {
    return mws.reduceRight((a, b) => () => b(a));
}

//redux式 新版本
function compose_3(mws) {
    return mws.reduce((a, b) => arg => a(() => b(arg)));
};

async function fn1(next) {
    console.log("fn1")
    await next()
    console.log('end fn1')
}

async function fn2(next) {
    console.log("fn2")
    await next()
    console.log('end fn2')
}
async function fn3(next) {
    console.log("fn3")
}

const mws = [ fn1, fn2, fn3 ]
const finalFn = compose(mws)
//console.log(finalFn)
finalFn()


