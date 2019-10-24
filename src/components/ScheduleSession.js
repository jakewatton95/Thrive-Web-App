import React, {Component} from 'react'
import './ScheduleSession.css'

class ScheduleSession extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            products: [],
            productID: ''
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    componentDidMount(){
        fetch("https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/products?studentID=36")
        .then(response => response.json())
        .then(response => this.setState({
            products: response
        }))
        .catch(err => console.log("ERR: " + err))
    }
    
    handleSubmit(e){
        e.preventDefault()
        alert("session requested")
        console.log(this.state.products)
    }
    
    handleChange(e){
        e.preventDefault()
        let {id, value} = e.target
        if (id === 'sessionType') {
            this.setState({
                productID: value
            })
        }
        
    }
    
    render(){
        return (
            <div className = "scheduleSessionField">
                <h2> Request a Session Here: </h2>
                <form onSubmit={this.handleSubmit}>
                    <select id="sessionType" onChange={this.handleChange} defaultValue=''>
                        <option disabled="disabled" value=''>---Select a Tutor---</option>
                        {this.state.products.map(product => <option key = {product.ProductID} value = {product.ProductID}>{product.Subject} with {product.Tutor}</option> )}
                    </select>                    
                    <button> Request</button>
                </form>
            </div>
        )
    }
}


export default ScheduleSession

//                        {this.state.products.map(product => <option key = {product.ID} value = {product.ID}>{product.Subject} with {product.Tutor}</option> )}
