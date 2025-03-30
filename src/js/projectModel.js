const createProject = function(name) {
    let projectName = name;
    const todos = [];

    const getName = () => projectName; 
    const setName = newName => projectName = newName;

    const getTodos = () => todos; 
    const getTodo = id => todos.find(todo => todo.id == id);
    const addTodo = todo => todos.push(todo);
    const removeTodo = todo => {
        const index = todos.findIndex(_todo => _todo === todo);
        todos.splice(index, 1);
    };

    return {
        getName,
        setName,
        getTodos,
        getTodo,
        addTodo,
        removeTodo,
    };
};

export { createProject };