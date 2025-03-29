const createTodo = function (
    title,
    description,
    dueDate,
    priority,
    creationDate
) {
    return {
        title,
        description,
        dueDate,
        priority,
        creationDate,
        id: crypto.randomUUID(),
    }
};

export { createTodo };
