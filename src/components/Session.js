import React, {Component} from 'react'
import './Session.css'

class Session extends Component {
    constructor(props){
        super(props)
        this.state = {
            confirmed :'',
            date: '',
            sessionLength: '',
            location: '',
            ID: props.sessionInfo.ID,
            studentConfirmed: props.sessionInfo.StudentConfirmed,
            tutorConfirmed: props.sessionInfo.TutorConfirmed
        }
        this.confirm = this.confirm.bind(this)
    }
    
    confirm(){
        let endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions"

        if (this.props.userRole === 'Student') {
            this.setState({
                studentConfirmed: true
            })
            endpoint += '?userRole=Student&sessionID=' + this.state.ID
        } else if (this.props.userRole === 'Tutor') {
            this.setState({
                tutorConfirmed: true
            })
            endpoint += '?userRole=Tutor&sessionID=' + this.state.ID
        }
        fetch(endpoint, {method: "PUT"})
        .catch(err => console.log("ERR: " + err))
    }
    
    render(){
        let {Tutor, Student, Subject, Location, date} = this.props.sessionInfo
        let {studentConfirmed, tutorConfirmed} = this.state
        let {userRole} = this.props
        let dateFormatted = new Date(Date.parse(date))
        return (
        <div className = "sessionWrapper">
            {userRole !== 'Student' ? <div>Student: {Student} </div> : null}
            {userRole !== 'Tutor' ? <div> Tutor: {Tutor} </div> : null}
            <div> Subject: {Subject}</div>
            <div>
            Location: {Location} on {dateFormatted.toLocaleDateString()} at  {dateFormatted.toLocaleTimeString()}
            </div>
            {userRole == 'Student' && !studentConfirmed && 
            !this.props.secondaryRole? // && this.props.isPrimary ? 
                <button onClick={this.confirm}> Confirm </button> : null}
            {userRole == 'Tutor' && !tutorConfirmed && !this.props.secondaryRole? //&& this.props.isPrimary ?
                <button onClick={this.confirm}> Confirm </button> : null}
            <div>
                StudentConfirmed: {studentConfirmed == 1? 'yes' : 'no'}
                <br/>
                TutorConfirmed: {tutorConfirmed == 1? 'yes': 'no'}
            </div>
        </div>
        
        )
    }
}
export default Session