import ReactDom from "react-dom"
import React from "react";

import ReduxTest from "./components/04/ReduxTest"

import ReactReduxTest from "./components/04/ReactReduxTest"
import FormTest from "./components/03/MyForm"

import store from "./components/04/store"
import { Provider } from 'react-redux'




ReactDom.render(
    // redux试用
    // <ReduxTest/>, 
    // <Provider  store={store}>
    //     <ReactReduxTest />
    // </Provider>
    <FormTest />
    ,
    document.getElementById("root"))


