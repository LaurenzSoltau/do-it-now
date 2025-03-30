const createTodo = function (
    title,
    description,
    dueDate,
    priority,
) {
    return {
        title,
        description,
        dueDate,
        priority,
        id: crypto.randomUUID(),
    }
};

export { createTodo };
