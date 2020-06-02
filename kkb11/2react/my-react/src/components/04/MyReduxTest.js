import React, { Component } from "react"; 
import { createStore } from "./myRedux";
import { applyMiddleware } from "./applyMw"

const counterReducer = (state = 0, action) => {
    switch(action.type) {
        case "add":
            return state + 1
        case 'minus':
            return state - 1
        default: 
            return state
    }
}

const store = createStore(counterReducer, applyMiddleware([ thunk, logger]))


function logger({dispatch, getState}) { 
    return dispatch => action => { 
        // 中间件任务 
        console.log(action.type + '执行了！！'); 
        // 下一个中间件 
        return dispatch(action); 
    } 
}

function thunk({dispatch, getState}) {
    return dispatch => action => { 
        if (typeof action == 'function') { 
            return action(dispatch, getState) 
        }
        return dispatch(action) 
    }
}

class ReduxTest extends Component {
    componentDidMount() {
        //state发生更改订阅作对应的刷新
        store.subscribe(() => {
            this.forceUpdate()
        })
    }
    render() {
        return (
            <div>
                <p>{store.getState()}</p>
                <button onClick={() => store.dispatch({type: 'add'})}>+</button>
                <button onClick={() => store.dispatch({type: 'minus'})}>-</button>
            </div>
        )
    }
}

export default ReduxTest