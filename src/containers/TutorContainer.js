import React, {Component} from 'react'
import TutorNav from '../components/TutorNav.js'

class TutorContainer extends Component{
    constructor (props){
        super(props)
        this.state = {
            
        }
    }
    
    render(){
        return <TutorNav signOut={this.props.signOut}/>
    }
}

export default TutorContainer