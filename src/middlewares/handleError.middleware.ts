import { NextFunction, Request, Response } from "express";
import AppError from "../errors";
import { ZodError } from 'zod'
const errorHandler = (err: Error,_req: Request,res: Response,_next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    if (err instanceof ZodError) {
        return res.status(400).json({
            message:
                err.flatten().fieldErrors
        })
    }

    return res.status(500).json({ message: "Internal Server Error." });
};

export {
    errorHandler
}