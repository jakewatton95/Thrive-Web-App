import React,{Component} from 'react'

class TutorView extends Component{
    constructor(props){
        super(props)
        this.state = {
            tutors: []
        }
    }
    
    componentDidMount(){
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/tutors')
        .then(response => response.json())
        .then(response =>
            this.setState({
                tutors: response
            })
        )
        .catch(err => console.log("Err" + err))
    }
    
    render(){
        return(
            <div className="tutorView">
                <div> Tutors: </div>
                {this.state.tutors.map(tutor=> <div key={tutor.TutorID} > {tutor.Name} </div>)}
            </div>
            
        )
    }
}

export default TutorView