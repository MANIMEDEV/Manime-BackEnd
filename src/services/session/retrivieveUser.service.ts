import {  verify } from "jsonwebtoken";
import AppError from "../../errors";

export const retrivieveUserService = async (authToken: string) => {
    if (!authToken) {
        throw new AppError('Missing authorization token', 401);
    }

    return verify(
        authToken,
        String(process.env.SECRET_KEY),
        (error: any, decoded: any) => {
            if (error) {
                throw new AppError(error.message, 401);
            }
            return decoded;
        });
}