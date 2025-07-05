import express from 'express';
import cors from 'cors';
import { dataBaseConnection } from './DB/connection.js';
import authRouter from './modules/auth/auth.controller.js';


const app = express();

export const bootstrapFunction = ()=>{
    dataBaseConnection();
    app.use(express.json());
    app.use(cors())
    app.get('/auth',authRouter);
    
    app.listen(process.env.PORT,()=>{
        console.log(`Server Is Run On Port : ${process.env.PORT}`);
    }).on("error",(error)=>{
        console.log(error);
    })
}