import mongoose from "mongoose";

const chat = new mongoose.Schema({
          chatMembers  : {
                    type : Array,
          }

} , {
          timestamps : true
})

export const chatSchema = mongoose.model('chat' , chat)

