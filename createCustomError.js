const createCustomError= (message, statusCode)=>{
    const code=  statusCode||500
        const errorMessage= message||"Oops something went wrong"
     
    class UserError extends Error{
        constructor(){
            super()
        this.message=errorMessage;
        this.code=code
    }


     }
return new UserError()    

}
export default createCustomError       