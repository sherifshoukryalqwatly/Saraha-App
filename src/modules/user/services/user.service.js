import { userModel } from "../../../DB/model/user.model.js";

export const getAllUsers = async (req,res)=>{
    try {
        const users = await userModel.find({},{password:0,__v:0,phoneNumber:0,address:0});
        res.status(200).json({
            status:"Success",
            users:users
        })
    } catch (error) {
        res.status(500).json({
            status:"Failed",
            message:"Internal Server Error",
            error:error.message
        })
    }
}
export const getUserById = async (req,res)=>{
    try {
        const {id} = req.params;
        const user = await userModel.findOne({_id:id}).select('-password -__v -phoneNumber -address');
        res.status(201).json({
            status:"Success",
            user:user
        })
    } catch (error) {
        res.status(500).json({
            status:"Falied",
            message:"Internal Server Error",
            error:error.message
        })
    }
}
export const updateUser = async (req,res)=>{
    try {
        const {id} = req.params;
        const user = await userModel.findByIdAndUpdate({_id:id},req.body,{new:true,runValidators:true});
        res.status(201).json({
            status:"Success",
            message:"user up to date"
        })
    } catch (error) {
        res.status(500).json({
            status:"Falied",
            message:"Internal Server Error",
            error:error.message
        })
    }
}
export const deleteUser = async (req,res)=>{
    try {
        const {id} = req.params;
        const user = await userModel.deleteOne({_id:id});
        res.status(201).json({
            status:"Success",
            message:"User Deleted",
            user:user
        })
    } catch (error) {
        res.status(500).json({
            status:"Falied",
            message:"Internal Server Error",
            error:error.message
        })
    }
}
export const deleteAllUers = async (req,res)=>{
    try {
        const users = await userModel.deleteMany({});
        res.status(201).json({
            status:"Success",
            message:"Users Deleted",
            user:users
        })
    } catch (error) {
        res.status(500).json({
            status:"Falied",
            message:"Internal Server Error",
            error:error.message
        })
    }
}