const express = require("express")
const { getRates, getStats, setRates } = require("./admin_Controller.js")
const { verifyAdmin } = require("../verify_token.js")
const adminRoute= express.Router()
adminRoute.post("/stats",verifyAdmin,getStats)
adminRoute.post("/setRates",verifyAdmin,setRates)
adminRoute.get("/getRates",getRates)

                     

module.exports= adminRoute