import mongoose from "mongoose";

const usermodel = mongoose.Schema({
          name : {
                    type: String,
                    required: true
          },
          email : {
                    type: String,
                    required: true,
                    unique: true,
          },
          password : {
                    type: String,
                    required: true
          },
          socketId : {
            type : String
          }
})


const userSchema = mongoose.model('user', usermodel)

export default userSchema;