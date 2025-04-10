import {useState} from "react";
import TodoTypes from "../Todo";
import TodoService from "../TodoService";

const TodoList = () =>{
    const [todos,setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
    const [editingTodoId, setEditTodoId] = useState<number | null>(null);
    const [editedTodoDescription, setEditedDescription] = useState<string>("")

    //Inicia la edición de una tarea, estableciendo el ID y la descripción que se van a editar.
    const handleEditStart = (id:number, description:string) =>{
        setEditTodoId(id);
        setEditedDescription(description);
    }
     // Cancela la edición, reseteando el estado
    const handleEditCancel =() =>{
        setEditTodoId(null);
        setEditedDescription("");
    }
      // Guarda los cambios de la tarea editada.
    const handleEditSave = (id:number) =>{
       // Si la descripción editada no está vacía, guarda los cambios.
        if(editedTodoDescription.trim() !== ''){
            const updateTodo = TodoService.updateTodo({id,description:editedTodoDescription,completed:false});
            //Se actualiza la lista de tareas, reemplanzado la editada
            setTodos((prevTodos) => prevTodos.map((todo) => (todo.id == id? updateTodo: todo)));
            //Se cancela la edicion luego de guardar
            setEditTodoId(null);
            setEditedDescription("");
        }
    }
    // Elimina una tarea, utilizando el servicio para borrar de localStorage.
    const handleDeleteTodo = (id: number) => {
        console.log("Deleting todo with ID:", id);
        TodoService.deleteTodo(id);
        const updatedTodos = TodoService.getTodos();
        console.log("Updated todos:", updatedTodos);
        setTodos(updatedTodos);
      };
      
    return (
        <div className="todo-list-container">
          <h2>List of To Do tasks</h2>
          
          {todos.length === 0 ? (
            <p>No pending tasks.</p>
          ) : (
            <ul className="todo-list">
              {todos.map((todo) => (
                <li key={todo.id} className="todo-item">
                  <input type="checkbox" />
                  
                  {editingTodoId === todo.id ? (
                    <div className="edit-mode">
                      <input
                        type="text"
                        value={editedTodoDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        className="edit-input"
                      />
                      <div className="edit-buttons">
                        <button onClick={() => handleEditSave(todo.id)}>Guardar</button>
                        <button onClick={handleEditCancel}>Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <div className="view-mode">
                      <span className="todo-description">
                        {todo.description}
                      </span>
                      <button 
                        onClick={() => handleEditStart(todo.id, todo.description)}
                        className="edit-button">Editar
                      </button>
                    </div>
                  )}
                 
                  <button 
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={{marginLeft: '10px', color: 'red'}}
                >
                  Eliminar
                </button>
                
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    };

export default TodoList;