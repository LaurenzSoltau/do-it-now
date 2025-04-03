import appView from "./appView.js";
import todoManager from "./todoManagerModel.js";
import { createProject } from "./projectModel.js";
import { createTodo } from "./todoModel.js"

const appController = (function () {
    let currentTodos;

    const createProjectModal = document.querySelector("#create-project");
    const createProjectForm = createProjectModal.querySelector("form");
    const editProjectModal = document.querySelector("#change-project");
    const editProjectForm = editProjectModal.querySelector("form");
    const allButton = document.querySelector("#all");
    allButton.addEventListener("click", e => {
        appView.renderCollectionTodos(todoSection, todoManager.getAll(), "All Todos");
    })

    const handleProjectModals = function (e) {
        e.preventDefault();
        const data = new FormData(e.target);
        if (e.target === createProjectForm) {
            const newProject = createProject(data.get("name"));
            todoManager.addProject(newProject);
        }
        if (e.target === editProjectForm) {
            const projectId = editProjectForm.dataset.projectId;
            const project = todoManager.getProject(projectId);
            project.setName(data.get("name"));
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
            const newTodo = createTodo(name, description, dueDate, priority, projectId);
            todoManager.addTodo(newTodo);
        }

        if (e.target === editTodoForm) {
            projectId = e.target.dataset.projectId;
            const todo = todoManager.getTodo(e.target.dataset.todoId);
            todo.title = name;
            todo.description = description;
            todo.dueDate = dueDate;
            todo.priority = priority;
        }

        const todoContainer = document.querySelector(".todo-container");
        appView.renderTodos(todoContainer, todoManager.getProjectTodos(projectId));
        createTodoModal.close();
        editTodoModal.close();
    }

    projectContainer.addEventListener("click", (e) => {
        const projectDiv = e.target.closest(".project");
        if (!projectDiv) return;
        const projectId = projectDiv.dataset.projectId;
        if (e.target.classList.contains("container-button")) {
            appView.renderProjectTodos(
                todoSection,
                todoManager.getProject(projectId)
            );
            dynamicAddTodoButton = document.querySelector(".add-todo");
            dynamicAddTodoButton.addEventListener("click", e => {
                createTodoForm.reset();
                createTodoForm.dataset.projectId = projectId;
                createTodoModal.show();
            });
        }
        if (e.target.classList.contains("project-delete-button")) {
            todoManager.removeProject(projectId);
            appView.renderProjects(projectContainer, todoManager.getProjects());
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
            const container = e.target.closest(".todo-container");
            const todos = todoManager.getProjectTodos(projectId);
            appView.renderTodos(container, todos);
        }

        if (e.target.classList.contains("checkbox")) {

            todo.checked = !todo.checked;
            const container = e.target.closest(".todo-container");
            const todos = todoManager.getProjectTodos(projectId);
            appView.renderTodos(container, todos);
        }

    });
})();

export default appController;
