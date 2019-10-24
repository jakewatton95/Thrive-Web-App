import React, {Component} from 'react'


class Billing extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            
        }
    }
    
    componentDidMount(){
        //TODO if (information hasn't been fetched and stored yet)
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI')//?include user name or email
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
    
    render(){
        return (
            <div className = "main">
                <div> Welcome to Billing</div>
            </div>
        )
    }
}
    
export default Billing