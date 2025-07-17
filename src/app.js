import express from 'express';
import cors from 'cors';
import { dataBaseConnection } from './DB/connection.js';
import authRouter from './modules/auth/auth.controller.js'
import dontenv from 'dotenv';
import userRouter from './modules/user/user.controller.js';
import path from 'path'

const app = express();

export const bootstrapFunction = ()=>{
    dontenv.config({path:path.resolve('src/config/.env.dev')});
    dataBaseConnection();
    app.use(express.json());
    app.use(cors());
    app.use('/auth',authRouter);
    app.use('/users',userRouter);
    app.listen(process.env.PORT,()=>{
        console.log(`Server Is Run On Port : ${process.env.PORT}`);
    }).on("error",(error)=>{
        console.log(error);
    })
}