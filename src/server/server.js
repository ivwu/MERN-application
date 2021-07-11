import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./connect-db";
import "./initialize-db";

let port = 8000;
const app = express();

app.listen(port, console.log("server listening on port", port));

app.get("/", (req, res) => {
  res.send("hello world");
});

// lets us use POST requests
app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

// function that communicates with db to test POST requests for adding a new task
export const addNewTask = async (task) => {
  let db = await connectDB();
  let collection = db.collection("tasks");
  await collection.insertOne(task);
};

// function that communicates with db to test UPDATE requests for updating a new task with given fields
export const updateTask = async (task) => {
  let { id, group, isComplete, name } = task;
  let db = await connectDB();
  let collection = db.collection("tasks");

  // if group is being defined (send in with task argument) then update it
  if (group) {
    // updateOne: first paramater finds the object with the matching property 'id' of the task it is referring to; second parameter sets/updates the property passed in's record
    await collection.updateOne({ id }, { $set: { group } });
  }

  if (isComplete !== undefined) {
    await collection.updateOne({ id }, { $set: { isComplete } });
  }

  if (name) {
    await collection.updateOne({ id }, { $set: { name } });
  }
};

// route for adding new task
app.post("/task/new", async (req, res) => {
  let task = req.body.task;
  await addNewTask(task);
  res.status(200).send();
});

// route for updating task
app.post("/task/update", async (req, res) => {
  let task = req.body.task;
  await updateTask(task);
  res.status(200).send();
});
