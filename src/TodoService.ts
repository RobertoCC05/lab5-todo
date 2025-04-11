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
  // Incrementar el ID para el siguiente todo
        const updateTodos = [newTodo, ...todos];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
        return newTodo;
    },
    //actualizar todo
    updateTodo: (todo:TodoTypes): TodoTypes => {
        const todos = TodoService.getTodos();
        const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
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
              date: !todo.completed ? new Date().toISOString() : undefined  // Fecha solo al completar
            };
          }
          return todo;
        });
      
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos.find(todo => todo.id === id);
    }
      
      
}; 

export default TodoService;