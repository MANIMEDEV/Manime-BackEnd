import { NextFunction, Request, Response } from "express";
import AppError from "../errors";
import { ensureNicknameIsUnic } from "../services/middlewaresServices/ensureNicknameIsUnic.service"

export const ensureNicknameIsUnicMiddleware = async (req: Request, _res: Response, next: NextFunction) => {

    const isUnic = await ensureNicknameIsUnic(req.body.nickname);

    if (isUnic) {
        return next()
    }
    throw new AppError('Nickneme already registered');


}