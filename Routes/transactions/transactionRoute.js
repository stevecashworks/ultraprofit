const express = require("express")
const { allTransactions,
     approveTransaction,
      declineTransaction,
       deposit,
       getDeposits,
       getMyDeposits,
       getMyTransactions,
       getMyWithdrawals,
       getWithdrawals,
       withdrawFunds 
    } = require("./transaction_controller.js")
const { verifyToken,verifyAdmin } =require("../Users/verify_token.js")
const transactionRoute= express.Router()
transactionRoute.post('/deposit',verifyToken,deposit)
transactionRoute.post('/withdraw',verifyToken,withdrawFunds)
transactionRoute.post('/getDeposits',verifyAdmin,getDeposits)
transactionRoute.post('/getwithdrawals',verifyAdmin,getWithdrawals)
transactionRoute.post('/all',verifyAdmin,allTransactions)
transactionRoute.post('/approve/:id',verifyAdmin,approveTransaction)
transactionRoute.post('/decline/:id',verifyAdmin,declineTransaction)
transactionRoute.post('/getmyDeposits',verifyToken,getMyDeposits)
transactionRoute.post('/getmywithdrawals',verifyToken,getMyWithdrawals)
transactionRoute.post('/gettransactions',verifyToken,getMyTransactions)
module.exports= transactionRoute