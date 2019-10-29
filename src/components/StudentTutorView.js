import React,{Component} from 'react'
import './ViewWithTable.css'


class StudentTutorView extends Component{
    _isMounted = false;
    
    constructor(props){
        super(props)
        this.state = {
            products: [],
            filterName: ''
        }

        this.handleChange=this.handleChange.bind(this)
    }
    componentDidMount(){
        this._isMounted=true
        let url = 'https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/products'
        if (this.props.studentID) {
            url += '?studentID=' + this.props.studentID
        } else if (this.props.tutorID) {
            url += '?tutorID=' + this.props.tutorID
        }
        fetch(url)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted && (this.props.studentID || this.props.tutorID)) {
                this.setState({
                    products: response
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
                        <th className="category">Subject</th>
                    </tr>
                    { this.props.studentID ?
                            this.state.filterName === '' ?
                                this.state.products.map(product=> <tr key = {product.TutorID + '-' + product.Subject}><th><a href={'/tutors/' + product.TutorID}>{product.Tutor}</a></th><th>{product.TutorEmail}</th><th>{product.TutorPhone}</th><th>{product.Subject}</th></tr>) :
                                this.state.products.filter(product=>product.Tutor.includes(this.state.filterName)).map(product=><tr key = {product.TutorID + '-' + product.Subject}><th><a href={'/tutors/' + product.TutorID}>{product.Tutor}</a></th><th>{product.TutorEmail}</th><th>{product.TutorPhone}</th><th>{product.Subject}</th></tr>)
                            :
                            this.state.filterName === '' ?
                                this.state.products.map(product=> <tr key = {product.StudentID + '-' + product.Subject}><th><a href={'/students/' + product.StudentID}>{product.Student}</a></th><th>{product.StudentEmail}</th><th>{product.StudentPhone}</th><th>{product.Subject}</th></tr>) :
                                this.state.products.filter(product=>product.Student.includes(this.state.filterName)).map(product=><tr key = {product.TutorID + '-' + product.Subject}><th><a href={'/students/' + product.StudentID}>{product.Student}</a></th><th>{product.StudentEmail}</th><th>{product.StudentPhone}</th><th>{product.Subject}</th></tr>)
                    }
                </tbody>
            </table>
            </React.Fragment>
        )
    }
}

export default StudentTutorView