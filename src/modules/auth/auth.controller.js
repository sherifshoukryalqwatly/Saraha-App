import router from 'express';
import { signUp } from './services/auth.service.js';
const authRouter = router();

authRouter.get('/signup',signUp);

export default authRouter;