import React from 'react'
import '../style/ToDoInput.css'

const ToDoInput = ({ input, setInput, addTodo }) => {
  return (
    <div className='todo-input'>
        <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Add a ToDo' />

        <button onClick={addTodo}>Add</button>

    </div>
  )
}

export default ToDoInput