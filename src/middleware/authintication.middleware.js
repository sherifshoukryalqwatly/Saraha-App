import jwt from 'jsonwebtoken'
import { userModel } from "../DB/model/user.model.js";
export const authentication =async (req,res,next)=>{
    try {
            const role = req.headers.authorization.split(' ')[0];
            if(!req.headers.authorization &&!role){
                res.status(401).json({
                    status:"Failed",
                    message:"Token Required"
                });
            }
            const {authorization} =req.headers
            let payLoad;
            const token = authorization.split(' ')[1]
            if(role=='Bearer'){
                payLoad= jwt.verify(token,process.env.JWT_USER_SECRET); 
            }else if(role==='Admin'){
                payLoad= jwt.verify(token,process.env.JWT_ADMIN_SECRET);
            }
    
            const user = await userModel.findOne({_id:payLoad.id});
    
            if(!user){
                res.status(401).json({
                    status:"Failed",
                    message:"This User Not Found"
                })
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(500).json({
                status:"Failed",
                message:"Internal Server Error",
                error:error.message
            })
        }
}

export const authorization = ([...roles])=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                status:"Failed",
                Message:"Not Have Permission"
            });
        }
        next();
    }
}