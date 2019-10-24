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
        
        return (
            <div className = "main">
                <h2>Welcome back, {this.props.userInfo.username}!</h2>
                {this.state.userRole === "Admin" ? <AddProduct/> : null}
                <UpcomingSessions info={this.props}/>
                <ScheduleSession/>
            </div>
        )
    }
}
    
export default Home