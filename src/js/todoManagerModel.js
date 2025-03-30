const todoManager = (function () {
    const todos = [];
    const projects = [];

    const addProject = function (project) {
        projects.push(project);
    };

    const removeProject = function (projectId) {
        const project = projects.find(
            (project) => project.getId() === projectId
        );
        const index = projects.findIndex(
            (project) => project.getId() === projectId
        );
        for (const todo of project.getTodos()) {
            removeTodo(todo.id, projectId);
        }
    };

    const getProjects = () => projects;

    const addTodo = function (todo, projectId) {
        todos.push(todo);
        const project = projects.find(
            (project) => project.getId() === projectId
        );
        if (project !== undefined) project.addTodo(todo);
    };

    const removeTodo = function (todoId, projectId) {
        const index = todos.findIndex((todo) => todo.id === todoId);
        if (index !== -1) todos.splice(index, 1);
        const project = projects.find(
            (project) => project.getId() === projectId
        );
        if (project !== undefined) project.removeTodo(todoId);
    };

    const printTodos = function () {
        console.log(todos);
        console.log(projects);
    };

    return {
        addProject,
        removeProject,
        getProjects,
        addTodo,
        removeTodo,
        printTodos,
    }
})();

export default todoManager;
