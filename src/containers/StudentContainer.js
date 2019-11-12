import React, {Component} from 'react'
import StudentNav from '../components/Nav/StudentNav.js'

class StudentContainer extends Component{
    constructor (props){
        super(props)
        this.state = {
            studentID: '',
            loading: 0,
            sessions: []
            
        }
    }
    
    async componentDidMount(){
        let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/students?name=" + this.props.userInfo.username
        await fetch(url)
        .then(response => response.json())
        .then(response => {
            this.setState({
                studentID: response[0].StudentID,
                loading: this.state.loading+1
            })
        })
        .catch(err => console.log("ERR: " + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions?studentID=' + this.state.studentID)
        .then(response => response.json())
        .then(response => {
            this.setState({
                sessions: response,
                loading: this.state.loading+2
            })
        })
        .catch(err => console.log("ERR: " + err))
        
        
    }
    
    render(){
        return (
            <div>
                {this.state.loading < 3 ? null :          
                    <StudentNav signOut={this.props.signOut} 
                                studentID = {this.state.studentID} 
                                userInfo = {this.props.userInfo}
                                sessions = {this.state.sessions}/>
                }
            </div>
        )
    }
}

export default StudentContainer