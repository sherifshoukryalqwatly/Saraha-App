import { userModel } from "../../../DB/model/user.model.js";
export const signUp = async (req,res)=>{
    try {
        const {name,email,password}= req.body;
        if(!email||!password){
            return res.status(400).json({
                message:"Email and Password are required"
            })
        }
        await userModel.create({name:name,userName:email,password:password});
        res.status(201).json({
            message:"User Created Successfully",
            user:{
                name:name,
                userName:email
            }
        }) 
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        });
    }
}

export const login = async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            res.status(400).json({
                message:"Email and Password are required"
            });
        }
        const user = await userModel.findOne({userName:email});
        if(!user){
            return res.status(404).json({
                message:"User Not Found"
            });
        }
        if(user.password !== password){
            return res.status(401).json({
                message:"Invalid Username OR Password"
            })
        }
        res.status(200).json({
            message:"Login Successful",
            user:{
                name:user.name,
                userName:user.userName
            }
        });
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        });
    }
}

export const resetPassword = async (req,res)=>{
    res.json({
        message:"Reset Password Successful"
    });
}