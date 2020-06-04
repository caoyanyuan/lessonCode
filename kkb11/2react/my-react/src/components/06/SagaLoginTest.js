import { login } from './user.redux'
import { Redirect, Route, BrowserRouter, Link } from "react-router-dom"
import React from "react"
import { connect } from "react-redux"

const LoginComp = connect(
    state => ({
        isLogin: state.user.isLogin,
        loading: state.user.loading,
        error: state.user.error
    }),
    { login }
)(({location, isLogin, login, loading, error}) => {
    const redirect = location.state.redirect || '/'

    console.log(isLogin)
    if(isLogin) return <Redirect to={redirect} />

    return (
        <div>
            <p>用户登录</p>
            <hr />
            { error && <p>{error}</p> }
            <button onClick={() => login('xx')} disabled={error}>登录</button>
        </div>
    )
}) 

const PrivateRoute = connect(state => ({
    isLogin: state.user.isLogin
}))(({ component: Component, isLogin, ...rest }) =>{ 
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
})

function Detail() {
    return (
        <div>我已经登录了呢</div>
    )
}

export default function SagaLoginTest() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/detail">来登录呀</Link>
            </nav>
            <div>
                <PrivateRoute path="/detail" component={ Detail }  />
                <Route path="/login" component={LoginComp} />
            </div>
        </BrowserRouter>
    );
}

