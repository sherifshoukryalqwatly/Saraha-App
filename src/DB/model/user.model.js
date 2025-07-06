import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:String,
    userName:{
        type:String,
        minLength:[3,"userName Must be at Least 3 Characters and you Enterd {VALUE} Characters "],
        required:[true,"userName Is Required"],
        trim:true,
        lowerCase:true,
        unique:[true,"you Are Registered"],
        validate:{
            validator: function (value){
                return /^[a-zA-Z0-9]+$/.test(value)
            },
            message:"UserName Must Be Letters and Numbers"
        }
    },
    password:{

    }
})

export const userModel = mongoose.model('User',userSchema);