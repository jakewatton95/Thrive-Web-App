import React,{Component} from 'react'
import './ViewWithTable.css'

class StudentView extends Component{
    _isMounted = false
    constructor(props){
        super(props)
        this.state = {
            students: [],
            filterName: ''
        }
        
        this.handleChange=this.handleChange.bind(this)
    }
    
    componentDidMount(){
       this._isMounted = true
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/students')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    students: response
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
                <label>Student Name: </label>
                <input id = 'name' type ="text" onChange={this.handleChange}></input> 
            </form>
            <table>
                <tbody>
                    <tr key="categories">
                        <th className="category" >Name</th>
                        <th className="category">Email</th>
                        <th className="category">Phone Number</th>
                    </tr>
                    {this.state.filterName === '' ? this.state.students.map(student=> <tr key={student.StudentID}><th><a href={"/students/"+student.StudentID}> {student.Name}</a></th><th>{student.Email}</th><th>{student.Phone}</th></tr>) :
                    this.state.students.filter(student=>student.Name.includes(this.state.filterName)).map(student=><tr key={student.StudentID}><th><a href={"/students/"+student.StudentID}> {student.Name}</a></th><th>{student.Email}</th><th>{student.Phone}</th></tr>)}
                </tbody>
            </table>
            </React.Fragment>
        )
    }
}

export default StudentView