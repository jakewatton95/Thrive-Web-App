import React, {Component} from 'react'
import StudentNav from '../components/Nav/StudentNav.js'

class StudentContainer extends Component{
    _isMounted=false
    constructor (props){
        super(props)
        this.state = {
            studentID: '',
            sessions: [],
            payments: [],
            billings: []
            
        }
    }
    
    async componentDidMount(){
        this._isMounted=true
        let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/students?name=" + this.props.userInfo.username
        await fetch(url)
        .then(response => response.json())
        .then(response => {
            this.setState({
                studentID: response[0].StudentID,
              //  loading: this.state.loading+1
            })
        })
        .catch(err => console.log("ERR: " + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions?studentID=' + this.state.studentID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    sessions: response,
                })
            }
        })
        .catch(err => console.log("ERR: " + err))
        
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions?studentID=' + this.state.studentID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    sessions: response,
                })
            }
        })
        .catch(err => console.log("ERR: " + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?studentID=' + this.state.studentID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    payments: response
                })
            }
        })
        .catch(err => console.log("Err: " + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/billing?studentID=' + this.state.studentID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    billings: response
                })
            }
        })
        .catch(err => console.log("Err" + err))        
    }

    componentWillUnmount(){
        this._isMounted = false
    }    
    
    render(){
        return (
            <div>
                <StudentNav signOut={this.props.signOut} 
                            studentID = {this.state.studentID} 
                            userInfo = {this.props.userInfo}
                            sessions = {this.state.sessions}
                            payments = {this.state.payments}
                            billings = {this.state.billings}/>
            </div>
        )
    }
}

export default StudentContainer