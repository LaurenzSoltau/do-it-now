const appView = (function () {
    const renderProjects = function (projectsContainer, projects) {
        projectsContainer.textContent = "";
        for (const project of projects) {
            const projectButton = document.createElement("button");
            projectButton.textContent = project.getName();
            projectButton.dataset.id = project.getId();
            projectButton.classList.add("container-button");
            projectsContainer.appendChild(projectButton);
        }
    };

    return {
        renderProjects,
    }
})();

export default appView;
