import React, {Component} from 'react'
import UpcomingSessions from './UpcomingSessions'

class TutorProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            tutorID:props.match.params.tutorID,
            tutor:''
        }
    }
    
    componentDidMount(){
        this._isMounted=true

        const {match: {params}} = this.props
        this.setState({
            tutorID: params.tutorID
        })

        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/tutors?id='+params.tutorID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    tutor: response[0]
                })
            }
        })
        .catch(err => console.log("Err" + err))
    }
    
    componentWillUnmount(){
        this._isMounted=false   
    }
    
    render() {
        let {tutor} = this.state
        return (
            <React.Fragment>
                <h2> Viewing info for {tutor.Name}</h2>
                <div> Email: {tutor.Email} </div>
                <div> Phone: {tutor.Phone} </div>
                <UpcomingSessions userRole = "Tutor" tutorID={this.state.tutorID}/>
            </React.Fragment>
        )
    }
}
export default TutorProfile