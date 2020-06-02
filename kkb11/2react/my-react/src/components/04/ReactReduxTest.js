
import React, {  Component } from "react";

import { connect } from "react-redux"



class ReduxTest extends Component {
    render() {
        return (
            <div>
                <p>{this.props.num}</p>
                <button onClick={this.props.add}>+</button>
                <button onClick={this.props.minus}>-</button>
            </div>
        )
    }
}

const ReactRedux = connect(
    state => ({num: state}),
    {
        add: () => ({type: 'add'}),
        minus: () => ({type: 'minus'})
    }
)(ReduxTest)

export default ReactRedux

