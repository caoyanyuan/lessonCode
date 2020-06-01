// 创建上下文 
const Context = React.createContext(); 
// 获取Provider和Consumer 
const Provider = Context.Provider; 
const Consumer = Context.Consumer;

function Child(props) {
    return <div onClick={props.add}>{props.counter}</div>
}

class ContextTest extends React.Component {
    // state是要传递的数据 
    state = { counter: 0 }; // add方法可以修改状态
    add = () => { 
        this.setState(nextState => ({ 
            counter: nextState.counter + 1 
        })); 
    }
    render() {
        return (
            //使用
            <Provider value={{ counter: this.state.counter, add: this.add }}> 
                {/* Consumer中内嵌函数，其参数是传递的数据，返回要渲染的组件 */}
                    {/* 把value展开传递给Child */} 			
                    <Consumer>{value => <Child {...value} />}</Consumer> 
                    <Consumer>{value => <Child {...value} />}</Consumer> 
            </Provider>
        )
    }
}



//高阶化
function Child(props) {
    return <div onClick={props.add} name={props.name}>{props.counter}</div>
}

function withConsumer(Consumer) {
    return Comp => props => {
        return <Consumer>{value  => <Comp {...value} {...props} /> }</Consumer>
    }
}

let WithChild = withConsumer(Consumer)(Child)

class ContextTest extends React.Component {
    // state是要传递的数据 
    state = { counter: 0 }; // add方法可以修改状态
    add = () => { 
        this.setState(nextState => ({ 
            counter: nextState.counter + 1 
        })); 
    }
    render() {
        return (
            //使用
            <Provider value={{ counter: this.state.counter, add: this.add }}> 
                {/* Consumer中内嵌函数，其参数是传递的数据，返回要渲染的组件 */}
                    {/* 把value展开传递给Child */} 			
                    <WithChild name='foo' /> 
                    <WithChild name='bar' /> 
            </Provider>
        )
    }
}