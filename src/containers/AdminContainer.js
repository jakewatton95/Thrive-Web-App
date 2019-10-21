import React, {Component} from 'react'
import AdminNav from '../components/AdminNav.js'

class AdminContainer extends Component{
    constructor (props){
        super(props)
        this.state = {
            
        }
    }
    
    render(){
        return (
            <div> 
                <AdminNav signOut={this.props.signOut}/>
            </div>
        )
    }
}

export default AdminContainer