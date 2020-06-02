export function createStore(reducer, enhancer){ 
    let currentState = undefined; 
    let currentListeners = []; 

    //如果有中间件来加强 就走入中间件的逻辑
    if(enhancer) {
        return enhancer(createStore)(reducer)
    }

    //提供getState方法
    function getState(){ 
        return currentState 
    }
    //订阅方法： 把订阅函数 push到 数组中
    function subscribe(listener){ 
        currentListeners.push(listener) 
    }
    //更新方法： 就是执行reducer  顺便把订阅方法都执行了
    function dispatch(action){ 
        currentState = reducer(currentState, action) 
        currentListeners.forEach(v=>v()) 
        return action 
    }
    // 第一次设置下默认值， 设置一个不太可能会卸载reducer里面的值
    dispatch({type:'@impossible/Type@'}) 
    return { 
        getState, 
        subscribe, 
        dispatch
    } 
}