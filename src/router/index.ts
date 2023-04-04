import { Router } from "express";
import postRouter from './Post.routes';
import userRouter from './User.routes';


const routesApp = Router()

routesApp.use('/user', userRouter);
routesApp.use('/post', postRouter);


export default routesApp;