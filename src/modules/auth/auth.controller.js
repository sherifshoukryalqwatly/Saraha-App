import express from 'express';
import { login, resetPassword, signUp } from './services/auth.service.js';

const authRouter = express.Router();

authRouter.post('/signup',signUp);
authRouter.get('/login',login);
authRouter.get('/resetpassword',resetPassword);


export default authRouter;