import React, {Component} from 'react'
import AdminNav from '../components/Nav/AdminNav.js'

class AdminContainer extends Component{
    constructor (props){
        super(props)
    }
    
    componentDidMount(){
        
    }
    
    render(){
        return <AdminNav signOut={this.props.signOut} userInfo = {this.props.userInfo}/>
    }
}

export default AdminContainer