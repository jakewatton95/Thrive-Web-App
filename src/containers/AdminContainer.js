import React, {Component} from 'react'
import AdminNav from '../components/Nav/AdminNav.js'

class AdminContainer extends Component{
    _isMounted=false
    constructor (props){
        super(props)
        
        this.state = {
            students: [],
            tutors: []
        }
    }
    
    componentDidMount(){
        this._isMounted=true
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/students')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    students: response
                })
            }
        })
        .catch(err => console.log("Err" + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/tutors')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    tutors: response
                })
            }
        })
        .catch(err => console.log("Err" + err))
    }
    
    componentWillUnmount(){
        this._isMounted=false
    }
    
    render(){
        return <AdminNav signOut={this.props.signOut} userInfo = {this.props.userInfo} tutors={this.state.tutors} students={this.state.students}/>
    }
}

export default AdminContainer