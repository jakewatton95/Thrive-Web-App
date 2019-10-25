import React, {Component} from 'react'
import './ScheduleSession.css'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Times from "../data/times"

class ScheduleSession extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            products: [],
            productID: '',
            userRole: props.userInfo.attributes["custom:userRole"],
            date: new Date(),
            sessionLength: '1:30',
            tutorID: '',
            studentID: '',
            username: props.userInfo.username,
            location: ''
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCalendarChange = this.handleCalendarChange.bind(this)
    }
    
    async componentDidMount(){
        let {userRole, username} = this.state
        let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/"
        
        if (userRole === 'Student'){
            url += "students?name=" + username
        } else if (userRole === "Tutor") {
            url += "tutors?name=" + username
        }
        
        if (userRole === 'Student' || userRole === 'Tutor' ) { 
            await fetch(url)
            .then(response => response.json())
            .then(response => {
                if (userRole === 'Student') {
                    this.setState({
                        studentID: response[0].StudentID
                    })
                } else if (userRole === "Tutor") {
                    this.setState({
                        tutorID: response[0].TutorID  
                    })
                }
            })
            .catch(err => console.log("ERR: " + err))
        }
    
        console.log("A")
        
        let {studentID, tutorID} = this.state
        url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/products"
        if (userRole === "Student") {
            url += '?studentID=' + studentID
        } else if (userRole === "Tutor") {
            url += '?tutorID=' + tutorID
        }
        console.log(url)
        fetch(url)
        .then(response => response.json())
        .then(response => this.setState({
            products: response
        }))
        .catch(err => console.log("ERR: " + err))
    }
    
    handleSubmit(e){
        e.preventDefault()
        let {productID, userRole, sessionLength, date} = this.state
        if (productID === '')
            alert("Please Select your Tutor and Subject")
        else 
            alert("session requested")
        console.log(this.state)
        //try create meeting, err handle
    }
    
    handleChange(e){
        let {id, value} = e.target
        if (id === 'sessionType') {
            this.setState({
                productID: value
            })
        } else if (id === "sessionLength") {
            this.setState({
                sessionLength: value
            })
        }
    }
    
    handleCalendarChange(date) {
        this.setState({
            date: date
        });
    };
    
    
    render(){
        let products
        let defaultString = ''
        let {userRole} = this.state
        if (userRole === "Admin")
        {
            defaultString = "Product"
            products = this.state.products.map(product => 
                <option key = {product.ProductID} value = {product.ProductID}>Student: {product.Student}, Tutor: {product.Tutor}, Subject: {product.Subject}</option>)
        } else if (userRole === "Student"){
            defaultString = "Tutor"
            products = this.state.products.map(product => 
                <option key = {product.ProductID} value = {product.ProductID}>{product.Subject} with {product.Tutor}</option>)
        } else if (userRole === "Tutor") {
            defaultString = "Student"
            products = this.state.products.map(product => 
                <option key = {product.ProductID} value = {product.ProductID}>{product.Subject} with {product.Student}</option>)
        }
        return (
            <div className = "scheduleSessionField">
                <h2> Request a Session Here: </h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <select id="sessionType" onChange={this.handleChange} defaultValue=''>
                            <option disabled="disabled" value=''>---Select a {defaultString}---</option>
                            {products}
                        </select>               
                    </div>
                    <div>
                        Date: <DatePicker selected={this.state.date} onChange={this.handleCalendarChange} showTimeSelect dateFormat = 'Pp' required/>
                    </div>
                    <div>
                        Length: <select id = "sessionLength" onChange={this.handleChange} defaultValue = '1:30'>
                            {Times.map(time => <option key = {time} value = {time}>{time}</option>)}
                        </select>
                    </div>
                    <div>
                        Location: <input id = "location" type="text" placeholder='i.e. Online, Library, etc.' onChange={this.handleChange} required/>
                    </div>
                    <button> Request</button>
                </form>
            </div>
        )
    }
}


export default ScheduleSession

