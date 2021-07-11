import { createStore, applyMiddleware, combineReducers } from "redux";
import { defaultState } from "../../server/defaultState";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
// import * as sagas from "./sagas.mock";
import * as sagas from "./sagas";
import * as mutations from "./mutations";

export const store = createStore(
  combineReducers({
    tasks(tasks = defaultState.tasks, action) {
      switch (action.type) {
        case mutations.CREATE_TASK:
          // console.log(action);
          return [
            ...tasks,
            {
              id: action.taskID,
              name: "new task",
              group: action.groupID,
              owner: action.ownerID,
              isComplete: false,
            },
          ];
        case mutations.SET_TASK_COMPLETE:
          return tasks.map((task) => {
            // changes status of completion if button is clicked for the task
            return task.id === action.taskID
              ? { ...task, isComplete: action.isComplete }
              : task;
          });
        case mutations.SET_TASK_NAME:
          return tasks.map((task) => {
            // changes status of name if button is clicked for the name of task and change happened
            return task.id === action.taskID
              ? { ...task, name: action.name }
              : task;
          });
        case mutations.SET_TASK_GROUP:
          return tasks.map((task) => {
            // changes status of group if button to change group
            return task.id === action.taskID
              ? { ...task, group: action.groupID }
              : task;
          });
      }
      //default case
      return tasks;
    },
    comments(comments = defaultState.comments) {
      return comments;
    },
    groups(groups = defaultState.groups) {
      return groups;
    },
    users(users = defaultState.users) {
      return users;
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas.taskCreationSaga);
}
