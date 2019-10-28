import React, {Component} from 'react'
import './BillingEntry.css'

class BillingEntry extends Component {
    constructor(props){
        super(props)
        this.state = {
            date: '',
            sessionLength: '',
            location: ''
        }
    }
    
    render(){
        let {Tutor, Student, Rate, Location, date, SessionLength, StudentPaid, TutorPaid} = this.props.billingInfo
        let {userRole} = this.props
        let dateFormatted = new Date(Date.parse(date))
        return (
        <div className = "billingEntryWrapper">
            {userRole !== 'Student' ? <div>Student: {Student} </div> : null}
            {userRole !== 'Tutor' ? <div> Tutor: {Tutor} </div> : null}
            <div> Rate: {Rate}$/hr </div> 
            <div> Session Length: {SessionLength} hours</div>
            <div> Location: {Location} on {dateFormatted.toLocaleDateString()} at  {dateFormatted.toLocaleTimeString()} </div>
            <div> Student Paid: {StudentPaid == 1? 'yes' : 'no'} <button> change </button> </div>
            <div> Tutor Paid: {TutorPaid == 1? 'yes' : 'no'} <button> change </button> </div>
        </div>
        
        )
    }
}
export default BillingEntry