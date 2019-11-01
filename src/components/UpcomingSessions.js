import React, {Component} from 'react'
import './UpcomingSessions.css'
import Session from './Session'

class UpcomingSessions extends Component {
    _isMounted = false
    constructor(props){
        super(props)
        if (this.props.userInfo) {
            this.state = {
                userRole: props.userInfo.attributes["custom:userRole"],
                sessions : [],
                loading: true,
                secondaryRole: null
            }
        } else {  
            this.state = {
                userRole: props.userRole,
                sessions: [],
                loading: true,
                secondaryRole: props.secondaryRole
            }
        }
    }
    
    componentDidMount(){
        this._isMounted=true
        let startDate = new Date().toISOString().slice(0, 10)
        let endDate = new Date(new Date().getTime()+7*24*60*60*1000).toISOString().slice(0, 10)
        let url = 'https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions'
        if (this.state.userRole == 'Student'){
            url += "?studentID=" + this.props.studentID + "&startDate=" + startDate + "&endDate=" + endDate
        } else if (this.state.userRole == 'Tutor'){
            url += "?tutorID=" + this.props.tutorID + "&startDate=" + startDate + "&endDate=" + endDate
        } else {
            url += "?startDate=" + startDate + "&endDate=" + endDate
        }
        fetch(url)
        .then(response => response.json())
        .then(response =>
            {
                if (this._isMounted) {
                    this.setState({
                        sessions: response,
                        loading: false
                    })
                }
            }
        )
        .catch(err => console.log("Err" + err))
    }
    componentWillUnmount(){
        this._isMounted=false
    }
    render(){
        return (
            <React.Fragment>
            <div className="upcomingSessionsInfo">
                <h2> Upcoming Sessions: </h2>
                {this.state.sessions.length == 0 ?
                    this.state.loading == true ? <div> Loading... </div> : <div> No sessions this week, schedule one on the home page! </div> :
                    this.state.sessions.map(session => <Session userRole={this.state.userRole} secondaryRole={this.state.secondaryRole} key = {session.ID} sessionInfo={session}/>)
                }
            </div>
            </React.Fragment>
        )
    }
}

export default UpcomingSessions