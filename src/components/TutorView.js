import React,{Component} from 'react'
import './ViewWithTable.css'


class TutorView extends Component{
    _isMounted = false;
    
    constructor(props){
        super(props)
        this.state = {
            tutors: [],
            filterName: ''
        }

        this.handleChange=this.handleChange.bind(this)
    }
    
    componentDidMount(){
        this._isMounted=true
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/tutors')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    tutors: response
                })
            }
        })
        .catch(err => console.log("Err" + err))
    }
    
    componentWillUnmount(){
        this._isMounted = false
    }
    
    handleChange(e){
        let {id, value} = e.target
        if (id === "name"){
            this.setState({
                filterName: value
            })
        }
    }
    
    render(){
        return(
            <React.Fragment>
            <form>
                <label>Tutor Name: </label>
                <input id = 'name' type ="text" onChange={this.handleChange}></input> 
            </form>
            <table>
                <tbody>
                    <tr>
                        <th className="category" >Name</th>
                        <th className="category">Email</th>
                        <th className="category">Phone Number</th>
                    </tr>
                    {this.state.filterName === '' ? this.state.tutors.map(tutor=> <tr key = {tutor.TutorID}><th><a href={'/tutors/' + tutor.TutorID}>{tutor.Name}</a></th><th>{tutor.Email}</th><th>{tutor.Phone}</th></tr>) :
                    this.state.tutors.filter(tutor=>tutor.Name.includes(this.state.filterName)).map(tutor=><tr key = {tutor.TutorID}><th><a href={'/tutors/' + tutor.TutorID}>{tutor.Name}</a></th><th>{tutor.Email}</th><th>{tutor.Phone}</th></tr>)}
                </tbody>
            </table>
            </React.Fragment>
        )
    }
}

export default TutorView