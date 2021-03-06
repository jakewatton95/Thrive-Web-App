import React, {Component} from 'react'
import TutorNav from '../components/Nav/TutorNav.js'

class TutorContainer extends Component{
    _isMounted=false
    constructor (props){
        super(props)
        this.state = {
            tutorID : '',
            sessions: [],
            payments: [],
            billings: []
        }
    }
    
    async componentDidMount(){
        this._isMounted=true
        let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/tutors?name=" + this.props.userInfo.username
        await fetch(url)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    tutorID: response[0].TutorID,
                })
            }
        })
        .catch(err => console.log("ERR: " + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions?tutorID=' + this.state.tutorID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    sessions: response,
                })
            }
        })
        .catch(err => console.log("ERR: " + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?tutorID=' + this.state.tutorID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    payments: response
                })
            }
        })
        .catch(err => console.log("Err: " + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/billing?tutorID=' + this.state.tutorID)
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
                <TutorNav signOut={this.props.signOut} 
                          tutorID = {this.state.tutorID} 
                          userInfo = {this.props.userInfo}
                          sessions = {this.state.sessions}
                          payments = {this.state.payments}
                          billings = {this.state.billings}/>
            </div>
        )
    }
}

export default TutorContainer