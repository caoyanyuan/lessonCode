export const UserService = {
    login(uname) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(uname == 'admin') {
                    resolve({uname, code: 0})
                }else{
                    reject('用户名错误 ')
                }
            }, 1000)
        })
    }
}