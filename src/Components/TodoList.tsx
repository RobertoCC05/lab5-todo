import {useState} from "react";
import TodoTypes from "../Todo";
import TodoService from "../TodoService";

const TodoList = ({ todos, setTodos }
  :
  { //Explicación de los props
    //todos Arreglo de tareas que se va a mostrar en la lista.
    todos: TodoTypes[], 
    //setTodos: Función para actualizar el estado de las tareas.
    // Se utiliza para agregar, eliminar o editar tareas.
    setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>> 
  }) =>{
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

    const handleToggleCompleted = (id: number) => {  // Cambia el estado de completado de una tarea
      const updatedTodo = TodoService.toggleCompleted(id); 
      if (updatedTodo) {
        setTodos((prev) => // actualiza la lista de tareas
          prev.map((todo) => (todo.id === id ? updatedTodo : todo)) // Reemplaza la tarea editada por la actualizada
        );
      }
    };

    // Se ordenan las tareas para mostrar primero las no completadas
    const sortedTodos = [...todos].sort((a, b) => Number(a.completed) - Number(b.completed));
    
    
    return (
        <div className="todo-list-container">
          <h2>List of To Do tasks</h2>
          
          {todos.length === 0 ? (
            <p>No pending tasks.</p>
          ) : (
            <ul className="todo-list">
              {sortedTodos.map((todo) => (
                <li key={todo.id} className="todo-item">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleCompleted(todo.id)}
                  />

                  
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
                        <span
                          className="todo-description"
                          style={{
                            color: todo.completed ? 'red' : 'white',
                            textDecoration: todo.completed ? 'line-through' : 'none'
                          }}
                        >
                          {todo.description}
                        </span>

                        {todo.completed && todo.date && (
                          <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>
                            Completado el: {new Date(todo.date).toLocaleString('es-CR')}
                          </div>
                        )}

                        <button
                          onClick={() => handleEditStart(todo.id, todo.description)}
                          className="edit-button"
                        >
                          Editar
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