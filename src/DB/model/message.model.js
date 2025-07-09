import mongoose, { Schema } from "mongoose";

const messageSchema = Schema({

})

const messageModel =
    mongoose.models.Message || mongoose.model('Message',messageSchema);

export default messageModel;