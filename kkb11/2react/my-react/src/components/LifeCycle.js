import React,{ Component } from "react"
import ReactDom from "react-dom"

import Calculator from "./components/temperature"

class LifeCycle extends Component {
    constructor(props) {
        super(props)
        console.log('1. 组件函数执行');
    }
    componentWillMount() {
        // 此时可以访问状态和属性，可进行api调用等
        console.log('2. 组件将要挂载');
    }   
    componentDidMount() {
        //组件已挂载、可进行状态更新操作
        console.log('3 组件已挂载')
    }
    componentWillReceiveProps() {
        console.log('4 将要接受属性传值')
    }
    shouldComponentUpdate() {
        console.log('5 组件是否要更新');
    }
    componentWillUpdate() { 
        // 组件将要更新，可做更新统计
        console.log("6.组件将要更新"); 
    }
    componentDidUpdate() { 
        // 组件更新 
        console.log("7.组件已更新"); 
    }
    componentWillUnmount() { 
        // 组件将要卸载, 可做清理工作 
        console.log("8.组件将要卸载"); 
    }
    render() {
        return (
            <div>生命周期</div>
        )
    }
}