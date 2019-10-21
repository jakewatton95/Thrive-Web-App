import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import StudentContainer from '../containers/StudentContainer.js'
import AdminContainer from '../containers/AdminContainer.js'
import TutorContainer from '../containers/TutorContainer.js'
import './SignInForm.css'

class SignInForm extends Component {
    constructor(props) {
        super(props)
  
        this.state = {
            user: '',
            password: '',
            userRole: '',
            signedIn: false,
            showLoading: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.signIn = this.signIn.bind(this)
        this.confirmSignIn = this.confirmSignIn.bind(this)
        this.handleNotSignedUp = this.handleNotSignedUp.bind(this)
        this.getUserRole = this.getUserRole.bind(this)
        this.signOut=this.signOut.bind(this)
    }
 
    signIn() {
        console.log("A");
        const { username, password } = this.state  
        Auth.signIn({
            username: username,
            password: password
        })
        .then(() => this.getUserRole()
        )
        .catch((err) => console.log(`Error signing in: ${ err }`))
        console.log("B")
        
    }
  
    confirmSignIn() {
        const { username } = this.state
        Auth.confirmSignIn(username)
        .then(() => console.log('successfully confirmed signed in'))
        .catch((err) => console.log(`Error confirming sign up - ${ err }`))
    }
  
    handleSubmit(e) {
        e.preventDefault()
        this.signIn()
        //this.getUserRole();
        //this.confirmSignIn() only needed for 2FA
        this.setState({
            password: '',
            showLoading: true
        })
    }
  
    handleChange(e) {
        if (e.target.id === 'username') {
          this.setState({
              username: e.target.value
          })
        } else if (e.target.id === 'password') {
          this.setState({
              password: e.target.value
          })
        }
    }
    
    handleNotSignedUp(e){
      e.preventDefault()
      this.props.handleSignup()
    }
    
    checkUser() {
        Auth.currentUserInfo()
        .then(user => console.log(user.attributes['custom:userRole']))
        .catch(err => console.log(err))
    }
    
    getUserRole(){
        console.log("C")
        let userRole = Auth.currentUserInfo()
        .then(user => user.attributes['custom:userRole'])
        .catch(err => console.log(err))
         userRole.then(ret => this.setState({
            userRole: ret,
            signedIn: true
        }))
        console.log("D")
        console.log(this.state.userRole) //notice this doesnt finish in time but it doesnt matter 
    }
    
    signOut(){
        Auth.signOut()
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
        this.setState({
            signedIn: false,
            showLoading: false,
            userRole: ''
        })
    }
  
    render() {
        const { signedIn } = this.state
        if (signedIn) {
            if (this.state.userRole === "Tutor")
                return <TutorContainer/>
            else if (this.state.userRole === "Student")
                return <StudentContainer/>
            else if (this.state.userRole === "Admin")
                return <AdminContainer signOut={this.signOut}/>
            else 
                return <div> Loading... </div>
        } else {
            return (
                <div>
                    <div className={this.state.showLoading ? 'showLoading' : 'hideLoading'}>Loading...</div>
                    <form className="signInForm" onSubmit={ this.handleSubmit }>
                        <label>Username</label>
                        <input id='username' type='text' onChange={ this.handleChange }/>
                        <label>Password</label>
                        <input id='password' value={this.state.password} type='password' onChange={ this.handleChange }/>
                        <button>Sign In</button>
                    </form>
                    <div> New User? <a href="/" onClick={this.handleNotSignedUp}>Click Here to sign up!</a></div>
                </div>
        )
      }
    }
}

export default SignInForm