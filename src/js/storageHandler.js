import { createProject } from "./projectModel.js";
const storageHandler = (function () {
    const storageAvailable = function (type) {
        let storage;
        try {
            storage = window[type];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                storage &&
                storage.length !== 0
            );
        }
    };

    const itemsStored = function() {
        const storage = window["localStorage"];
        return storage.length != 0;
    }

    const safeData = function (projects, todos) {
        const projectsData = [];
        for (const project of projects) {
            const projectName = project.getName();
            const projectId = project.getId();
            projectsData.push({ projectName, projectId });
        }
        localStorage.setItem("projects", JSON.stringify(projectsData));
        console.log("test");
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    const retrieveProjects = function () {
        const projects = [];
        const projectsData = JSON.parse(localStorage.getItem("projects"));
        projectsData.forEach((project) =>
            projects.push(createProject(project.projectName, project.projectId))
        );
        return projects;
    };

    const retrieveTodos = function () {
        const todos = JSON.parse(localStorage.getItem("todos"));
        return todos;
    };

    const clearData = function () {
        localStorage.clear();
    };

    return {
        storageAvailable,
        itemsStored,
        safeData,
        retrieveProjects,
        retrieveTodos,
        clearData,
    }

})();

export { storageHandler };
