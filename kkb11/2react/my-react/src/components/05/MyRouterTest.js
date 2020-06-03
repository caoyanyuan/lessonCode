import React, { useState } from "react";
// import BrowserRouter from "./BrowserRouter";
// import Link from "./Link";
// import Route from "./Route" ;

import { BrowserRouter, Link, Route } from "./myRouter"

function Detail({ match, history, location }) {
    // 输入内容状态及设置内容状态的方法 
    const [pname, setPname] = useState("");
    // 键盘事件处理 
    const onAddFruit = e => {
        if (e.key === "Enter") {
            setPname("");
        }
    };

    console.log(match, history, location)
    return (
        <div>
            <input type="text" value={pname} onChange={e => setPname(e.target.value)} />
        </div>
    );
}

function ReduxTestContainer({ }) {
    const [loading, setLoading] = useState(true)
    const [fruits, setFruits] = useState("")

    setTimeout(() => {
        setFruits(['香蕉'])
        setLoading(false)
    }, 1000)

    return (
        //顶层添加BrowserRouter
        <BrowserRouter>
            {/* 导航的使用 */}
            <nav>
                <Link to="/">水果列表</Link>|
                <Link to="/detail">详情</Link>
            </nav>
            <div>
                {/* 根路由要添加exact，render可以实现条件渲染 */}
                <Route exact path="" render={
                    props => loading ? <div>数据加载中...</div> : <Route path="/detail2" component={Detail} />
                } />
                <Route path="/detail" component={Detail} />
            </div>
        </BrowserRouter>
    );
}


export default ReduxTestContainer