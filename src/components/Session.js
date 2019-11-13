import React, {Component} from 'react'
import './Session.css'

class Session extends Component {
    constructor(props){
        super(props)
        this.state = {
            confirmed :'',
            show : true,
            date: '',
            sessionLength: '',
            location: '',
            studentConfirmed: props.sessionInfo.StudentConfirmed,
            tutorConfirmed: props.sessionInfo.TutorConfirmed
        }
        this.confirm = this.confirm.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    
    handleCancel(){
        if (confirm("Are you sure you want to cancel this session?")) {
            let {ID} = this.props.sessionInfo
            let endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions?ID=" + ID
            fetch(endpoint, {method: "DELETE"})
            .then(response => response.json())
            .then(response => {
                alert('Session was successfully cancelled')
                this.setState({
                    show: false
                })
            })
            .catch(err => alert("Error cancelling session: " + err))
        }
    }
    
    confirm(){
        let endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions"
        let {ID} = this.props.sessionInfo

        if (this.props.userRole === 'Student') {
            this.setState({
                studentConfirmed: true
            })
            endpoint += '?userRole=Student&sessionID=' + ID
        } else if (this.props.userRole === 'Tutor') {
            this.setState({
                tutorConfirmed: true
            })
            endpoint += '?userRole=Tutor&sessionID=' + ID
        }
        fetch(endpoint, {method: "PUT"})
        .catch(err => console.log("ERR: " + err))
    }
    
    render(){
        let {Tutor, Student, Subject, Location, date} = this.props.sessionInfo
        let {studentConfirmed, tutorConfirmed, show} = this.state
        let {userRole, secondaryRole} = this.props
        let dateFormatted = new Date(Date.parse(date))
        return (
        <div className = {show ? "sessionWrapper" : "hiddenWrapper"}>
            {userRole !== 'Student' ? <div>Student: {Student} </div> : null}
            {userRole !== 'Tutor' ? <div> Tutor: {Tutor} </div> : null}
            <div> Subject: {Subject}
            {(userRole == 'Student' || userRole == 'Tutor') && secondaryRole !== 'Admin' && new Date() < new Date(Date.parse(date)) ? <button className="cancel-button" onClick = {this.handleCancel}> Cancel </button> : null}
            </div>
            <div>
            Location: {Location} on {dateFormatted.toLocaleDateString()} at {dateFormatted.toLocaleTimeString()}
            </div>
            {userRole == 'Student' && !studentConfirmed && 
            !this.props.secondaryRole && new Date() < new Date(Date.parse(date)) ? // && this.props.isPrimary ? 
                <button onClick={this.confirm}> Confirm </button> : null}
            {userRole == 'Tutor' && !tutorConfirmed && !this.props.secondaryRole && new Date() < new Date(Date.parse(date)) ? //&& this.props.isPrimary ?
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