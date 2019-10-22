import React, {Component} from 'react'
import StudentNav from '../components/StudentNav.js'

class StudentContainer extends Component{
    constructor (props){
        super(props)
        this.state = {
            
        }
    }
    
    render(){
        return <StudentNav signOut={this.props.signOut} userInfo = {this.props.userInfo}/>
    }
}

export default StudentContainer