import React,{ Component } from "react"
import ReactDom from "react-dom"

function Dialog(props) {
    return <div>{props.children.footer}-{props.children.default}</div>
}

//具名复合
class App extends Component {
    // state是要传递的数据 
    render() {
        return (
            <Dialog>
                {{
                    default: (
                        <>
                            <span>我是默认的内容</span>
                        </>
                    ),
                    footer: <button onClick={() => alert("react确实好")}>确定</button>
                }}
            </Dialog>
        )
    }
}


//radio范例

function RadioGroup(props) {
    return (
        <div>
            {
                React.Children.map(props.children, child => {
                    return React.cloneElement(child, { name: props.name })
                })
            }
        </div>
    )
}

function Radio({children, ...rest}) {
    return (
        <label>
            <input type="radio" {...rest}></input>
            {children}
        </label>
    )
}

class App extends Component {
    // state是要传递的数据 
    render() {
        return (
           <div>
                <RadioGroup name="myradio">
                    <Radio value="vue">vue</Radio> 
                    <Radio value="react">react</Radio> 
                    <Radio value="ng">angular</Radio>
                </RadioGroup>
           </div>
        )
    }
}
