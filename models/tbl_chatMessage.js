import mongoose from "mongoose";

const chat = new mongoose.Schema({
          chatId : {
                    type : String,
          },
          senderId : {
                    type : String,
          },
          text : {
                    type : String,
          }

} , {
          timestamps : true
})

export const messageSchema = mongoose.model('message' , chat)

