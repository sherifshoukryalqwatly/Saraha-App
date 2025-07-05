import express from 'express';
import dontenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'

dontenv.config();
const app = express();

mongoose.connect(process.env.DB);

app.use(express.json());
app.use(cors())

try {
    app.listen(process.env.PORT,()=>{
    console.log(`Server Is Run on Port Number : ${process.env.PORT}`);
})
} catch (error) {
    console.log(error);
}
