import React, {Component} from 'react'
import UpcomingSessions from './UpcomingSessions'

class StudentProfile extends Component {
    _isMounted=false
    constructor(props) {
        super(props)
    
        this.state = {
            studentID: props.match.params.studentID,
            student: ""
        }
    }
    
    componentDidMount(){
        this._isMounted=true
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/students?id='+this.state.studentID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    student: response[0]
                })
            }
        })
        .catch(err => console.log("Err" + err))
    }
    
    componentWillUnmount(){
        this._isMounted=false
    }
    render() {
        let {student} = this.state
        return (
            <React.Fragment>
                <h2> Viewing info for {student.Name}</h2>
                <div> Email: {student.Email} </div>
                <div> Phone: {student.Phone} </div>
                <UpcomingSessions userRole = "Student" studentID={this.state.studentID}/>
            </React.Fragment>
        )
    }
}


export default StudentProfile