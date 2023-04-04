import {Router, Response, NextFunction } from 'express';
import { MyRequest } from '../interfaces/expressInterface';
import { postController } from '../controller/post.controller';
import { authorization } from '../auth/authorization';

const postRouter = Router();

postRouter.get('/all', postController.getAlls )

postRouter.post('/', authorization.token, postController.create)
postRouter.patch('/:id', authorization.token, postController.update)
postRouter.patch('/avaliable/:id', authorization.token, postController.disable)
postRouter.get('/:id', postController.getPostId)

export default postRouter;