import React, {Component} from 'react'
import './UpcomingSessions.css'
import Session from './Session'

class UpcomingSessions extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            userRole: props.userInfo.attributes["custom:userRole"],
            sessions : [],
            loading: true
            
        }
    }
    
    componentDidMount(){
        let url = 'https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions'
        if (this.state.userRole == 'Student'){
            url += "?studentID=" + this.props.studentID
        } else if (this.state.userRole == 'Tutor'){
            url += "?tutorID=" + this.props.tutorID
        }
        fetch(url)
        .then(response => response.json())
        .then(response =>
            this.setState({
                sessions: response,
                loading: false
            })
        )
        .catch(err => console.log("Err" + err))
    }
    
    render(){
        return (
            <div className="upcomingSessionsInfo">
                <h2> Upcoming Sessions: </h2>
                {this.state.sessions.length == 0 ?
                    this.state.loading == true ? <div> Loading... </div> : <div> No sessions this week, schedule one below! </div> :
                    this.state.sessions.map(session => <Session key = {session.ID} sessionInfo={session}/>)
                }
            </div>
        )
    }
}

export default UpcomingSessions