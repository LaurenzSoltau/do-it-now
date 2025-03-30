const appView = (function () {
    const renderProjects = function (projectsContainer, projects) {
        function createButton (text, className) {
            const button = document.createElement("button");
            button.textContent = text;
            button.classList.add(className);
            return button;
        }

        function createProjectRow(name, projectId) {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.dataset.id = projectId;

            const projectButton = createButton(name, "container-button");
            projectDiv.appendChild(projectButton);

            const utilDiv = document.createElement("div");
            utilDiv.classList.add("util-container");

            const editButton = createButton("edit", "project-edit-button");
            const deleteButton = createButton("delete", "project-delete-button");
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

    const renderProjectTodos = function (container, project) {
        const header = document.createElement("h1");
        header.textContent = project.getName();
        container.appendChild(header);
    }

    return {
        renderProjects,
        renderProjectTodos,
    }
})();

export default appView;
