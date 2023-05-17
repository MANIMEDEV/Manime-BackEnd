import { NextFunction, Request, Response } from "express";
import AppError from "../errors";
import { ensurePhoneIsUnicService } from "../services/middlewaresServices/ensurePhoneIsUnic.service";

export const ensurePhoneIsUnicMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.body.phone) {
        return next()
    }
    const isUnic = await ensurePhoneIsUnicService(req.body.phone);

    if (!isUnic) {
        throw new AppError('Phone already registered', 409);
    }
    return next();
}