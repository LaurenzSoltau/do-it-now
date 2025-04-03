import checkBoxUnchecked from "./../assets/checkbox_unchecked.svg";
import checkBoxChecked from "./../assets/checkbox_checked.svg";
import todoManager from "./todoManagerModel";

const appView = (function () {
    function createButton(text, className) {
        const button = document.createElement("button");
        button.textContent = text;
        button.classList.add(className);
        return button;
    }

    const renderProjects = function (projectsContainer, projects) {
        function createProjectRow(name, projectId) {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.dataset.projectId = projectId;

            const projectButton = createButton(name, "container-button");
            projectDiv.appendChild(projectButton);

            const utilDiv = document.createElement("div");
            utilDiv.classList.add("util-container");

            const editButton = createButton("edit", "project-edit-button");
            const deleteButton = createButton(
                "delete",
                "project-delete-button"
            );
            utilDiv.appendChild(editButton);
            utilDiv.appendChild(deleteButton);

            projectDiv.appendChild(utilDiv);
            return projectDiv;
        }

        projectsContainer.textContent = "";
        for (const project of projects) {
            const rowDiv = createProjectRow(project.getName(), project.getId());
            projectsContainer.appendChild(rowDiv);
        }
    };

    function createCollectionHeader(title) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("project-header");
        const h1 = document.createElement("h1");
        h1.textContent = title;
        wrapper.appendChild(h1);
        return wrapper;
    }

    function createProjectTodosHeader(title, projectId) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("project-header");
        const h1 = document.createElement("h1");
        h1.textContent = title;
        wrapper.appendChild(h1);

        const addTodoButton = createButton("Add Todo", "add-todo");
        addTodoButton.dataset.projectId = projectId;
        wrapper.appendChild(addTodoButton);

        return wrapper;
    }

    function createTodoElement(todo) {
        function createSpan(text, className) {
            const span = document.createElement("span");
            span.textContent = text;
            span.classList.add(className);
            return span;
        }
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.dataset.todoId = todo.id;

        const firstSubDiv = document.createElement("div");
        const checkBox = document.createElement("img");
        if (todo.checked) {
            checkBox.src = checkBoxChecked;
        } else {
            checkBox.src = checkBoxUnchecked;
        }
        checkBox.classList.add("checkbox");
        const nameSpan = createSpan(todo.title, "todo-name");
        const descriptionSpan = createSpan(
            todo.description,
            "todo-description"
        );
        firstSubDiv.appendChild(checkBox);
        firstSubDiv.appendChild(nameSpan);
        firstSubDiv.appendChild(descriptionSpan);
        todoDiv.appendChild(firstSubDiv);

        const secondSubDiv = document.createElement("div");
        const dueDateSpan = createSpan(todo.dueDate, "todo-due-date");
        const prioritySpan = createSpan(todo.priority, "todo-priority");
        const editButton = createButton("Edit", "edit-todo");
        const deleteButton = createButton("Delete", "delete-todo");
        secondSubDiv.appendChild(dueDateSpan);
        secondSubDiv.appendChild(prioritySpan);
        secondSubDiv.appendChild(editButton);
        secondSubDiv.appendChild(deleteButton);
        todoDiv.appendChild(secondSubDiv);
        if (todo.checked) {
            todoDiv.classList.add("checked");
        } else {
            todoDiv.classList.remove("checked");
        }

        return todoDiv;
    }

    const renderTodos = function (container, todos) {
        container.textContent = "";
        for (const todo of todos) {
            const todoElement = createTodoElement(todo);
            container.appendChild(todoElement);
        }
    };

    const renderProjectTodos = function (container, project) {
        const headerContainer = container.querySelector(".header-container");
        headerContainer.textContent = "";
        const projectId = project.getId();
        const header = createProjectTodosHeader(
            project.getName(),
            projectId
        );
        headerContainer.append(header);

        const todoContainer = container.querySelector(".todo-container");
        todoContainer.dataset.projectId = projectId; 
        const todos = todoManager.getProjectTodos(projectId);
        renderTodos(
            todoContainer,
            todos,
        );
    };

    const renderCollectionTodos = function (container, collection, collectionName) {
        const headerContainer = container.querySelector(".header-container");
        headerContainer.textContent = "";
        const header = createCollectionHeader(collectionName);
        headerContainer.appendChild(header);
        
        const todoContainer = container.querySelector(".todo-container");
        renderTodos(todoContainer, collection);
    }

    return {
        renderProjects,
        renderProjectTodos,
        renderTodos,
        renderCollectionTodos,
    };
})();

export default appView;
