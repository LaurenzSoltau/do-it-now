import { createProject } from "./projectModel.js";

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

    const addTodo = function (todo, projectId) {
        todos.push(todo);
        const project = projects.find(
            (project) => project.getId() === projectId
        );
        project.addTodo(todo);
    };

    const removeTodo = function (todoId, projectId) {
        const index = todos.findIndex((todo) => todo.id === todoId);
        todos.splice(index, 1);
        const project = projects.find(
            (project) => project.getId() === projectId
        );
        project.removeTodo(todoId);
    };

    const printTodos = function () {
        console.log(todos);
        console.log(projects);
    };
})();

export default todoManager;
