import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongooseConnect from "./connection/connectionDB.js";
import user from "./routes/rt_user.js"
import chat from "./routes/rt_chat.js"
import message from "./routes/rt_message.js"
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express();
const server = createServer(app)
const io = new Server(server, {
          cors: {
                    origin: "http://localhost:3000",
                    methods: ["GET", "POST"],
                    credentials: true
          }
})

io.on('connection', (socket) => {
          console.log("user connectted", socket.id)


          socket.on('disconnect', () => {
                    console.log("user disconnected", socket.id)
          })

          socket.on('send_message', (data) => {
                    console.log("message sent", data)
                    io.emit("get_message", data)
          })

})

await mongooseConnect;

app.use(cors());

dotenv.config();

app.use("/user", user)
app.use("/chat", chat)
app.use("/message", message)

app.get("/", (req, res) => {
          res.send("Hello World!");
})


server.listen(process.env.PORT, () => { console.log(`server started on ${process.env.PORT}`); })