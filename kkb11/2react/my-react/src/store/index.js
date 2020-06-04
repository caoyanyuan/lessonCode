import user from "./user.redux"
import { createStore,combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

const store = createStore(
    // user 具名作用域state
    combineReducers({user}),
    applyMiddleware(thunk)
)

export default store