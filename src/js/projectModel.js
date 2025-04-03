const createProject = function(name) {
    let projectName = name;
    const projectId = crypto.randomUUID();

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