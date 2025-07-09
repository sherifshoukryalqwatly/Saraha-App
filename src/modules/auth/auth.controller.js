import {Router} from 'express';
import { login, resetPassword, signUp } from './services/auth.service.js';

const authRouter = Router();

authRouter.post('/signup',signUp);
authRouter.get('/login',login);
authRouter.get('/resetpassword',resetPassword);


export default authRouter;