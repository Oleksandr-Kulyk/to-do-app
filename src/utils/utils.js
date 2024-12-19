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

export const calcProgress = (tasks) => {
  if (!tasks.length) return 0;
  const progressValue =
    (tasks.filter((item) => item.completed === true).length / tasks.length) *
    100;
  return progressValue;
};

export const findTask = (lists, taskId) => {
  const tasks = lists.reduce((acc, item) => {
    return [...acc, ...item.tasks];
  }, []);
  return tasks.find((item) => item.taskId === taskId);
};
