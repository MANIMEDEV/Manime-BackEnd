import { NextFunction, Router } from "express";
import { getChats } from '../controllers/Message.Controller';

const chatRouter: Router = Router();

chatRouter.get('/:userId',(_req,_res,next:NextFunction)=>{    
    return next()
},getChats);


export default chatRouter;