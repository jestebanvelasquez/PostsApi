import { Router, Response, NextFunction } from "express";
import { MyRequest } from "../interfaces/expressInterface";
import { userController } from '../controller/user.controller';
import { authorization } from "../auth/authorization";
import { authController } from '../controller/auth.controller';

const userRouter = Router();

userRouter.get('/:id', authorization.token, userController.getProfile );
userRouter.post('/register', authController.register);
userRouter.post('/login', authController.login);
userRouter.get('/', userController.getAll);


export default userRouter;
