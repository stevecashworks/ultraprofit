import express from "express"
import { allTransactions, approveTransaction, deposit,getDeposits,getWithdrawals,withdrawFunds } from "./transaction_controller.js"
import { verifyToken,verifyAdmin } from "../Users/verify_token.js"
const transactionRoute= express.Router()
transactionRoute.post('/deposit',verifyToken,deposit)
transactionRoute.post('/withdraw',verifyToken,withdrawFunds)
transactionRoute.post('/getDeposits',verifyAdmin,getDeposits)
transactionRoute.post('/getwithdrawals',verifyAdmin,getWithdrawals)
transactionRoute.post('/all',verifyAdmin,allTransactions)
transactionRoute.post('/approve/:id',verifyAdmin,approveTransaction)
export default transactionRoute