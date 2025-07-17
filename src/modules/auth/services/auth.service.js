import { userModel } from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs'
import CryptoJs from 'crypto-js'
import jwt from 'jsonwebtoken'
export const signUp = async (req,res)=>{
    try {
        const {
            userName,
            email,
            password,
            confirmPassword,
            gender,
            role,
            isVerified,
            bio,
            dateOfBirth,
            phoneNumber,
            address}= req.body;
        if(!userName||!email||!password||!confirmPassword||!gender||!phoneNumber){
            return res.status(400).json({
                message:"Username,Email,Password,Gender and Phone Number are required"
            })
        }
        if(password !== confirmPassword){
            res.status(400).json({
                message:"Passwoed And Confirm Password Don't Match"
            })
        }

        const isUserExist = await userModel.findOne({email});

        if(isUserExist){
            res.status(409).json({
                message:"User Already Exists"
            })
        }

        const hashedPassword = bcrypt.hashSync(password,+process.env.SALT);
        const encryptePhoneNumber = CryptoJs.AES.encrypt(phoneNumber,process.env.PHONE_SECRET_KEY).toString();
        const encrypteAddress = CryptoJs.AES.encrypt(address,process.env.ADDRESS_SECRET_KEY).toString();
        const user = await userModel.create({
            userName,
            email,
            password:hashedPassword,
            gender,
            role,
            isVerified,
            bio,
            dateOfBirth,
            phoneNumber:encryptePhoneNumber,
            address:encrypteAddress
        });
        res.status(201).json({
            message:"User Created Successfully",
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
        const user = await userModel.findOne({email:email});
        if(!user){
            return res.status(404).json({
                message:"User Not Found"
            });
        }

        const isPasswordMatch = bcrypt.compareSync(password,user.password);

        if(!isPasswordMatch){
            return res.status(401).json({
                message:"Invalid Username OR Password"
            })
        }
        const decryptPhoneNumber = CryptoJs.AES.decrypt(user.phoneNumber,process.env.PHONE_SECRET_KEY).toString(CryptoJs.enc.Utf8);
        const decryptAddress = CryptoJs.AES.decrypt(user.address,process.env.ADDRESS_SECRET_KEY).toString(CryptoJs.enc.Utf8);

        user.phoneNumber = decryptPhoneNumber;
        user.address = decryptAddress;

        const token = jwt.sign(
            {id:user._id,name:user.name,email:user.email},
            (user.role==="user")?process.env.JWT_USER_SECRET:process.env.JWT_ADMIN_SECRET,
            {expiresIn:"1d"}
        );

        res.status(200).json({
            message:"Login Successful",
            token:token,
        });

    } catch (error) {
        res.status(500).json({
            status:"Failed",
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
