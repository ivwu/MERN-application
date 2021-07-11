export const REQUEST_TASE_CREATION = "REQUEST_TASE_CREATION";
export const CREATE_TASK = "CREATE_TASK";

export const requestTaskCreation = (groupID) => ({
  type: REQUEST_TASE_CREATION,
  groupID,
});

export const createTask = (taskID, groupID, ownerID) => ({
  type: CREATE_TASK,
  taskID,
  groupID,
  ownerID,
});
