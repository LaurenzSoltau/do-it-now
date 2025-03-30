const createProject = function(name) {
    let projectName = name;
    const projectId = crypto.randomUUID();
    const todos = [];

    const getName = () => projectName; 
    const setName = newName => projectName = newName;
    const getId = () => projectId;

    const getTodos = () => todos; 
    const getTodo = id => todos.find(todo => todo.id == id);
    const addTodo = todo => todos.push(todo);
    const removeTodo = todoId => {
        const index = todos.findIndex(todo => todo.id === todoId);
        todos.splice(index, 1);
    };

    return {
        getName,
        setName,
        getId,
        getTodos,
        getTodo,
        addTodo,
        removeTodo,
    };
};

export { createProject };