import { Router } from "express";
import { deleteAllUers, deleteUser, getAllUsers, getUserById, updateUser } from "./services/user.service.js";
import { authentication, authorization } from "../../middleware/authintication.middleware.js";
const userRouter = Router();

userRouter.
    route('/')
    .get(authentication,authorization(["admin"]),getAllUsers)
    .delete(authentication,authorization(["admin"]),deleteAllUers)

userRouter
    .route('/:id')
    .get(authentication,authorization(["admin"]),getUserById)
    .patch(authentication,authorization(["user"]),updateUser)
    .delete(authentication,authorization(["user","admin"]),deleteUser)

export default userRouter;