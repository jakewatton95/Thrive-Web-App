import React, {Component} from 'react'
import AddProduct from './AddProduct'
import UpcomingSessions from './UpcomingSessions'
import ScheduleSession from './ScheduleSession'

class Home extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            userRole : this.props.userInfo.attributes["custom:userRole"]
        }
    }
    
    componentDidMount(){

    }
    
    render(){
        let modules;
        if (this.state.userRole === "Student"){
            modules=
            <div>
                <ScheduleSession studentID = {this.props.studentID} userInfo={this.props.userInfo}/>
                <UpcomingSessions studentID = {this.props.studentID} userInfo={this.props.userInfo}/>
            </div>
        } else if (this.state.userRole === "Tutor") {
            modules=
            <div>
                <ScheduleSession tutorID = {this.props.tutorID} userInfo={this.props.userInfo}/>
                <UpcomingSessions tutorID = {this.props.tutorID} userInfo={this.props.userInfo}/>
            </div>
        } else {
            modules=
            <div>
                <ScheduleSession userInfo={this.props.userInfo}/>
                <UpcomingSessions userInfo={this.props.userInfo}/>
            </div>
        }
        return (
            <div className = "main">
                <h2>Welcome back, {this.props.userInfo.username}!</h2>
                {this.state.userRole === "Admin" ? <AddProduct/> : null}
                {modules}
            </div>
        )
    }
}
    
export default Home