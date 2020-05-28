import React,{ Component } from "react"
import ReactDom from "react-dom"

import Calculator from "./components/temperature"

class Clock extends Component {
    constructor() {
        super()

        this.state = { counter: 0 }
    }
    componentDidMount() {
     
    }
    changeValue = () => {
      this.setState({counter: this.state.counter+1})
      console.log(this.state.counter) // 1
    }
    render() {
        return <div onClick={this.changeValue}>{this.state.counter}</div>
    }
}

ReactDom.render(<Calculator/>, document.getElementById("root"))


