import React, {Component} from 'react'
import './Session.css'

class Session extends Component {
    constructor(props){
        super(props)
        this.state = {
            confirmed :'',
            date: '',
            sessionLength: '',
            location: ''
        }
    }
    
    render(){
        let {Tutor, Student, Subject, Location, date} = this.props.sessionInfo
        let dateFormatted = new Date(Date.parse(date))
        return (
        <div className = "sessionWrapper">
            Tutor: {Tutor}, Student: {Student}, Subject: {Subject}, Location: {Location}, Date: {dateFormatted.toLocaleDateString()}, Time: {dateFormatted.toLocaleTimeString()}
        </div>
        
        )
    }
}
export default Session