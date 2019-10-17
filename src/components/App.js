import React, {Component} from 'react';

import List from './List'
import MyInfo from './MyInfo'
import TodoItem from './TodoItem'
import todosData from './todosData'


class App extends Component{
    constructor(){
        super()
        this.state = {
            todos: todosData
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(id) {
        this.setState(prevState=>{
            const updatedTodos = prevState.todos.map(todo =>{
                if (todo.id === id){
                    todo.completed = !todo.completed
                }
                return todo
            })
            return {
                todos: updatedTodos
            }
        })
    }
    
    render(){
        const todoItems = this.state.todos.map(todo => 
            <TodoItem key = {todo.id} todo={todo} handleChange={this.handleChange}/>
        )
        return (
            <div className = "todoList">
                {todoItems}
            </div>
        )
    }
}

export default App; 


