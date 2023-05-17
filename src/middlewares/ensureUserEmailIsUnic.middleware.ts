import { NextFunction, Request, Response } from "express";
import AppError from "../errors";
import { ensureUserEmailExistsService } from "../services/middlewaresServices/ensureUserEmailExists.service";
import "express-async-errors";
export const ensureUserEmailIsUnicMiddleware = async (req:Request,_res:Response,next:NextFunction): Promise<Response | void> => {

    const userEmail: string = req.body.email;

    const verify = await ensureUserEmailExistsService(userEmail);

    if(verify){
        throw new AppError('Email already registered',409);
    }
    return next();

}