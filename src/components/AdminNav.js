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
                <Nav className= "nav-tabs">
                    <div className = "navItem">
                        <NavLink to="/admin" exact={true} activeClassName="active" className="nav-link">
                            Home
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/admin/students" exact={true} activeClassName="active" className="nav-link">
                            Students
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/admin/tutors" activeClassName="active" className="nav-link">
                            Tutors
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/admin/sessions" exact={true} activeClassName="active" className="nav-link">
                            Sessions
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/admin/billing" exact={true} activeClassName="active" className="nav-link">
                            Billing
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <button className="nav-link" onClick={this.props.signOut}> Sign Out </button>
                    </div>
                </Nav>
                <Switch>
                    <Route path="/admin/students">
                    </Route>
                    <Route path ="/admin/tutors">
                    </Route>
                    <Route path ="/admin/sessions">
                    </Route>
                    <Route path ="/admin/billing">
                    </Route>
                    <Route exact path="/admin" render={()=><Home userInfo={this.props.userInfo}/>}>
                    </Route>
                    <Redirect exact from='/' to="/admin"/>
                    <Route component = {ErrorPage}>
                    </Route>

                </Switch>
            </React.Fragment>      
        )
    }
}

export default AdminNav;