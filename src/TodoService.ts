import TodoTypes from "./Todo";
  
const LOCAL_STORAGE_KEY = 'todos';
  
const TodoService ={

    getTodos: (): TodoTypes[] => {
        const todosStr = localStorage.getItem(LOCAL_STORAGE_KEY);
        return todosStr ? JSON.parse(todosStr) : [];
      },
    //Agregar todo
    addTodo: (description: string): TodoTypes => {
        const todos = TodoService.getTodos();
        const newTodo: TodoTypes = { id: Date.now(),description, completed: false}
        const updateTodos = [...todos, newTodo];
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

}; 

export default TodoService;