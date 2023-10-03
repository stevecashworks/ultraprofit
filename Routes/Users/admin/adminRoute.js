import express from "express"
import { getRates, getStats, setRates } from "./admin_Controller.js"
import { verifyAdmin } from "../verify_token.js"
const adminRoute= express.Router()
adminRoute.post("/stats",verifyAdmin,getStats)
adminRoute.post("/setRates",verifyAdmin,setRates)
adminRoute.get("/getRates",getRates)

                     

export default adminRoute