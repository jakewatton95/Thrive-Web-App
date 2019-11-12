import React, {Component} from 'react';
import {NavLink, Switch, Route, Redirect} from 'react-router-dom'
import {Nav} from 'react-bootstrap'
import Home from '../Home'
import BillingView from '../BillingView'
import ErrorPage from '../ErrorPage'
import SessionView from '../SessionView'
import StudentTutorView from '../StudentTutorView'
import PaymentView from '../PaymentView'
import './Nav.css'

class TutorNav extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    
    render(){
        return(
            <React.Fragment>
                <Nav className= "nav-tabs">
                    <div className = "navItem">
                        <NavLink to="/tutor" activeClassName="active" className="nav-link">
                            Home
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/students" activeClassName="active" className="nav-link">
                            Students
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/sessions" activeClassName="active" className="nav-link">
                            Schedule
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/billing" activeClassName="active" className="nav-link">
                            Billing
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/payment" activeClassName="active" className="nav-link">
                            Payments
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <button className="nav-link" onClick={this.props.signOut}> Sign Out </button>
                    </div>
                </Nav>
                <Switch>
                    <Route exact path="/tutor" render={()=><Home tutorID = {this.props.tutorID} sessions = {this.props.sessions} userInfo={this.props.userInfo}/>}>
                    </Route>
                    <Route path ="/sessions" render={()=> <SessionView tutorID = {this.props.tutorID} sessions = {this.props.sessions} userInfo={this.props.userInfo}/>}>
                    </Route>
                    <Route exact path ="/students" render={() => <StudentTutorView tutorID = {this.props.tutorID}/>}>
                    </Route>
                    <Route exact path ="/billing" render={()=><BillingView tutorID = {this.props.tutorID} userInfo={this.props.userInfo}/>}>
                    </Route>
                    <Route exact path ="/payment" render = {() => <PaymentView tutorID = {this.props.tutorID} userInfo={this.props.userInfo} billings={[]} tutors={[]} students={[]}/>}>
                    </Route>
                    <Redirect exact from="/" to="/tutor" />
                    <Route component = {ErrorPage}>
                    </Route>
                </Switch>
            </React.Fragment>      
        )
    }
}

export default TutorNav