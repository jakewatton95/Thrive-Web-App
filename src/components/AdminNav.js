import React, {Component} from 'react';
import {NavLink, Switch, Route, Redirect} from 'react-router-dom'
import {Nav} from 'react-bootstrap'
import Home from './Home'
import Billing from './Billing'
import ErrorPage from './ErrorPage'
import { Auth } from 'aws-amplify'
import StudentView from './Admin/StudentView'
import TutorView from './Admin/TutorView'
import SessionView from './SessionView'

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
                        <NavLink to="/students" exact={true} activeClassName="active" className="nav-link">
                            Students
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/tutors" activeClassName="active" className="nav-link">
                            Tutors
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/sessions" exact={true} activeClassName="active" className="nav-link">
                            Sessions
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/billing" exact={true} activeClassName="active" className="nav-link">
                            Billing
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <button className="nav-link" onClick={this.props.signOut}> Sign Out </button>
                    </div>
                </Nav>
                <Switch>
                    <Route path="/students" render={() => <StudentView/>}>
                    </Route>
                    <Route path ="/tutors" render={() => <TutorView/>}>
                    </Route>
                    <Route path ="/sessions" render={()=> <SessionView userInfo={this.props.userInfo}/>}>
                    </Route>
                    <Route exact path ="/billing" component = {Billing}>
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