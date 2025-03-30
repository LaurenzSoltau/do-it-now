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

    const projectContainer = document.querySelector("#project-container");
    const addProjectButton = document.querySelector("#add-project");
    addProjectButton.addEventListener("click", () => {
        createProjectForm.reset();
        createProjectModal.showModal();
    });
})();

export default appController;
