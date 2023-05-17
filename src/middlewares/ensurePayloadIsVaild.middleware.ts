import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";


const body = (schema: ZodTypeAny) => async (req: Request, _res: Response, next: NextFunction): Promise<Response | void> => {


    const validatedBody = schema.parse(req.body);
    req.body = validatedBody;


    return next();


};

export default { body };