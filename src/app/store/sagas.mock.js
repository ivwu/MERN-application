import { take, put, select } from "redux-saga/effects";

import * as mutations from "./mutation";

import uuid from "uuid";

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASE_CREATION);
    console.log("got group ID", groupID);
  }
}
