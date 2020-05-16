import { AsyncStorage } from "react-native";
import { Tasks } from "./Mock";

/**Fetching all tasks as object array like [{key:"key1",value:"value1"} ...] */
export const fetchTasks = async () => {
  let _tasks: any = Tasks;
  await AsyncStorage.getAllKeys(async (err, keys) => {
    await AsyncStorage.multiGet(keys, async (err, stores) => {
      await stores.map((result, i, store) => {
        _tasks.push(JSON.parse(store[i][1]));
      });
    });
  });
  return _tasks;
};

/**Store task object. Valid object is like {key:"key1",value:"value1" ...} if success return true otherwise return false*/
export const storeTask = async (task: any) => {
  let isSuccess = false;
  await AsyncStorage.setItem("TASKS", JSON.stringify(task))
    .then((success) => {
      isSuccess = true;
    })
    .catch((err) => {
      isSuccess = false;
    });
  return isSuccess;
};
/**Remove task. If you want to delete multi task keys array must be like "key1","key2"... if success return true otherwise return false*/
export const removeTask = async (id: any) => {
  try {
    await AsyncStorage.removeItem(id);
    return true;
  } catch (err) {
    return false;
  }
};
