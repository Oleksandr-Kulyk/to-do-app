export const sortTaskRows = (rows) => {
  const lists = rows.reduce((acc, item) => {
    let list = acc.find((list) => list.listId === item.listId);
    if (!list) {
      list = {
        listId: item.listId,
        title: item.title,
        tasks: [],
      };
      acc.push(list);
    }
    if (item.taskId) {
      const newTask = {
        taskId: item.taskId,
        text: item.text,
        completed: item.completed === 1 ? true : false,
      };
      list.tasks.push(newTask);
    }
    return acc;
  }, []);
  return lists;
};

export const sortCompleted = (tasks) => {
  const sortedTasks = [...tasks].sort((taskA, taskB) => {
    if (taskA.completed === taskB.completed) return 0;
    return taskA.completed ? 1 : -1;
  });
  return sortedTasks;
};
