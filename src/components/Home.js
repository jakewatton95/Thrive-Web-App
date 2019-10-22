import React, {Component} from 'react'


class Home extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            
        }
    }
    
    componentDidMount(){
        console.log(JSON.stringify(this.props.userInfo))
    }
    
    render(){
        return (
            <div>
                <div>Welcome To Thrive Tutors!</div>
                <div>Your Name is {this.props.userInfo.username}</div>
                <div>You are a {this.props.userInfo.attributes["custom:userRole"]}</div>
            </div>
        )
    }
}
    
export default Home