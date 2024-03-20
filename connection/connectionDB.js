import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongooseConnect = mongoose.connect(process.env.DB_URL).then(() => {
          console.log("Connected to MongoDB");
})

export default mongooseConnect;