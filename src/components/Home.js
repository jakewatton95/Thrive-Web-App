import React, {Component} from 'react'
import AddProduct from './AddProduct'

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
                <div>Welcome back, {this.props.userInfo.username}!</div>
                <div>You are a {this.state.userRole}</div>
                {this.state.userRole === "Admin" ? <AddProduct/> : null}
            </div>
        )
    }
}
    
export default Home