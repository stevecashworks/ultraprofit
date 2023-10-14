const mongoose = require("mongoose");
const connect_Db=(mongo_uri)=>{
  return mongoose.connect(mongo_uri)
}
module.exports= connect_Db