import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import './SignUpForm.css'


class SignUpForm extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            username: '',
            password: '',
            phone_number: '',
            email: '',
            confirmationCode: '',
            userRole: '',
            verified: false,
            agencyCode: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signUp = this.signUp.bind(this);
        this.confirmSignUp = this.confirmSignUp.bind(this);
        this.handleAlreadySignedUp=this.handleAlreadySignedUp.bind(this)
        this.addUser = this.addUser.bind(this)
    }
  
    signUp() {
        const { username, password, email, phone_number, userRole } = this.state;  
        Auth.signUp({
            username: username,
            password: password,
            attributes: {
                email: email,
                phone_number: phone_number,
                'custom:userRole': userRole
            }
        })
        .then(() => {
            console.log('Successfully signed up');
        })
        .catch((err) => console.log(`Error signing up: ${ err }`))
    }
    
    addUser(){
      const endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/"
      const fullURL = endpoint + this.state.userRole.toLowerCase() + "s?name=" + this.state.username + "&email=" + this.state.email
      fetch(fullURL, {method: "POST"})
      .then(response => console.log(response.json()))
      .catch(err => console.log("ERR: " + err))
    }
  
    confirmSignUp() {
        const { username, confirmationCode } = this.state;
        Auth.confirmSignUp(username, confirmationCode)
        .then(() => {
            console.log('Successfully confirmed signed up')
            this.addUser();
            this.props.handleSignup();
        })
        .catch((err) => console.log(`Error confirming sign up - ${ err }`))
    }
  
    handleSubmit(e) {
      const { verified } = this.state;
  
        e.preventDefault();
  
        if (verified) {
          this.confirmSignUp();
          this.setState({
             confirmationCode: '',
// need for post             username: ''
          });
        } else {
          this.signUp();
          this.setState({
            password: '',
//need for post       email: '',
            phone_number: '',
            verified: true
        });
        }
        e.target.reset();
    }
    
    handleAlreadySignedUp(e){
      e.preventDefault();
      this.props.handleSignup();
    }
  
    handleChange(e) {
        if (e.target.id === 'username') {
          this.setState({
              username: e.target.value
          });
        } else if (e.target.id === 'password') {
          this.setState({
              password: e.target.value
          });
        } else if (e.target.id === 'phone_number') {
          this.setState({
              phone_number: e.target.value
          });
        } else if (e.target.id === 'email') {
          this.setState({
              email: e.target.value
          });
        } else if (e.target.id === 'confirmationCode') {
          this.setState({
              confirmationCode: e.target.value
          });
        } else if (e.target.name === 'userRole') {
          this.setState({
              userRole: e.target.value
          });
        } else if (e.target.id === 'code') {
          this.setState({
            agencyCode: e.target.value
          });
        }
    }
  
    render() {
      const { verified } = this.state;
      if (verified) {
          return (
              <div>
                  <form onSubmit={ this.handleSubmit }>
                      <label>Confirmation Code</label>
                      <input id='confirmationCode' type='text' onChange={ this.handleChange }/>
                      <button>Confirm Sign up</button>
                  </form>
              </div>
          );
      } else {
        return (
          <React.Fragment>
            <div className="signUpForm">
              <form onSubmit={ this.handleSubmit }>
                  <div>
                    <label>Username</label>
                    <input id='username' type='text' onChange={ this.handleChange }/>
                  </div>
                  <div>
                    <label>Password</label>
                    <input id='password' type='password' onChange={ this.handleChange }/>
                  </div>
                  <div>
                    <label>Phone Number</label>
                    <input id='phone_number' type='text' onChange={ this.handleChange }/>
                  </div>
                  <div>
                    <label>Email</label>
                    <input id='email' type='text' onChange={ this.handleChange }/>
                  </div>
                    <label>Agency Code</label>
                    <input id='code' type='text' onChange={ this.handleChange }/>
                  <div>
                  <label>Student</label>
                  <input name = "userRole" id = "ur1" type='radio' value="Student" onChange={this.handleChange}/>
                  <label>Tutor</label>
                  <input name = "userRole" id = "ur2" type='radio' value="Tutor" onChange={this.handleChange}/>
                  <label>Admin</label>
                  <input name= "userRole" id = "ur3" type='radio' value="Admin" onChange={this.handleChange}/>
                  </div>
                  <div>
                    <button>Sign up</button>
                  </div>
              </form>
              <div> Already signed up? <a href="/" onClick={this.handleAlreadySignedUp}>Click Here to sign in</a></div>
            </div>
          </React.Fragment>
        );
      }
    }
}

export default SignUpForm;