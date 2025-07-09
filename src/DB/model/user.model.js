import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName:{
        type:String,
        minLength:[3,"userName Must be at Least 3 Characters and you Enterd {VALUE} Characters "],
        maxLength:[50,"userName Must be at Least 3 Characters and you Enterd {VALUE} Characters "],
        required:[true,"userName Is Required"],
        trim:true,
    },
    email:{
        type:String,
        require:[true,"Email Is Required"],
        unique:true,
        trim:true,
        lowercase:true,
        validate:{
            validator: (value)=>{
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password:{
        type:String,
        required:[true,"Password Is Required"],
        minLength:[6,"Password Must be At Least 6 Characters and you Enterd {VALUE} Characters "],
        maxLength:[100,"Password Must be At Least 6 Characters and you Enterd {VALUE} Characters "],
    },
    gender:{
        type:String,
        enum:{values:["male","female"],message:"gender Must be male Or female"},
        required:[true,"Gender Is Required"],
    },
    role:{
        type:String,
        enum:{values:["admin","user"],message:"Role Must be Admin Or User"},
        default:"user",
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    bio:{
        type:String,
        maxLength:[500,"Bio Must be At Least 500 Characters and you Enterd {VALUE} Characters "],
        default:""
    },
    dateOfBirth:{
        type:Date,
    },
    phoneNumber:{
        type:String,
        required:[true,"Phone Number Is Required"],
        unique:true,
        // validate:{
        //     validator: (value)=>{
        //         return /^\+?[1-9]\d{1,14}$/.test(value);
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        // }
    },
    address:{
        type:String,
        trim:true,
        default:""
    },
},
    { timestamps: true}
)
export const userModel =
    mongoose.models.User || mongoose.model('User',userSchema);