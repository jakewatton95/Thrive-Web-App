import React, {Component} from 'react';

class TextInput extends Component{
    constructor(){
        super()
        this.state = {
            inputText: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        const {name, value} = event.target;
        this.setState({[name]: value})
    }
    handleSubmit(event){
        console.log("Button Pressed");
        event.preventDefault();
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type = "text" name="inputText" value={this.state.inputText} placeholder = "test" onChange={this.handleChange}/>
                <button> Submit {this.state.inputText}</button>
            </form>
        )
    }
}

export default TextInput;