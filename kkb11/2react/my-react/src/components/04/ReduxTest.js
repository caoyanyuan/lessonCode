
import React, {  Component } from "react";

import { createStore } from "redux"

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

const store = createStore(counterReducer)


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

