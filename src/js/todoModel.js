const createTodo = function (title, description, dueDate, priority, projectId) {
    let checked = false;
    return {
        title,
        description,
        dueDate,
        priority,
        id: crypto.randomUUID(),
        checked,
        projectId,
    };
};

export { createTodo };
