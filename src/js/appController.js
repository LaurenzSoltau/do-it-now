import appView from "./appView.js";
import todoManager from "./todoManagerModel.js";
import { createProject } from "./projectModel.js";
import { createTodo } from "./todoModel.js";
import { storageHandler } from "./storageHandler.js";

const appController = (function () {

    document.addEventListener("DOMContentLoaded", () => {
        if (!storageHandler.storageAvailable("localStorage")) return;
        if (!storageHandler.itemsStored()) return;
        const projectContainer = document.querySelector(".project-container");
        const todoSection = document.querySelector(".main-wrapper");
        activeCollection = collection.ALL;
        const projects = storageHandler.retrieveProjects();
        todoManager.setProjects(projects);
        appView.renderProjects(projectContainer, todoManager.getProjects());
        const todos = storageHandler.retrieveTodos();
        todoManager.setTodos(todos);
        appView.renderCollectionTodos(todoSection, todoManager.getAll(), "All Todos");
    });

    function safeData() {
        const projects = todoManager.getProjects();
        const todos = todoManager.getAll();
        storageHandler.safeData(projects, todos);
    }

    const collection = {
        ALL: "all",
        TODAY: "today",
        DONE: "done",
        NONE: "none",
    };

    let activeCollection;

    function getCurrentTodos(projectId) {
        let todos;
        switch (activeCollection) {
            case collection.ALL:
                todos = todoManager.getAll();
                break;
            case collection.TODAY:
                todos = todoManager.getToday();
                break;
            case collection.DONE:
                todos = todoManager.getDone();
                break;
            default:
                todos = todoManager.getProjectTodos(projectId);
        }

        return todos;
    }

    const createProjectModal = document.querySelector("#create-project");
    const createProjectForm = createProjectModal.querySelector("form");
    const editProjectModal = document.querySelector("#change-project");
    const editProjectForm = editProjectModal.querySelector("form");

    const handleProjectModals = function (e) {
        e.preventDefault();
        const data = new FormData(e.target);
        if (e.target === createProjectForm) {
            const newProject = createProject(data.get("name"));
            todoManager.addProject(newProject);
            safeData();
        }
        if (e.target === editProjectForm) {
            const projectId = editProjectForm.dataset.projectId;
            const project = todoManager.getProject(projectId);
            project.setName(data.get("name"));
            const currentProjectId =
                todoSection.querySelector(".todo-container").dataset.projectId;
            if (projectId === currentProjectId) {
                appView.renderProjectTodos(todoSection, project);
            }
            safeData();
        }

        appView.renderProjects(projectContainer, todoManager.getProjects());
        createProjectModal.close();
        editProjectModal.close();
    };
    createProjectForm.addEventListener("submit", handleProjectModals);
    editProjectForm.addEventListener("submit", handleProjectModals);

    const addProjectButton = document.querySelector("#add-project");
    addProjectButton.addEventListener("click", () => {
        createProjectForm.reset();
        createProjectModal.showModal();
    });

    const todoSection = document.querySelector("section");
    const projectContainer = document.querySelector("#project-container");
    const createTodoModal = document.querySelector("#create-todo");
    const createTodoForm = createTodoModal.querySelector("form");
    createTodoForm.addEventListener("submit", handleTodoModal);
    const editTodoModal = document.querySelector("#edit-todo");
    const editTodoForm = editTodoModal.querySelector("form");
    editTodoForm.addEventListener("submit", handleTodoModal);
    let dynamicAddTodoButton;

    function handleTodoModal(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        let projectId;
        const name = data.get("name");
        const description = data.get("description");
        const dueDate = data.get("due-date");
        const priority = data.get("priority");

        if (e.target === createTodoForm) {
            projectId = e.target.dataset.projectId;
            const newTodo = createTodo(
                name,
                description,
                dueDate,
                priority,
                projectId
            );
            todoManager.addTodo(newTodo);
            safeData();
        }

        if (e.target === editTodoForm) {
            projectId = e.target.dataset.projectId;
            const todo = todoManager.getTodo(e.target.dataset.todoId);
            todo.title = name;
            todo.description = description;
            todo.dueDate = dueDate;
            todo.priority = priority;
            safeData();
        }

        const todoContainer = document.querySelector(".todo-container");
        appView.renderTodos(
            todoContainer,
            todoManager.getProjectTodos(projectId)
        );
        createTodoModal.close();
        editTodoModal.close();
    }

    const collectionContainer = document.querySelector(".collection-container");
    collectionContainer.addEventListener("click", (e) => {
        if (!e.target.classList.contains("container-button")) return;
        let collectionName;

        if (e.target.id === "all") {
            activeCollection = collection.ALL;
            collectionName = "All Todos";
        }
        if (e.target.id === "today") {
            activeCollection = collection.TODAY;
            collectionName = "Tasks Due Today";
        }
        if (e.target.id === "done") {
            activeCollection = collection.DONE;
            collectionName = "Completed Tasks";
        }

        const todos = getCurrentTodos();
        appView.renderCollectionTodos(todoSection, todos, collectionName);
    });

    projectContainer.addEventListener("click", (e) => {
        const projectDiv = e.target.closest(".project");
        if (!projectDiv) return;
        activeCollection = collection.NONE;
        const projectId = projectDiv.dataset.projectId;
        if (e.target.classList.contains("container-button")) {
            activeCollection = collection.NONE;
            appView.renderProjectTodos(
                todoSection,
                todoManager.getProject(projectId)
            );
            dynamicAddTodoButton = document.querySelector(".add-todo");
            dynamicAddTodoButton.addEventListener("click", () => {
                createTodoForm.reset();
                createTodoForm.dataset.projectId = projectId;
                createTodoModal.show();
            });
        }
        if (e.target.classList.contains("project-delete-button")) {
            todoManager.removeProject(projectId);
            safeData();
            appView.renderProjects(projectContainer, todoManager.getProjects());
            const currentProjectId =
                todoSection.querySelector(".todo-container").dataset.projectId;
            if (currentProjectId === projectId) {
                activeCollection = collection.ALL;
                const todos = getCurrentTodos();
                appView.renderCollectionTodos(todoSection, todos, "All Todos");
            }
        }
        if (e.target.classList.contains("project-edit-button")) {
            editProjectForm.querySelector("input").value = todoManager
                .getProject(projectId)
                .getName();
            editProjectForm.dataset.projectId = projectId;
            editProjectModal.showModal();
        }
    });

    todoSection.addEventListener("click", (e) => {
        const todoDiv = e.target.closest(".todo");
        if (!todoDiv) return;
        const todoId = todoDiv.dataset.todoId;
        const todo = todoManager.getTodo(todoId);
        const projectId = todo.projectId;
        const container = e.target.closest(".todo-container");

        if (e.target.classList.contains("edit-todo")) {
            editTodoForm.querySelector("#name").value = todo.title;
            editTodoForm.querySelector("#description").value = todo.description;
            editTodoForm.querySelector("#due-date").value = todo.dueDate;
            editTodoForm.querySelector("#priority").value = todo.priority;
            editTodoForm.dataset.todoId = todoId;
            editTodoForm.dataset.projectId = projectId;
            editTodoModal.show();
        }

        if (e.target.classList.contains("delete-todo")) {
            todoManager.removeTodo(todoId);
            safeData();
            const todos = getCurrentTodos(projectId);
            appView.renderTodos(container, todos);
        }

        if (e.target.classList.contains("checkbox")) {
            todo.checked = !todo.checked;
            safeData();
            const todos = getCurrentTodos(projectId);
            appView.renderTodos(container, todos);
        }
    });
})();

export default appController;
