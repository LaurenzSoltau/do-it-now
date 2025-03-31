const createTodo = function (title, description, dueDate, priority) {
    let checked = false;
    return {
        title,
        description,
        dueDate,
        priority,
        id: crypto.randomUUID(),
        checked,
    };
};

export { createTodo };
