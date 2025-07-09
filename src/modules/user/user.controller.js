import { Router } from "express";
import { deleteAllUers, deleteUser, getAllUsers, getUserById, updateUser } from "./services/user.service.js";

const userRouter = Router();

userRouter.
    route('/')
    .get(getAllUsers)
    .delete(deleteAllUers)

userRouter
    .route('/:id')
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser)

export default userRouter;