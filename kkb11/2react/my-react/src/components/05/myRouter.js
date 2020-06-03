import { createBrowserHistory } from "history"
import React, { Component, Children } from "react"

import matchPath from "./matchPath"


const RouterContext = React.createContext();

export class BrowserRouter extends Component { 
    constructor(props) { 
        super(props); 
        this.history = createBrowserHistory(this.props); 
        this.state = { 
            location: this.history.location 
        };
        this.unlisten = this.history.listen(location => { 
            this.setState({ location }); 
        }); 
    }

    componentWillUnmount() {
        this.unlisten && this.unlisten()
    }

    render() {
        return (
            <RouterContext.Provider 
                children={this.props.children} 
                value={{
                    history: this.history,
                    location: this.state.location
                }}
            />
        )
    }
}

export class Route extends React.Component {
    render() {
        return (
            <RouterContext.Consumer>
                { context => {
                    const location = context.location;
                    const match = matchPath(location.pathname, this.props)

                    const props = { ...context, match }

                    let { children, component, render } = this.props

                    if(children && typeof children === 'function') {
                        children = children(props)
                    }

                    return (
                        <RouterContext.Provider value={props} >
                            { children && React.Children.count(children) > 0 
                            ? children
                            : props.match
                            ? component
                                ? React.createElement(component, props)
                                : render
                                ? render(props)
                                : null
                            : null}
                        </RouterContext.Provider>
                    ) 
                } } 
            </RouterContext.Consumer>
        )
    }
}

export class Link extends React.Component {
    handleClick(event, history) {
        event.preventDefault()
        history.push(this.props.to)
    }

    render() {
        const { to, ...rest } = this.props
        return (
            <RouterContext.Consumer>
                {context => {
                    return (
                        <a {...rest} 
                            onClick={event => this.handleClick(event, context.history)}
                            href={to}
                        >{this.props.children}</a>
                    )
                }}
            </RouterContext.Consumer>
        )
    }
}
