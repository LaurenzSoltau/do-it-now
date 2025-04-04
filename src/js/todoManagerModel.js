// eslint-disable-next-line no-undef
const { isToday } = require("date-fns");

const todoManager = (function () {
    let todos = [];
    let projects = [];

    const getAll = () => todos;

    const setTodos = _todos => todos = _todos;

    const getDone = () => {
        return todos.filter((todo) => todo.checked);
    };

    const getToday = () => {
        return todos.filter(todo => isToday(todo.dueDate));
    };

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

    const setProjects = (_projects) => {
        projects = _projects;
    };

    const getProject = (projectId) => {
        return projects.find((project) => project.getId() === projectId);
    };

    const getProjectTodos = (projectId) => {
        return todos.filter((todo) => todo.projectId === projectId);
    };

    const addTodo = function (todo) {
        todos.push(todo);
    };

    const getTodo = function (todoId) {
        return todos.find((todo) => todo.id === todoId);
    };

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
        setProjects,
        getProject,
        getProjectTodos,
        addTodo,
        getTodo,
        removeTodo,
        printTodos,
        getAll,
        setTodos,
        getDone,
        getToday,
    };
})();

export default todoManager;
