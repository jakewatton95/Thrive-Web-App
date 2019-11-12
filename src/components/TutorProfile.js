import React, {Component} from 'react'
import UpcomingSessions from './UpcomingSessions'
import './Profile.css'

class TutorProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            tutorID:props.match.params.tutorID,
            payments: [],
            tutor:'',
            paymentAmount : 100,
            amountPaid: 0,
            amountOwed: 0,
            amountOwedSet: false
        }
        
        this.recordPayment = this.recordPayment.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.setAmountOwed = this.setAmountOwed.bind(this)
    }
    
    
    componentDidMount(){
        this._isMounted=true
        const {match: {params}} = this.props
        this.setState({
            tutorID: params.tutorID
        })

        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/tutors?id='+params.tutorID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    tutor: response[0]
                })
            }
        })
        .catch(err => console.log("Err:" + err))
        
        fetch("https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?tutorID=" + this.state.tutorID)
        .then(response=>response.json())
        .then(response=> {
            if (this._isMounted) {
                this.setState({
                    payments: response
                })
                let amountPaid = this.state.payments.reduce((total, payment) => total += payment.Amount, 0)
                this.setState({
                    amountPaid: amountPaid
                })
            }
        })
        .catch(err => console.log("Err:" + err))
    }
    
    componentDidUpdate(){
        if (this.props.billings.length > 0)
            this.setAmountOwed()
    }
    
    componentWillUnmount(){
        this._isMounted=false   
    }
    
    setAmountOwed(){
        let {billings} = this.props
        if (!this.state.amountOwedSet) {
            this.setState({
                amountOwed: billings.filter(billing => billing.TutorID == this.state.tutorID && Date.now() > Date.parse(billing.date)).reduce((total, billing) => total+= billing.TutorShare/100.00*billing.Rate * billing.SessionLength, 0),
                amountOwedSet: true
            })
        }
    }
    
    recordPayment(e){
        e.preventDefault()
        let endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?tutorID=" + this.state.tutorID + "&amount=" +  this.state.paymentAmount
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
        let {tutor, amountOwed, amountPaid} = this.state
        let {sessions} = this.props
        return (
            <React.Fragment>
                <h2> Viewing info for {tutor.Name}</h2>
                <div> Email: {tutor.Email} </div>
                <div> Phone: {tutor.Phone} </div>
                <div className="amountOwed"> Total Amount Owed:  ${amountOwed.toFixed(2)}</div> 
                <div className="amountPaid"> Total Amount Paid:  ${amountPaid.toFixed(2)}</div> 
                {amountOwed > amountPaid ? <div> You owe {tutor.Name} ${amountOwed - amountPaid}  </div> : null}
                <div> Record a payment: <form onSubmit = {this.recordPayment} ><input type="number" min="0.01" step = ".01" value = {this.state.paymentAmount} onChange = {this.handleChange} id="payment"/> $ <button> Submit </button></form></div>
                <UpcomingSessions userRole = "Tutor" sessions={sessions} secondaryRole="Admin" tutorID={this.state.tutorID}/>
            </React.Fragment>
        )
    }
}
export default TutorProfile