import ReactDom from "react-dom"
import React from "react";

import ReduxTest from "./components/04/ReduxTest"

import FormTest from "./components/03/MyForm"

import store from "./components/06/store"
import { Provider } from 'react-redux'

import ReactReduxTest from "./components/04/ReactReduxTest"
import MyReduxTest from "./components/04/MyReduxTest"
import RouterTest from "./components/05/RouterTest"
import MyRouterTest from "./components/05/MyRouterTest"
import SagaLoginTest from "./components/06/SagaLoginTest"










ReactDom.render(
    // redux试用
    // <ReduxTest/>, 
    // <Provider  store={store}>
    //     <ReactReduxTest />
    // </Provider>
    // <FormTest />
    // <MyReduxTest/>

    <Provider  store={store}>
        <SagaLoginTest />
    </Provider>
    ,
    document.getElementById("root"))


