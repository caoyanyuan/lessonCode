import user from "./user.redux"; 
import createSagaMiddleware from "redux-saga"; 
import mySaga from "./sagas";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger"

//创建sage中间件并注册
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    combineReducers({user}),
    applyMiddleware(sagaMiddleware,logger)
)
//中间件运行saga
sagaMiddleware.run(mySaga)

export default store