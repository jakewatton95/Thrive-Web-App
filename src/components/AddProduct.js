import React, {Component} from 'react'
import './AddProduct.css'

class AddProduct extends Component {
    constructor (props){
        super(props)
        this.state = {
            tutors: [],
            students: [],
            student: '',
            tutor: '',
            subject: '',
            cost: ''
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    
    componentDidMount(){
        fetch("https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/tutors")
        .then(response => response.json())
        .then(response => this.setState({
            tutors: response
        }))
        .catch(err => console.log("ERR: " + err))
        
        fetch("https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/students")
        .then(response => response.json())
        .then(response => this.setState({
            students: response
        }))
        .catch(err => console.log("ERR: " + err))
    }
    
    async handleChange(e) {
        let {id, value} = e.target
        if (id === 'student') {
            this.setState({
                student: e.target.value
            })
        } else if (id === 'tutor') {
            this.setState({
                tutor: e.target.value
            })
        } else if (id === 'cost') {
            this.setState({
                cost: e.target.value
            })
        } else if (id === 'subject') {
            this.setState({
                subject: e.target.value
            })
        }
    }
    
    handleSubmit(e){
        e.preventDefault();
        let {student, tutor} = this.state
        if(student === '' || tutor === '') 
            alert ("Please make sure to select a Tutor and a Student from the dropdown!")
        else 
            alert ("Product Added!")
    }
    
    render(){
        return (
            <div className = "newProductForm">
                <h3> Create New Product </h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Tutor:</label>
                        <select id="tutor" onChange={this.handleChange}>
                            <option disabled="disabled" selected="selected" value=''>---Select a Tutor---</option>
                            {this.state.tutors.map(tutor => <option key = {tutor.TutorID} value = {tutor.Name}>{tutor.Name}</option> )}
                        </select>
                    </div>
                    <div>
                        <label>Student:</label>
                        <select id='student' onChange={this.handleChange}>
                             <option disabled="disabled" selected="selected" value=''>---Select a Student---</option>
                            {this.state.students.map(student => <option key = {student.StudentID} value = {student.Name}>{student.Name}</option> )}
                        </select>
                    </div>
                    <div>
                        <label>Subject</label>
                        <input id='subject' type='text' onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label>Hourly Rate</label>
                        <input id = 'cost' type='number' onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <button> Add </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddProduct

