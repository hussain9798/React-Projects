import React, {useState} from 'react'
import ToDoItem from './components/ToDoItem'
import ToDoInput from './components/ToDoInput'
import './App.css';

function App() {

  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if(input.trim() === '') return;
    setTodos([...todos, {id: Date.now(), text: input, completed: false}])
    setInput(' ');
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo,completed:!todo.completed} : todo
    ));
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className='App'>
      <h1>ToDo Application</h1>
      <ToDoInput input={input} setInput={setInput} addTodo={addTodo}/>
      <ul>
        {todos.map(todo => (
        <ToDoItem 
        key={todo.id}
        todo={todo}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}/>
        ))}
      </ul>
    </div>
  )
}

export default App