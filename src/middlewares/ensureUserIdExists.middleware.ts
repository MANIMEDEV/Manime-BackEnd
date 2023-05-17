import { NextFunction, Request, Response } from "express";
import AppError from "../errors";
import { ensureUserIdExistsService } from "../services/middlewaresServices/ensureUserIdExists.service";
import "express-async-errors";

export const ensureUserIdExistsMiddleware = async (req:Request,_res:Response,next:NextFunction): Promise<Response | void> => {

    const userId: number = parseInt(req.params.id);

    const verify = await ensureUserIdExistsService(userId);

    if(!verify){
        throw new AppError('User not Found',404);
    }

    return next();
}