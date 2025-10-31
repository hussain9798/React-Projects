import React from 'react'

const ToDoItem = ({ todo, toggleComplete, deleteTodo}) => {
  return (
    <div>
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
        
    </div>
  )
}
export default ToDoItem;
