const createTodo = function (title, description, dueDate, priority, projectId, checked=false) {
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
