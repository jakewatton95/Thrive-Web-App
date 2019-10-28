import React, {Component} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import BillingEntry from "./BillingEntry"


class BillingView extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            userRole : 'Admin',//props.userInfo.attributes["custom:userRole"],
            billings : [],
            startDate: '',
            endDate: '',
            filteringDates: false
        }
        
        this.allDates = this.allDates.bind(this)
        this.handleCalendarChange=this.handleCalendarChange.bind(this)
    }
    
    componentDidMount(){
        let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/billing"
        fetch(url)
        .then(response => response.json())
        .then(response=>
            this.setState({
                billings: response
            })
        )
        .catch(err => console.log("Err: " + err))
        //TODO if (information hasn't been fetched and stored yet)
        //fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI')//?include user name or email
        //.then(response => response.json())
        //.then(response => console.log(response))
        //.catch(err => console.log(err))
    }
    
    handleCalendarChange(option, date){
        if (option == "startDate") {
            this.setState({
                startDate: date
            })
            if (date > this.state.endDate) {
                this.setState({
                    endDate: date
                })           
            }
        }
        else if (option == "endDate") {
            this.setState({
                endDate: date
            })            
            if (date < this.state.startDate) {
                this.setState({
                    startDate: date,
                })
            }
        }
        this.setState({
            filteringDates : true
        })
    }
    
    allDates(e){
        e.preventDefault()
        console.log('AllDates')
        this.setState({
            filteringDates: false,
            startDate: '',
            endDate: ''
        })
    }
    
    render(){
        return (
            <React.Fragment>
            <form className = "dateSelectors" onSubmit={this.updateSessionDates}>
                    <label> From: </label>
                    <DatePicker id='startDate' selected={this.state.startDate} onChange={date=>this.handleCalendarChange('startDate', date)} required/>
                    <label> To: </label>
                    <DatePicker id='endDate' selected={this.state.endDate} onChange={date=>this.handleCalendarChange('endDate', date)} required/>
                    <button onClick = {this.allDates}> All Sessions </button>
                </form>
                
            <div className = "main">
                <div> Welcome to Billing</div>
                {this.state.filteringDates ? 
                    this.state.billings.filter(session => 
                        new Date(Date.parse(session.date)) <= new Date(new Date(this.state.endDate).getTime()+24*60*60*1000) &&
                        new Date(Date.parse(session.date)) >= new Date(new Date(this.state.startDate))).map(billing => <BillingEntry key={billing.SessionID} billingInfo={billing}/>) 
                    :
                    this.state.billings.map(billing => <BillingEntry key={billing.SessionID} billingInfo={billing}/>)} 
            </div>
            </React.Fragment>
        )
    }
}
    
export default BillingView