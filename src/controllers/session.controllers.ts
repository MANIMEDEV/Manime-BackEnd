import { NextFunction, Request, Response } from "express";
import AppError from "../errors";
import { createSessionService } from "../services/session/createSession.service";
import { retrivieveUserService } from "../services/session/retrivieveUser.service";

const createSessionController = async (req: Request, res: Response): Promise<Response> => {

    const response: Object = await createSessionService(req.body);

    return res.status(201).json(response);
}

const retrivieveUserController = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    
    const authorization: string | undefined = req.headers.authorization;

    if (authorization == undefined) {
        throw new AppError('Missing bearer token', 401);
    }
    const [_bearer, token] = authorization.split(' ');
    
    
    const decoded = await retrivieveUserService(token);
    
    res.locals.userAuth = decoded;
    
    return next();
}



export {
    createSessionController,
    retrivieveUserController
}