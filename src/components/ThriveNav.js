import React, {Component} from 'react';
import {NavLink, Switch, Route, Redirect} from 'react-router-dom'
import {Nav} from 'react-bootstrap'
import Home from './Home'
import ErrorPage from './ErrorPage'

class ThriveNav extends Component {
    constructor(){
        super()
        this.state = {}
    }
    
    render(){
        return(
            <React.Fragment>
                <Nav className= "nav-tabs">
                    <div className = "navItem">
                        <NavLink to="/" exact={true} activeClassName="active" className="nav-link">
                            Home
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/about" activeClassName="active" className="nav-link">
                            About Us
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/Login/" activeClassName="active" className="nav-link">
                            Login
                        </NavLink>
                    </div>
                </Nav>
                <Switch>
                    <Route path="/about">
                    </Route>
                    <Route path ="/login">
                    </Route>
                    <Route path ="/logout">
                    </Route>
                    <Route exact path = "/" component={Home}>
                    </Route>
                    <Route component = {ErrorPage}></Route>
                </Switch>
            </React.Fragment>      
        )
    }
}

export default ThriveNav;