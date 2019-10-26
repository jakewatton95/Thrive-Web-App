import React, {Component} from 'react';
import {NavLink, Switch, Route, Redirect} from 'react-router-dom'
import {Nav} from 'react-bootstrap'
import Home from '../Home'
import ErrorPage from '../ErrorPage'
import BillingView from '../BillingView'
import { Auth } from 'aws-amplify'
import SessionView from '../SessionView'

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
                        <NavLink to="/sessions" activeClassName="active" className="nav-link">
                            Schedule
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/tutors" exact={true} activeClassName="active" className="nav-link">
                            Tutors
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
                    <Route exact path="/student" render={()=><Home studentID = {this.props.studentID} userInfo={this.props.userInfo}/>}>
                    </Route>
                    <Route exact path ="/sessions" render={()=> <SessionView studentID = {this.props.studentID} userInfo={this.props.userInfo}/>}>
                    </Route>
                    <Route exact path ="/tutors">
                    </Route>
                    <Route exact path ="/billing" component = {BillingView}>
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