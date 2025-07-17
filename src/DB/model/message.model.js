import mongoose, { Schema } from "mongoose";

const messageSchema = Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    content:{
        type:String,
        required:[true,"Message Must have Content"]
    }
})

const messageModel =
    mongoose.models.Message || mongoose.model('Message',messageSchema);

export default messageModel;