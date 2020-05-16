/**Async storage service */
import { storeTask, fetchTasks, removeTask } from "../services/TaskService";

export const addTask = async (task: any) => {
  let isSuccess = false;
  await storeTask(task).then((success) => {
    if (success) {
      isSuccess = success;
    } else {
      isSuccess = !success;
    }
  });
  return isSuccess;
};
export const deleteTask = async (id: any) => {
  let isSuccess = false;
  await removeTask(id).then((response) => {
    isSuccess = response;
  });
  return isSuccess;
};
export const getAllTasks = async () => {
  let Tasks: [];
  await fetchTasks().then((tasks) => {
    Tasks = tasks;
  });

  return Tasks;
};
export const getDailyTasks = async (tasks: []) => {
  let dailyTasks: any = [];

  var dateNow = new Date(Date.now()).toLocaleDateString();
  let day = Number(dateNow.toString().split("/")[1]);
  let month = Number(dateNow.toString().split("/")[0]);
  let year = Number(dateNow.toString().split("/")[2]);
  tasks.forEach((item: any) => {
    if (
      Number(item.date.split("/")[0]) === month &&
      Number(item.date.split("/")[1]) === day &&
      Number(item.date.split("/")[2]) === year
    ) {
      dailyTasks.push(item);
    }
  });
  return dailyTasks;
};
export const getWeeklyTasks = async (tasks: []) => {
  let weeklyTasks: any = [];

  var dateNow = new Date(Date.now()).toLocaleDateString();
  let day = Number(dateNow.toString().split("/")[1]);
  let month = Number(dateNow.toString().split("/")[0]);
  let year = Number(dateNow.toString().split("/")[2]);

  tasks.forEach((item: any) => {
    if (
      Number(item.date.split("/")[0]) === month &&
      Number(item.date.split("/")[1]) - day <= 7 &&
      Number(item.date.split("/")[2]) === year
    ) {
      weeklyTasks.push(item);
    }
  });

  return weeklyTasks;
};
export const getMonthlyTasks = async (tasks: []) => {
  let monthlyTasks: any = [];

  var dateNow = new Date(Date.now()).toLocaleDateString();
  let month = Number(dateNow.toString().split("/")[0]);
  let year = Number(dateNow.toString().split("/")[2]);
  tasks.forEach((item: any) => {
    if (
      Number(item.date.split("/")[0]) === month &&
      Number(item.date.split("/")[2]) === year
    ) {
      monthlyTasks.push(item);
    }
  });

  return monthlyTasks;
};
export const getFilteredTasks = async (
  startDate: Date,
  endDate: Date,
  tasks: []
) => {
  let filteredTasks: any = [];

  let startDay = Number(
    startDate.toLocaleDateString().toString().split("/")[1]
  );
  let startMonth = Number(
    startDate.toLocaleDateString().toString().split("/")[0]
  );
  let startYear = Number(
    startDate.toLocaleDateString().toString().split("/")[2]
  );

  let endDay = Number(endDate.toLocaleDateString().toString().split("/")[1]);
  let endMonth = Number(endDate.toLocaleDateString().toString().split("/")[0]);
  let endYear = Number(endDate.toLocaleDateString().toString().split("/")[2]);

  tasks.forEach((item: any) => {
    if (
      Number(item.date.split("/")[0]) <= endMonth &&
      Number(item.date.split("/")[0]) >= startMonth &&
      Number(item.date.split("/")[1]) <= endDay &&
      Number(item.date.split("/")[1]) >= startDay &&
      Number(item.date.split("/")[2]) <= endYear &&
      Number(item.date.split("/")[2]) >= startYear
    ) {
      filteredTasks.push(item);
    }
  });

  return filteredTasks;
};
