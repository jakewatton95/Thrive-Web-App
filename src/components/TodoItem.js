import React from 'react';

const TodoItem = (props) =>
{
  const completedStyle = {
    color: "gray"
  }
  
  
  return (
    <div className = "todo-item">
      <input type="checkbox" checked = {props.todo.completed} 
      onChange = {()=> props.handleChange(props.todo.id)}/>
      <p style = {props.todo.completed ? completedStyle: null}> 
        {props.todo.text} 
      </p>
    </div>
  )
  
}
  
export default TodoItem