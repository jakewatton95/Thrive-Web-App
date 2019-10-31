import React, {Component} from 'react'
import UpcomingSessions from './UpcomingSessions'

class StudentProfile extends Component {
    _isMounted=false
    constructor(props) {
        super(props)
    
        this.state = {
            studentID: props.match.params.studentID,
            student: "",
            paymentAmount: 100,
            payments: [],
            amountPaid: 0,
            amountOwed: 0
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.recordPayment = this.recordPayment.bind(this)
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
        
        fetch("https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?studentID=" + this.state.studentID)
        .then(response=>response.json())
        .then(response=> {
            if (this._isMounted) {
                this.setState({
                    payments: response
                })
                let amountPaid = this.state.payments.reduce((total, payment) => total += payment.Amount, 0);
                this.setState({
                    amountPaid: amountPaid
                })
            }
        })
        .catch(err => console.log("Err:" + err))
    }
    
    componentWillUnmount(){
        this._isMounted=false
    }
    
        recordPayment(e){
        e.preventDefault()
        let endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?studentID=" + this.state.studentID + "&amount=" +  this.state.paymentAmount
        fetch(endpoint, {method: "POST"})
        .then(() => {
            alert("Payment Logged")
            this.setState({
                amountPaid: parseFloat(this.state.amountPaid) + parseFloat(this.state.paymentAmount),
                paymentAmount: 100
            })
        })
        .catch(err => console.log("Error Recording Payment:" + err))
    }
    
    handleChange(e){
        let {id, value} = e.target
        if (id === 'payment'){
            this.setState({
                paymentAmount: value
            })
        }
    }
    render() {
        let {student, amountPaid, amountOwed} = this.state
        return (
            <React.Fragment>
                <h2> Viewing info for {student.Name}</h2>
                <div> Email: {student.Email} </div>
                <div> Phone: {student.Phone} </div>
                <div> Amount Owed: ${amountOwed} </div> 
                <div> Amount Paid: ${amountPaid} </div>
                {amountOwed > amountPaid ? <div> {student.Name} owes you ${Math.ceil((parseFloat(amountOwed)-parseFloat(amountPaid))*100)/100} </div> : null}
                <div> Record a payment: <form onSubmit = {this.recordPayment} ><input type="number" min="0.01" step = ".01" value = {this.state.paymentAmount} onChange = {this.handleChange} id="payment"/> $ <button> Submit </button></form></div>
                <UpcomingSessions userRole = "Student" secondaryRole="Admin" studentID={this.state.studentID}/>
            </React.Fragment>
        )
    }
}


export default StudentProfile