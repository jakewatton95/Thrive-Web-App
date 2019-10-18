import React, {Component} from 'react'
import {Nav} from 'react-bootstrap'
import {NavLink, Switch, Route} from 'react-router-dom'

class App extends Component{
    constructor(){
        super()
    }

    render(){
        return (
           <React.Fragment>
                <NavLink to="/react" activeClassName="/react">
                    React
                </NavLink>
                <br/>
                <NavLink to= "/">
                    Home
                </NavLink>
                <Switch>
                    <Route path="/react">
                        <div>React</div>
                    </Route>
                    <Route path = "/">
                        <div>Slam</div>
                    </Route>
                </Switch>
            </React.Fragment>    
        )
    }
}

export default App; 


