import React,{Component} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./SessionView.css"
import Session from '../Session'


class SessionView extends Component{
    constructor(props){
        super(props)
        this.state = {
            sessions: [],
            startDate: new Date().setHours(0,0,0),
            endDate: new Date().setHours(23,59,59)
        }
        
        this.handleCalendarChange = this.handleCalendarChange.bind(this)
        this.updateSessionDates = this.updateSessionDates.bind(this)
    }
    
    componentDidMount(){
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions')
        .then(response => response.json())
        .then(response =>
            this.setState({
                sessions: response
            })
        )
        .catch(err => console.log("Err" + err))
    }
    
    handleCalendarChange(option, date){
        if (option == "startDate") {
            if (date > this.state.endDate)
                alert("Please make sure your 'from' date is before your 'to' date")
            else 
                this.setState({
                    startDate: date
                })
        }
        else if (option == "endDate") {
            if (date < this.state.startDate)
                alert("Please make sure your 'from' date is before your 'to' date")
            else 
                this.setState({
                    endDate: date
                })
        }
    }
    
    updateSessionDates(e){
        e.preventDefault();
        let startDate = new Date(this.state.startDate).toISOString().slice(0, 10)
        let endDate = new Date(this.state.endDate).toISOString().slice(0, 10)
        let url = 'https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions'
        url += "?startDate=" + startDate + "&endDate=" + endDate
        fetch(url)
        .then(response => response.json())
        .then(response =>
            this.setState({
                sessions: response
            })
        )
        .catch(err => console.log("Err" + err))
    }
    
    
    render(){
        return(
            <div className = "sessionViewContainer">
                <form className = "dateSelectors" onSubmit={this.updateSessionDates}>
                    <label> From: </label>
                    <DatePicker id='startDate' selected={this.state.startDate} onChange={date=>this.handleCalendarChange('startDate', date)}/>
                    <label> To: </label>
                    <DatePicker id='endDate' selected={this.state.endDate} onChange={date=>this.handleCalendarChange('endDate', date)}/>
                    <button> Change </button>
                </form>
                <div className="sessionView">
                    <div> Sessions: </div>
                    {this.state.sessions.map(session=> <Session key={session.ID} sessionInfo={session}/>)} 
                </div>
            </div>
            
        )
    }
}

export default SessionView