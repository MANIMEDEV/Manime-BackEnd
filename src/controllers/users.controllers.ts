import { Request, Response } from "express";
import { TUserRegister, TUserResponse, TUserUpdate } from "../interfaces/users.interfaces";
import { createUserService } from "../services/UsersServices/createUser.service";
import { updateUserService } from "../services/UsersServices/updateUser.service";

const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const userInfos:TUserRegister = req.body;
    const user: TUserResponse = await createUserService(userInfos);

    return res.status(201).json(user);
}
const updateUserController = async (req: Request, res: Response): Promise<Response> => {
    const userInfos:TUserUpdate = req.body;
    const userID: number = parseInt(req.params.id);
    const user: TUserResponse = await updateUserService(userInfos,userID);

    return res.status(200).json(user);
}

export {
    createUserController,
    updateUserController
}