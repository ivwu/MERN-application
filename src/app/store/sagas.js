// in mock was using it to generate randomly originated info for reducers
// now also want to implement: commuinicate with server

import { take, put, select } from "redux-saga/effects";
import uuid from "uuid";
import axios from "axios";

import * as mutations from "./mutations";

// url to communication to server -- will be updated to be better
const url = "http://localhost:8000";

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASE_CREATION);
    const ownerID = "U1";
    const taskID = uuid();
    yield put(mutations.createTask(taskID, groupID, ownerID));
    const { res } = yield axios.post(url + "/task/new", {
      // from the mutations with creating task
      task: {
        id: taskID,
        group: groupID,
        owner: ownerID,
        isComplete: false,
        name: "New Task",
      },
    });
    // console.info("got response", res);
  }
}

export function* taskModificationSaga() {
  while (true) {
    // if any of name,group,complete are passed in then it will take that and run
    // reducer is already listening to changes with the state so we are going to send a request to the server that informs it of the user action
    const task = yield take([
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_COMPLETE,
    ]);
    axios.post(url + "/task/update", {
      task: {
        id: task.taskID,
        group: task.groupID,
        name: task.name,
        isComplete: task.isComplete,
      },
    });
  }
}
