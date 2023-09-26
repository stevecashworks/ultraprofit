import express from "express"
import {verifyToken,verifyAdmin} from "./verify_token.js"
import {register,getAllUsers,login,getUserById,forgotPassword, updateUser, deleteSingleUser, loginWithToken} from "./User_controller.js"
import notify from "./notice.js"
const userRouter=express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/",verifyAdmin,getAllUsers)
userRouter.get("/:id", getUserById)
userRouter.post("/sendlink",forgotPassword)
userRouter.post("/update/:id",updateUser)
userRouter.post("/delete/:id",verifyAdmin,deleteSingleUser)
userRouter.post("/tk",verifyToken,loginWithToken)
userRouter.post("/notice",verifyAdmin,notify)


export default userRouter