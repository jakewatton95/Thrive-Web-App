import React,{Component} from 'react'

class StudentView extends Component{
    _isMounted = false
    constructor(props){
        super(props)
        this.state = {
            students: []
        }
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

    
    render(){
        return(
            <div className="student">
                <div> Students: </div>
                {this.state.students.map(student => <div key={student.StudentID} > {student.Name} </div>)}
            </div>
        )
    }
}

export default StudentView