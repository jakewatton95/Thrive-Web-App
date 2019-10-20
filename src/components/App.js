import React, {Component} from 'react'
import ThriveNav from './ThriveNav'
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

Amplify.configure(awsconfig);

class App extends Component{
    constructor(){
        super()
        this.state={
            signedUp : false
        }
        this.handleSignup = this.handleSignup.bind(this)
        
    }
    
    handleSignup(e) {
        console.log(this.state.signedUp)
        this.setState({
            signedUp: !this.state.signedUp
        })
    }

    render(){
        const {signedUp} = this.state
        return !signedUp ? <SignUpForm handleSignup={ this.handleSignup }/> : <SignInForm />;
        
    }
}

export default App; 

/*                <Main/>
                <Footer/>
                <Nav className= "nav-tabs">
                    <div className = "navItem">
                        <NavLink to="/react" activeClassName="active" className="nav-link">
                            React
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/error" activeClassName="active" className="nav-link">
                            error
                        </NavLink>
                    </div>
                </Nav>
                <Switch>
                    <Route path="/react">
                        <div>React</div>
                    </Route>
                    <Route exact path = "/home">
                        <div>Slam</div>
                    </Route>
                    <Route exact path = "/error">
                        <div>link doesnt exist </div>
                    </Route>
                    <Redirect to="/error"></Redirect>
                </Switch>
                */
                
                
/*return (
           <React.Fragment>
                <ThriveNav/>
            </React.Fragment>    
        )
        */