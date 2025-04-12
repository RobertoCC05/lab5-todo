import TodoTypes from "./Todo";
  
const LOCAL_STORAGE_KEY = 'todos';

const getNextId = (): number => {
    const storedId = localStorage.getItem('todo_id_counter');
    const nextId = storedId ? parseInt(storedId) + 1 : 1;
    localStorage.setItem('todo_id_counter', nextId.toString());
    return nextId;
};
  
const TodoService ={
    getTodos: (): TodoTypes[] => {
        const todosStr = localStorage.getItem(LOCAL_STORAGE_KEY);
        return todosStr ? JSON.parse(todosStr) : [];
    },
    //Agregar todo Date.now()
    addTodo: (description: string): TodoTypes => {
        const todos = TodoService.getTodos();
        const newTodo: TodoTypes = { id:getNextId(),description, completed: false}
        // Se agrega la nueva tarea al inicio de la lista de tareas
        const updateTodos = [newTodo, ...todos];
        // Se guarda la nueva lista de tareas en localStorage
        // Se convierte la lista de tareas a formato JSON para guardarla en localStorage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
        return newTodo;
    },
    //actualizar todo
    updateTodo: (todo:TodoTypes): TodoTypes => {
        const todos = TodoService.getTodos();
        const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t));
        // Se guarda la lista de tareas actualizada en localStorage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
        // Se devuelve la tarea actualizada
        return todo;
    }, 
    //eliminar todo
    deleteTodo: (id:number): void =>{
        const todos = TodoService.getTodos();
        const updateTodos = todos.filter((todo) => todo.id !==id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    },
    
    toggleCompleted: (id: number): TodoTypes | undefined => {
        const todos = TodoService.getTodos();
        const updatedTodos = todos.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: !todo.completed,
              // Guarda la fecha y hora al marcar como completada la tares
              date: !todo.completed ? new Date().toISOString() : undefined  
            };
          }
          return todo;
        });
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos.find(todo => todo.id === id);
    }  
}; 

export default TodoService;