const express = require("express")
const {verifyToken,verifyAdmin} = require("./verify_token.js")
const {register,getAllUsers,login,getUserById,forgotPassword, updateUser, deleteSingleUser, loginWithToken, verifyUserEmail} = require("./User_controller.js")
const notify = require("./notice.js")
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
userRouter.post("/verifyUser",verifyUserEmail)


module.exports=userRouter