const createProject = function(name, _projectId) {
    let projectName = name;
    let projectId;
    if (!_projectId) {
        projectId = crypto.randomUUID();
    } else {
        projectId = _projectId;
    }

    const getName = () => projectName; 
    const setName = newName => projectName = newName;
    const getId = () => projectId;

    return {
        getName,
        setName,
        getId,
    };
};

export { createProject };