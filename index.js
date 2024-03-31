import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongooseConnect from "./connection/connectionDB.js";
import user from "./routes/rt_user.js"
import chat from "./routes/rt_chat.js"
import message from "./routes/rt_message.js"
import { Server } from 'socket.io'
import { createServer } from 'http'
import userSchema from "./models/tbl_user.js";

const app = express();
const server = createServer(app)


await mongooseConnect;

app.use(cors());

dotenv.config();


app.use("/user", user)
app.use("/chat", chat)
app.use("/message", message)


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
})

io.on('connection', (socket) => {
    console.log("user connectted", socket.id)

    // saving socketId and updating it when user connected

    socket.on('user_online', async (userId) => {
        try {
            await userSchema.find({ _id: userId }).updateOne({ socketId: socket.id })
            console.log("user online", userId)
        } catch (error) {
            console.log(err);
        }
    })

    socket.on('disconnect', () => {
        console.log("user disconnected", socket.id)
    })

    socket.on('send_message', async(data) => {
        console.log("message sent", data)
        try {
            const findUser = await userSchema.findById({_id : data.userId})
            console.log("so/d" , findUser.socketId)
            io.to(findUser.socketId).emit("get_message", data)
        } catch (error) {
            console.log(error)
        }
    })

})

app.get("/", (req, res) => {
    res.send("Hello World!");
})


server.listen(process.env.PORT, () => { console.log(`server started on ${process.env.PORT}`); })