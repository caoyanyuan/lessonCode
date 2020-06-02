import React from 'react'; 

//设计 form
// .扩展表单的高阶组件，提供输入控件包装、事件处理、表单校验等
function MyFormCreate(Comp) {
    return class extends React.Component {
        constructor(props) { 
            super(props); 
            this.options = {}; 
            this.state = {}; 
        }
        //处理输入事件，输入中进行校验
        handleChange = e => {
            let { name, value } = e.target;
            this.setState({
                [name]: value
            }, () => {
                this.validateField(name)
            })
        }
        //验证所有字段， 将结果传入回调函数，且调用回调函数
        validate = (cb) => {
            let isValidated = true
            
            Object.keys(this.options).forEach(field => {
                console.log(field)
                isValidated = this.validateField(field)
            })

            cb && cb(isValidated)
        }
        //验证单个字段
        validateField(field) {
            let flag = true,
                {rules} = this.options[field]
            rules.some(rule => {
                if(rule.required) {
                    let msg = !this.state[field] && rule.message

                    this.setState({
                        [field+'errorMsg']: msg
                    })
                    
                    flag = false
                    return false
                }
            })
            return flag
        }
        //字段装饰器
        getFieldDec = (field, option) => {
            this.options[field] = option
            return InputComp => (
                <div>
                    {React.cloneElement(InputComp, {
                        name: field,
                        value: this.state[field] || "",
                        onChange: this.handleChange
                    })}
                    {/* 校验信息 */}
                    {this.state[field+'errorMsg']&&(<p style={{color: 'red'}}>{this.state[field+'errorMsg']}</p>)}
                </div>
            )
        }
        //将getFieldDec和validate 挂载到新组件中
        render() {
            return (
                <div>
                    <Comp {...this.props} getFieldDec={this.getFieldDec} validate={this.validate} />
                </div>
            )
        }
    }
}

@MyFormCreate
class MyFormTest extends React.Component{
    onSubmit = () => {
        this.props.validate(flag => {
            console.log(flag)
        })
    }
    render() {
        let {getFieldDec} = this.props

        return (
            <div>
                {getFieldDec('username', {
                    rules: [{required: true, message: '请输入用户名'}]
                })(<input type="text" />)}
                {getFieldDec('password', {
                    rules: [{required: true, message: '请输入密码'}]
                })(<input type="password" />)}
                <button onClick={this.onSubmit}>登录</button>
            </div>
        )
    }
}

export default MyFormTest