import React, {Component} from 'react'
import './AddTutor.css'

class AddTutor extends Component {
    constructor (props){
        super(props)
        this.state = {
            tutors: [],
            students: []
        }
    }
    
    componentDidMount(){
        fetch("https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/tutors")
        .then(response => response.json())
        .then(response => this.setState({
            tutors: response
        }))
        .catch(err => console.log("ERR: " + err))
        
        /*fetch("https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/students")
        .then(response => response.json())
        .then(response => this.setState({
            students: response
        }))
        .catch(err => console.log("ERR: " + err))*/
    }
    
    render(){
        return (
            <div className = "newProductForm">
                <h3> Create New Product </h3>
                <form>
                    <label>Tutor:</label>
                    <select>
                        {this.state.tutors.map(tutor => <option key = {tutor.TutorID} value = {tutor.Name}>{tutor.Name}</option> )}
                    </select>
                    <label>Student:</label>
                    <select>
                        {this.state.students.map(tutor => <option key = {tutor.TutorID} value = {tutor.Name}>{tutor.Name}</option> )}
                    </select>
                    <label>Subject</label>
                        <input id='Subject' type='text' required/>
                    <label>Cost/hr</label>
                        <input id = 'Cost' type='number' required/>
                </form>
            </div>
        )
    }
}

export default Add

