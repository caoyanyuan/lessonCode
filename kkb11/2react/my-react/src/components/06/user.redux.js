const initialState = { isLogin: false, loading: false }

// user reducer
export default (state = initialState, action) => {
    switch(action.type) {
        case 'requesetLogin':
            return { isLogin: false, loading: true, error: null };
        case 'loginSuccess':
            return { isLogin: true, loading: false , error: null}
        case "loginFailure":
            return { isLogin: false, loading: false, error: '登录失败' }
        default:
            return state
    }
}

// 派发动作依然是对象而非函数
export function login(uname) {
    return { type: "login", uname };
}