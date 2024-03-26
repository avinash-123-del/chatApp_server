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
         return res.status(401).json({ message: "Authentication failed" , status : 0 });
      }

      return res.status(200).json({ message: "Login successful" , status : 1 , user});

   } catch (error) {
      return res.status(500).json({ message: "Server error" });
   }
};

const getAllUsers = async (req, res) => {
   const getUsers = await userSchema.find({} , {password : 0});
   return res.status(200).json({ message: "Users fetched successfully" , getUsers })
}

const getOneUser = async(req,res) => {
   const {userId} = req.body;

try {
   
   const oneUser = await userSchema.findOne({_id : userId})

   if(oneUser){
      return res.status(201).json(oneUser)
   }

   else {
      return res.status(401).send("user not found")
   }
} catch (error) {
   
   return res.staus(501).send("failed to fetch user")
}

   
}

export { addUsers , loginUser , getAllUsers, getOneUser }