import {chatSchema} from "../models/tbl_chatMember.js";

//-------------------- to create chat id ---------------------
const createChat = async (req, res) => {

   const newChat = new chatSchema({
      chatMembers: [req.body.senderId, req.body.receiverId]
   })

   try {

      const result = await newChat.save();

      if (result) {
         res.status(200).json(result)
      }

   } catch (error) {

   }
}

const userChats = async (req, res) => {
   const { userId } = req.params;

   try {
      const findUserChats = await chatSchema.find({
         chatMembers: { $in: [userId] }
      })
      return res.status(200).json(findUserChats)

   } catch (error) {
      return res.status(500).json(error)
   }
}

const findChat = async(req,res ) => {
   try {
      
      const chatOne = await chatSchema.findOne({
         chatMembers : { $all : [req.params.firstId , req.params.secondId]}
      })

      return res.status(200).json(chatOne)

   } catch (error) {
      return res.status(500).json(error)
      
   }
}


export { createChat, userChats,findChat }