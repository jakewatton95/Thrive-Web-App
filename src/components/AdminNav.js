import React, {Component} from 'react';
import {NavLink, Switch, Route, Redirect} from 'react-router-dom'
import {Nav} from 'react-bootstrap'
import Home from './Home'
import ErrorPage from './ErrorPage'
import { Auth } from 'aws-amplify'

class AdminNav extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    
    render(){
        return(
            <React.Fragment>
                <button onClick={this.props.signOut}> Sign Out </button>
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
                        <NavLink to="/logout" activeClassName="active" className="nav-link">
                            Logout
                        </NavLink>
                    </div>
                </Nav>
                <Switch>
                    <Route path="/about">
                    </Route>
                    <Route path ="/logout">
                    </Route>
                    <Route exact path = "/" component={Home}>
                    </Route>
                    <Route exact path = "/error" component = {ErrorPage}>
                    </Route>
                    <Redirect to="/error"></Redirect>
                </Switch>
            </React.Fragment>      
        )
    }
}

export default AdminNav;