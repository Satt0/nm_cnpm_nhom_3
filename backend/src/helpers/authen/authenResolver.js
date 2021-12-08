
const {AuthenUser}=require('./role')
const {AuthenticationError}=require('apollo-server-express')

exports.authenticate=(role=0,next)=>async(parent, args, context, info)=>{
   
    const auth=new AuthenUser(context.token)
    
    if(auth.checkRole(role))
    {
        context.user=auth.user
        return await next(parent, args, context, info)
    }
    throw new AuthenticationError("token không hợp lệ!")

}