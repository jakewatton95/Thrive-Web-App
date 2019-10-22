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
                        <NavLink to="/student" exact={true} activeClassName="active" className="nav-link">
                            Home
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/student/schedule" activeClassName="active" className="nav-link">
                            Schedule
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/student/tutors" exact={true} activeClassName="active" className="nav-link">
                            Tutors
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/student/billing" exact={true} activeClassName="active" className="nav-link">
                            Billing
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <button className="nav-link" onClick={this.props.signOut}> Sign Out </button>
                    </div>
                </Nav>
                <Switch>
                    <Route exact path="/student" render={()=><Home userInfo={this.props.userInfo}/>}>
                    </Route>
                    <Route exact path ="/student/schedule">
                    </Route>
                    <Route exact path ="/student/tutors">
                    </Route>
                    <Route exact path ="/student/billing">
                    </Route>
                    <Redirect exact from="/" to="/student" />
                    <Route component = {ErrorPage}>
                    </Route>
                </Switch>
            </React.Fragment>      
        )
    }
}

export default StudentNav