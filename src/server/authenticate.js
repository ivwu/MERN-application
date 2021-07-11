import uuid from "uuid";
import md5 from "md5";
import { connectDB } from "./connect-db";

const authenticateTokens = [];

// if a user is found run this function to gather data associated with that user
async function assembleUserState(user) {
  let db = await connectDB();
  let tasks = await db.collection("tasks").find({ owner: user.id }).toArray();
  let groups = await db.collection("groups").find({ owner: user.id }).toArray();
  return {
    tasks,
    groups,
    session: { authenticated: "AUTHENTICATED", id: user.id },
  };
}

export const authenticateRoute = (app) => {
  console.log("in authenticate route");
  app.post("/authenticate", async (req, res) => {
    let { username, password } = req.body;
    let db = await connectDB();
    let collection = db.collection("users");
    let user = await collection.findOne({ name: username });
    if (!user) {
      return res.status(500).send("User not found");
    }
    // if have a user found
    console.log("found user");
    let hash = md5(password);
    let passwordCorrect = hash === user.passwordHash;
    if (!passwordCorrect) {
      return res.status(500).send("password incorrect");
    }

    // password matches so now give toke
    let token = uuid();
    authenticateTokens.push({
      token,
      userID: user.id,
    });
    let state = await assembleUserState(user);
    res.send({ token, state });
  });
};
