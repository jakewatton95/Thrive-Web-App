import React, {Component} from 'react'
import AdminNav from '../components/AdminNav.js'

class AdminContainer extends Component{
    constructor (props){
        super(props)
    }
    
    render(){
        return <AdminNav signOut={this.props.signOut}/>
    }
}

export default AdminContainer