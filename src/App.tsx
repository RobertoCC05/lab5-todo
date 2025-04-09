import { useState } from 'react'
import './App.css'

interface Todo {
  description: string;
}

function App() {

  
  const [todoDescription, setTodoDescription] = useState('')
  const [todosList, setTodoList] = useState<Todo[]>([])	

  const handleChange = (e: any) => {
    setTodoDescription(e.target.value)  
  }
  
  const handleClick = () => {
    const tempTodoList = [...todosList]
    const newTodo = {
      description: todoDescription
    }
    tempTodoList.unshift(newTodo)
    console.log('tempTodoList', tempTodoList)
    setTodoList(tempTodoList)
   }

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

        <div>List of To Do tasks</div>
        <div>{JSON.stringify(todosList)}</div>

      </div>
        
    </>
  )
}

export default App
