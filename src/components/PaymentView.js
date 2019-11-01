import React,{Component} from 'react'
import Session from './Session'
import Payment from './Payment'
import './ViewWithTable.css'

class PaymentView extends Component{
    _isMounted=false
    constructor(props){
        super(props)
        
        this.state = {
            payments: [],
            viewing: "everyone",
            userType: "everyone",
            selectedID: null,
            nameFilter: false
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    componentDidMount(){
        this._isMounted=true
        let userRole = this.props.userInfo.attributes['custom:userRole']
        let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments"
        if (userRole === 'Student') {
            url += "?studentID=" + this.props.studentID
            this.setState({
                viewing: this.props.userInfo.username
            })
        } else if (userRole ==='Tutor') {
            url += "?tutorID=" + this.props.tutorID
            this.setState({
                viewing: this.props.userInfo.username
            })
        }
        fetch(url)
        .then(response => response.json())
        .then(response=>
            { 
                this.setState({
                    payments: response
                })
            }
        )
        .catch(err => console.log("Err: " + err))
    }
    
    componentWillUnmount(){
        this._isMounted=false
    }
    
    handleChange(e){
        let {id, value} = e.target
        if(value.includes('=')){
            let vals = value.split('=')
            if (id === "user"){
                this.setState({
                    nameFilter: true,
                    userType: vals[0],
                    viewing: vals[1],
                    selectedID: vals[2]
                })
            }
        }
    }
    
    render(){
        let {userType, viewing, payments, selectedID} = this.state
        let {students, tutors} = this.props
        let userRole = this.props.userInfo.attributes['custom:userRole']
        let filteredPayments = [];
        if (userType === "everyone") {
            filteredPayments = payments
        } else if(userType === "tutor"){
            filteredPayments = payments.filter(payment => payment.TutorID == selectedID)
        } else if(userType === "student"){
            filteredPayments = payments.filter(payment => payment.StudentID == selectedID)
        }
        return (
            <React.Fragment>
            <h2> Payments: </h2>
            {userRole === "Admin" ? <React.Fragment><div> Viewing Payments for {viewing}:  </div> 
            <form>
                <div>
                    <label className="formLabel">User: </label>
                    <select id="user" onChange={this.handleChange} defaultValue=''>
                        <option disabled="disabled" value=''>---Select a Person---</option>
                        {tutors.map(tutor => <option key = {tutor.Name} value = {"tutor="+tutor.Name+"="+tutor.TutorID}>{tutor.Name}</option> )}
                        {students.map(student => <option key = {student.Name} value = {"student="+student.Name+"="+student.StudentID}>{student.Name}</option>)}
                    </select>
                </div>
            </form></React.Fragment> : null}
            <table>
                <tbody>
                    <tr key="categories">
                        <th className="category">Date</th>
                        {userType !== "tutor" && userRole === "Admin" ? <th className="category">Student</th> : null} 
                        {userType !== "student"  && userRole === "Admin"? <th className="category">Tutor</th> : null} 
                        <th className="category">Amount</th>
                    </tr>
                    {filteredPayments.map(payment => <Payment key = {payment.PaymentID} students={this.props.students} tutors = {this.props.tutors} userType={this.state.userType} paymentInfo={payment} userRole={userRole} viewing={this.state.viewing}/>)}
                </tbody>
            </table>
            </React.Fragment>
        
        
        )
    }
}


export default PaymentView