import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./connect-db";
import { connect } from "mongodb";

let port = 8000;
const app = express();

app.listen(port, console.log("server listening on port", port));

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// lets us use POST requests
app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

// function that communicates with db to test post requests
export const addNewTask = async (task) => {
  let db = await connectDB();
  let collection = db.collection("tasks");
  await collection.insertOne(task);
};

// route for adding new task
app.post("/task/new", async (req, res) => {
  let task = req.body.task;
  await addNewTask(task);
  res.status(200).send();
});
