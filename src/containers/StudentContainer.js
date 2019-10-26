import React, {Component} from 'react'
import StudentNav from '../components/Nav/StudentNav.js'

class StudentContainer extends Component{
    constructor (props){
        super(props)
        this.state = {
            studentID: '',
            loading: true
            
        }
    }
    
    componentDidMount(){
        let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/students?name=" + this.props.userInfo.username
        fetch(url)
        .then(response => response.json())
        .then(response => {
            this.setState({
                studentID: response[0].StudentID,
                loading: false
            })
        })
        .catch(err => console.log("ERR: " + err))
    }
    
    render(){
        return (
            <div>
                {this.state.loading ? null :          
                    <StudentNav signOut={this.props.signOut} studentID = {this.state.studentID} userInfo = {this.props.userInfo}/>
                }
            </div>
        )
    }
}

export default StudentContainer