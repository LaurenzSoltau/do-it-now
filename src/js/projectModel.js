const createProject = function(name) {
    let projectName = name;
    const todos = [];

    const getName = () => projectName; 
    const setName = newName => projectName = newName;

    const getTodos = () => todos; 
    const getTodo = id => todos.find(todo => todo.id == id);
    const addTodo = todo => todos.push(todo);

    return {
        getName,
        setName,
    };
};

export { createProject };