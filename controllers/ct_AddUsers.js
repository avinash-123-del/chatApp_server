import brcypt from 'bcryptjs'
import userSchema from '../models/tbl_user.js'

const addUsers = async (req, res) => {
   const { name, email, password } = req.body

   try {

      const checkEmail = await userSchema.findOne({email})

      if (checkEmail) {
         return res.status(400).json({ message: "Email already exists" })
      }

      const hashPassword = await brcypt.hash(password, 10)

      const createUser = await userSchema.create({ name, email, password: hashPassword })

      await createUser.save()

      return res.status(200).json({ message: "User created successfully" })

   } catch (error) {
      return res.status(500).json({ message: "Server error" })
   }
}

const loginUser = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await userSchema.findOne({ email });

      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await brcypt.compare(password, user.password);

      if (!passwordMatch) {
         return res.status(401).json({ message: "Authentication failed" });
      }

      return res.status(200).json({ message: "Login successful" , user });

   } catch (error) {
      return res.status(500).json({ message: "Server error" });
   }
};

const getAllUsers = async (req, res) => {
   const getUsers = await userSchema.find({} , {password : 0});
   return res.status(200).json({ message: "Users fetched successfully" , getUsers })
}

const getUserById = async (req, res) => {
   const { id } = req.params
   const getUser = await userSchema.findById(id, { password: 0 })
   return res.status(200).json({ message: "User fetched successfully", getUser })

}

export { addUsers , loginUser , getAllUsers , getUserById}