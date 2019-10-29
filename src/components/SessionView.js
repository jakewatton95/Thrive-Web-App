import React,{Component} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./SessionView.css"
import Session from './Session'


class SessionView extends Component{
    _isMounted = false
    constructor(props){
        super(props)
        this.state = {
            userRole : props.userInfo.attributes["custom:userRole"],
            sessions: [],
            startDate: '',
            endDate: '',
            filteringDates : false
        }
        
        this.handleCalendarChange = this.handleCalendarChange.bind(this)
        this.updateSessionDates = this.updateSessionDates.bind(this)
        this.allDates = this.allDates.bind(this)
    }
    
    componentDidMount(){
        this._isMounted = true
        let url = 'https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions'
        if (this.state.userRole == 'Student')
            url += "?studentID=" + this.props.studentID
        else if (this.state.userRole == 'Tutor')
            url += "?tutorID=" + this.props.tutorID
        fetch(url)
        .then(response => response.json())
        .then(response =>
            { 
                if (this._isMounted) {
                    this.setState({
                        sessions: response
                    })
                }
            }
        )
        .catch(err => console.log("Err" + err))
    }
    
    componentWillUnmount(){
        this._isMounted=false
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
    
    //DEPRECATED No longer used or needed in actual implementation
    updateSessionDates(e){
        e.preventDefault();
        console.log(this.state.sessions);
        console.log(this.state.sessions.filter(session => 
            new Date(Date.parse(session.date)) <= new Date(new Date(this.state.endDate).getTime()+24*60*60*1000) &&
            new Date(Date.parse(session.date)) >= new Date(new Date(this.state.startDate)))) 
        //previously was doing this via an API call, figured we could save the extra traffic
        /*let startDate = new Date(this.state.startDate).toISOString().slice(0, 10)
        let endDate = new Date(new Date(this.state.endDate).getTime()+24*60*60*1000).toISOString().slice(0, 10)
        let url = 'https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions'
        url += "?startDate=" + startDate + "&endDate=" + endDate
        console.log(url)
        fetch(url)
        .then(response => response.json())
        .then(response =>
            this.setState({
                sessions: response
            })
        )
        .catch(err => console.log("Err" + err))*/
    }
    
    allDates(e){
        e.preventDefault()
        this.setState({
            startDate: '',
            endDate: '',
            filteringDates: false
        })
    }
    
    
    render(){
        return(
            <div className = "sessionViewContainer">
                <form className = "dateSelectors" onSubmit={this.updateSessionDates}>
                    <label className="formLabel"> From: </label>
                    <DatePicker id='startDate' selected={this.state.startDate} onChange={date=>this.handleCalendarChange('startDate', date)} required/>
                    <label className="formLabel"> To: </label>
                    <DatePicker id='endDate' selected={this.state.endDate} onChange={date=>this.handleCalendarChange('endDate', date)} required/>
                    <button onClick = {this.allDates}> All Sessions </button>
                </form>
                <div className="sessionView">
                    <div> Sessions: </div>
                    {this.state.filteringDates ? 
                    this.state.sessions.filter(session => 
                        new Date(Date.parse(session.date)) <= new Date(new Date(this.state.endDate).getTime()+24*60*60*1000) &&
                        new Date(Date.parse(session.date)) >= new Date(new Date(this.state.startDate))).map(session => <Session userRole={this.state.userRole} key={session.ID} sessionInfo={session}/>) 
                    :
                    this.state.sessions.map(session => <Session userRole={this.state.userRole} key={session.ID} sessionInfo={session}/>)} 
                </div>
            </div>
            
        )
    }
}

export default SessionView