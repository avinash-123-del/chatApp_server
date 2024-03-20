import { messageSchema } from "../models/tbl_chatMessage";

const addMessage = async (req,res) => { 
          const result = await messageSchema.create(message);
    return result;
}



export {addMessage}