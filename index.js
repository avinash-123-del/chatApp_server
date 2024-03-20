import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongooseConnect from "./connection/connectionDB.js";
import user from "./routes/rt_user.js"
import chat from "./routes/rt_chat.js" 
import message from "./routes/rt_message.js"

const app = express();

await mongooseConnect;

app.use(cors());

dotenv.config();

app.use("/user", user)
app.use("/chat", chat)
app.use("/message", message)

app.get("/", (req, res) => {
          res.send("Hello World!");
})

app.listen(process.env.PORT, () => { console.log(`server started on ${process.env.PORT}`); })