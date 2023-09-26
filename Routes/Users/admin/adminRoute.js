import express from "express"
import { getStats } from "./admin_Controller.js"
import { verifyAdmin } from "../verify_token.js"
const adminRoute= express.Router()
adminRoute.post("/stats",verifyAdmin,getStats)


export default adminRoute