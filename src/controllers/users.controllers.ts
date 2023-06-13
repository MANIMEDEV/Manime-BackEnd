import { Request, Response } from "express";
import { TUserRegister, TUserResponse, TUserUpdate } from "../interfaces/users.interfaces";
import { createUserService } from "../services/UsersServices/createUser.service";
import { updateUserService } from "../services/UsersServices/updateUser.service";
import { getProfileInfosService } from "../services/UsersServices/getProfileInfos.service";

const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const userInfos: TUserRegister = req.body;
    await createUserService(userInfos);

    return res.status(201).json({message:'Registrado com Sucesso!'});
}
const updateUserController = async (req: Request, res: Response): Promise<Response> => {
    const userInfos: TUserUpdate = req.body;
    const userID: number = parseInt(req.params.id);
    const user: TUserResponse = await updateUserService(userInfos, userID);

    return res.status(200).json(user);
}

const getUserProfileInfosController =  async (_req: Request, res: Response): Promise<Response> => {
    console.log('CHEGOU NO GET USER');
    console.log(res.locals.userAuth);
    
    const profileInfos = await getProfileInfosService(res.locals.userAuth.id);

    return res.json(profileInfos).status(200);
}
export {
    createUserController,
    updateUserController,
    getUserProfileInfosController
}