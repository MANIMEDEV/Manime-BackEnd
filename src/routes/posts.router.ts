import { NextFunction, Router } from "express";
import { getChats } from '../controllers/Message.Controller';
import { createPostController, getAllPostsController, likePost } from "../controllers/posts.controllers";
import { retrivieveUserController } from "../controllers/session.controllers";
import uplaodMiddleware from "../middlewares/updloadImages";
const postsRouter: Router = Router();

postsRouter.get('/:postId',(_req,_res,next:NextFunction)=>{    
    return next()
},getChats);

postsRouter.get('/',retrivieveUserController,getAllPostsController);
postsRouter.post('/',retrivieveUserController,uplaodMiddleware.array('images'),createPostController);
postsRouter.post('/:postId/like',retrivieveUserController,likePost);


export default postsRouter;