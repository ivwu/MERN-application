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
    console.info("got response", res);
  }
}
