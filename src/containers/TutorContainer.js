import React, {Component} from 'react'
import TutorNav from '../components/TutorNav.js'

class TutorContainer extends Component{
    constructor (props){
        super(props)
        this.state = {
            tutorID : '',
            loading : 'true'
        }
    }
    
    componentDidMount(){
        let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/tutors?name=" + this.props.userInfo.username
        fetch(url)
        .then(response => response.json())
        .then(response => {
            this.setState({
                tutorID: response[0].TutorID,
                loading: false
            })
        })
        .catch(err => console.log("ERR: " + err))
    }
    
    render(){
        return (
            <div>
            {this.state.loading ? 
                <div></div> : 
                <TutorNav signOut={this.props.signOut} tutorID = {this.state.tutorID} userInfo = {this.props.userInfo}/>
            }
            </div>
        )
    }
}

export default TutorContainer