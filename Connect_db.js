import mongoose from "mongoose";
const connect_Db=(mongo_uri)=>{
  return mongoose.connect(mongo_uri)
}
export default connect_Db