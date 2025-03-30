import appView from "./appView.js";
import todoManager from "./todoManagerModel.js";
import { createProject } from "./projectModel.js";

const appController = (function () {
    const createProjectModal = document.querySelector("#create-project");
    const createProjectForm = createProjectModal.querySelector("form");
    const handleCreateProjectModal = function (e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const newProject = createProject(data.get("name"));
        todoManager.addProject(newProject);
        appView.renderProjects(projectContainer, todoManager.getProjects());
        createProjectModal.close();
    };
    createProjectForm.addEventListener("submit", handleCreateProjectModal);


    const todoSection = document.querySelector("section");
    const projectContainer = document.querySelector("#project-container");
    projectContainer.addEventListener("click", (e) => {
        const projectDiv = e.target.closest(".project");
        if (!projectDiv) return;
        const projectId = projectDiv.dataset.id;
        if (e.target.classList.contains("container-button")) {
            appView.renderProjectTodos(todoSection, todoManager.getProject(projectId));
        }
        if (e.target.classList.contains("project-delete-button")) {
            todoManager.removeProject(projectId);
            appView.renderProjects(projectContainer, todoManager.getProjects());
        }
    })

    const addProjectButton = document.querySelector("#add-project");
    addProjectButton.addEventListener("click", () => {
        createProjectForm.reset();
        createProjectModal.showModal();
    });
})();

export default appController;
