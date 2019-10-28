import React,{Component} from 'react'
import Session from './Session'

class InvoiceView extends Component{
    _isMounted=false
    constructor(props){
        super(props)
        
        this.state = {
            unpaidSessions : [],
            filterStudent  : false,
            filterTutor : false,
            filterDates: false,
            students: [],
            tutors: []
        }
    }
    
    componentDidMount(){
        this._isMounted=true
        let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/billing?invoice=true"
        fetch(url)
        .then(response => response.json())
        .then(response=>
            { 
                if(this._isMounted)
                    this.setState({
                        unpaidSessions: response
                    })
            }
        )
        .catch(err => console.log("Err: " + err))
        
       /* fetch("https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/tutors")
        .then(response => response.json())
        .then(response => this.setState({
            tutors: response
        }))
        .catch(err => console.log("ERR: " + err))
        
        fetch("https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/students")
        .then(response => response.json())
        .then(response => this.setState({
            students: response
        }))
        .catch(err => console.log("ERR: " + err))*/
    }
    
    componentWillUnmount(){
        this._isMounted=false
    }
    
    render(){
        return (
            <React.Fragment>
            <div> Invoice View </div>
            {this.state.filterDates ? 
                    this.state.sessions.filter(session => 
                        new Date(Date.parse(session.date)) <= new Date(new Date(this.state.endDate).getTime()+24*60*60*1000) &&
                        new Date(Date.parse(session.date)) >= new Date(new Date(this.state.startDate))).map(session => <Session userRole={this.state.userRole} key={session.SessionID} sessionInfo={session}/>) 
                    :
                    this.state.unpaidSessions.map(session => <Session userRole={this.state.userRole} key={session.SessionID} sessionInfo={session}/>)} 
            }
            </React.Fragment>
        
        
        )
    }
}


export default InvoiceView