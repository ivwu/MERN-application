import { take, put, select } from "redux-saga/effects";

import * as mutations from "./mutation";

import uuid from "uuid";

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASE_CREATION);
    const ownerID = "U1";
    const taskID = uuid();
    yield put(mutations.createTask(taskID, groupID, ownerID));
    console.log("got group ID", groupID);
  }
}
