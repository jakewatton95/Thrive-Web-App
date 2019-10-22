import React, {Component} from 'react';
import {NavLink, Switch, Route, Redirect} from 'react-router-dom'
import {Nav} from 'react-bootstrap'
import Home from './Home'
import ErrorPage from './ErrorPage'
import { Auth } from 'aws-amplify'

class StudentNav extends Component {
    constructor(props){
        super(props)
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
                        <NavLink to="/student" exact={true} activeClassName="active" className="nav-link">
                            Student
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/student/request" activeClassName="active" className="nav-link">
                            request
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/student/sessions" exact={true} activeClassName="active" className="nav-link">
                            Sessions
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/student/s" exact={true} activeClassName="active" className="nav-link">
                            Billing
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <button className="nav-link" onClick={this.props.signOut}> Sign Out </button>
                    </div>
                </Nav>
                <Switch>
                    <Route exact path="/student" component={ErrorPage}>
                    </Route>
                    <Route exact path ="/student/request">
                    </Route>
                    <Route exact path ="/student/sessions">
                    </Route>
                    <Route exact path ="/student/billing">
                    </Route>
                    <Route exact path = "/" component={Home}>
                    </Route>
                    <Route component = {ErrorPage}>
                    </Route>
                </Switch>
            </React.Fragment>      
        )
    }
}

export default StudentNav