const todoManager = (function () {
    const todos = [];
    const projects = [];

    const getAll = () => todos;

    const getDone = () => {
        return todos.filter(todo => todo.checked);
    }

    const addProject = function (project) {
        projects.push(project);
    };

    const removeProject = function (projectId) {
        const index = projects.findIndex(
            (project) => project.getId() === projectId
        );
        projects.splice(index, 1);
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].projectId === projectId) {
                todos.splice(i, 1);
            }
        }

    };

    const getProjects = () => projects;

    const getProject = (projectId) => {
        return projects.find(project => project.getId() === projectId);
    }
    
    const getProjectTodos = (projectId) => {
        return todos.filter(todo => todo.projectId === projectId);
    }

    const addTodo = function (todo, projectId) {
        todos.push(todo);
    };

    const getTodo = function (todoId) {
        return todos.find(todo => todo.id === todoId);
    }

    const removeTodo = function (todoId) {
        const index = todos.findIndex((todo) => todo.id === todoId);
        if (index !== -1) todos.splice(index, 1);
    };

    const printTodos = function () {
        console.log(todos);
        console.log(projects);
    };

    return {
        addProject,
        removeProject,
        getProjects,
        getProject,
        getProjectTodos,
        addTodo,
        getTodo,
        removeTodo,
        printTodos,
        getAll,
        getDone,
    }
})();

export default todoManager;
