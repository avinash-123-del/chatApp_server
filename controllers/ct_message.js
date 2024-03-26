import { messageSchema } from "../models/tbl_chatMessage.js";

const addMessage = async (req,res) => { 
    const {chatId , senderId , text} = req.body;

    try {
        const createMessage  = await messageSchema.create({chatId , senderId , text})
    
        await createMessage.save();
    
        return res.status(201).json({message : "message send successfully "});

    } catch (error) {
        return res.status(500).json({message : "internal server error"});
    }

}

const getMessages = async (req,res) => {

    const chatId = req.params.chatId

    try {
        
        const findChats  = await messageSchema.find({chatId})

        return res.status(201).json({message : "all chats" , findChats})
    } catch (error) {   
        return res.status(501).send("internal server error ")
    }
}



export {addMessage , getMessages}