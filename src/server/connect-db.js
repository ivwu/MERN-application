import { MongoClient } from "mongodb";
const dotenv = require("dotenv");
dotenv.config();

const url = `mongodb+srv://admin:${process.env.DB_PASSWORD}@${process.env.DB_USERNAME}.ivp29.mongodb.net/myorganizer?retryWrites=true&w=majority`;
let db = null;

export async function connectDB() {
  if (db) return db;
  let client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db();
  console.log("got db", db);
  return db;
}

// connectDB();
