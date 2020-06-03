/**
 *  createStore(counterReducer, applyMiddleware(logger, thunk))
 */
/**实现中间件 */
export function applyMiddleware(middlewares) {
    return createStore => (...args) => {
        //第一步先创建好原来的store
        const store = createStore(...args)

        let dispatch = store.dispatch
        const midApi = { 
            getState: store.getState, 
            dispatch:(...args)=>dispatch(...args)
        }
        // 执行一次所有的中间件  返回数组 dispatch => action =>{}
        const middlewareChain = middlewares.map(middleware => middleware(midApi)) 
        
        // compose 将数组的 dispatch => action =>{}   转换成一个 dispatch => action =>{} 
        // 执行传入 dispatch 得到新的dispatch
        dispatch = compose(middlewareChain)(store.dispatch) 

        return { ...store, dispatch }
    }
}



function compose(funcs) {
    if(funcs.length == 1) {
        return funcs[0]
    }
    return funcs.reduce((left,right) => ((...args) => right(left(...args))))
}

let funcs = [
    a => b => {
        console.log(b)
        return a(b)
    },
    a => b => {
        console.log(b+2)
        return a(b)
    }
]

let a = (m) => {
    console.log(m, '222')
}

let m = compose(funcs)(a)
m(2)
//funcs[0](1)(2)
console.log()