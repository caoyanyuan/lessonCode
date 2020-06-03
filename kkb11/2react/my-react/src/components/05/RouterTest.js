import React, { useState } from "react";
import { BrowserRouter, Link, Route, Redirect } from "react-router-dom";

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

function PrivateRoute({ component: Component, isLogin, ...rest }) { 
    // 结构props为component和rest // rest为传递给Route的属性 
    return ( <Route {...rest} render={ 
                // 执行登录判断逻辑从而动态生成组件
                props => isLogin ? ( 
                    <Component {...props} /> ) : ( 
                    <Redirect to={{ pathname: "/login", state: { redirect: props.location.pathname } 
                    }} 
                />
            ) 
        } 
        /> 
    ); 
}

    export default ReduxTestContainer