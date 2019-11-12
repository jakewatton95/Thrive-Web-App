import React, {Component} from 'react'
import TutorNav from '../components/Nav/TutorNav.js'

class TutorContainer extends Component{
    constructor (props){
        super(props)
        this.state = {
            tutorID : '',
            loading : 0,
            sessions: []
        }
    }
    
    async componentDidMount(){
        let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/tutors?name=" + this.props.userInfo.username
        await fetch(url)
        .then(response => response.json())
        .then(response => {
            this.setState({
                tutorID: response[0].TutorID,
                loading: this.state.loading + 1
            })
        })
        .catch(err => console.log("ERR: " + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions?tutorID=' + this.state.tutorID)
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
            {this.state.loading < 3 ? 
                <div></div> : 
                <TutorNav signOut={this.props.signOut} 
                          tutorID = {this.state.tutorID} 
                          userInfo = {this.props.userInfo}
                          sessions = {this.state.sessions}/>
            }
            </div>
        )
    }
}

export default TutorContainer