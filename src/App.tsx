import { useState, useEffect } from 'react'
import './App.css'
import TodoTypes from './Todo'
import TodoService from './TodoService'
import TodoList from './Components/TodoList'

function App() {

  
  const [todoDescription, setTodoDescription] = useState('')
  const [todosList, setTodoList] = useState<TodoTypes[]>([])	

  // Cargar todos existentes
  useEffect(() => {
    const savedTodos = TodoService.getTodos()
    setTodoList(savedTodos)
  }, [])

  const handleChange = (e: any) => {
    setTodoDescription(e.target.value)  
  }


  // Agregar nueva tarea
  const handleClick = () => {
    if (todoDescription.trim() === '') return;

    const newTodo = TodoService.addTodo(todoDescription);
    // Actualizar el estado con la nueva tarea
    setTodoList((prevTodos) => [newTodo, ...prevTodos]);
    setTodoDescription('');
  };

  return (
    <>
      <div style={{border: '1px solid grey', padding: '20px'}}>
        
        <div>
          <input 
            type="text" 
            placeholder="Enter your task" 
            onChange={handleChange}
            value={todoDescription} 
            style={{padding: '10px', width: '300px', marginRight: '10px'}}
          />
          <button onClick={handleClick}>Add task</button>
        </div>
        <br />
        <TodoList/> 
      </div>
        
    </>
  )
}

export default App
