/**
 * 
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
        // 执行一次所有的中间件  返回 (dispatch) => {}
        const middlewareChain = middlewares.map(middleware => middleware(midApi)) 

        console.log(middlewareChain)
        // 将所有的 
        dispatch = compose(...middlewareChain)(store.dispatch) 

        console.log(dispatch)

        return { ...store, dispatch }
    }
}

function compose(...funcs) {
    if(funcs.length == 1) {
        return funcs[0]
    }
    return funcs.reduce((left,right) => {
        console.log(left)
        return (...args) => right(left(...args))
    })
}