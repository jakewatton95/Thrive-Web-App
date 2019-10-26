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
            tutorConfirmed: props.sessionInfo.tutorConfirmed
        }
        this.confirmStudent = this.confirmStudent.bind(this)
        this.confirmTutor = this.confirmTutor.bind(this)
    }
    
    confirmStudent(){
        console.log(this.state.ID)
        this.setState({
            studentConfirmed: true
        })
        //TODO API CALL PUT IN DB
    }
    confirmTutor(){
        console.log(this.state.ID)
        this.setState({
            tutorConfirmed: true
        })
        //TODO API CALL PUT IN DB
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
            {userRole == 'Student' && !studentConfirmed ? 
                <button onClick={this.confirmStudent}> Confirm </button> : null}
            {userRole == 'Tutor' && !tutorConfirmed ? 
                <button onClick={this.confirmTutor}> Confirm </button> : null}
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