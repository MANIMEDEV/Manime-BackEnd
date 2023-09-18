import { Request, Response } from "express";
import { TUserRegister, TUserResponse, TUserUpdate } from "../interfaces/users.interfaces";
import { createUserService } from "../services/UsersServices/createUser.service";
import { updateUserService } from "../services/UsersServices/updateUser.service";
import { getProfileInfosService, getUserListFollowingService } from "../services/UsersServices/getProfileInfos.service";
import { followUser, getAllUsersService, getMutualFollowers } from "../services/UsersServices/follow.service";

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
    
    const profileInfos = await getProfileInfosService(res.locals.userAuth.id);

    return res.json(profileInfos).status(200);
}
const getUserListFollowingController =  async (_req: Request, res: Response): Promise<Response> => {
    
    const profileInfos = await getUserListFollowingService(res.locals.userAuth.id);

    return res.json(profileInfos).status(200);
}


const getUserListMutualFollowersController =  async (_req: Request, res: Response): Promise<Response> => {  
    const userId = res.locals.userAuth.id
    const mutualFollowers = await getMutualFollowers(userId);

    return res.json(mutualFollowers).status(200);
}
const getAllUsersController =  async (req: Request, res: Response): Promise<Response> => {  
    let filter = req.query.name;
    if(!filter){
        filter = ''
    }
    const allUsers = await getAllUsersService(filter.toString());

    return res.json(allUsers).status(200);
}

const createFollowUser =  async (req: Request, res: Response): Promise<Response> => {
    
    const follow = await followUser(res.locals.userAuth.id, Number(req.params.followId));

    return res.json(follow).status(200);
}
export {
    createUserController,
    updateUserController,
    getUserProfileInfosController,
    getUserListFollowingController,
    getUserListMutualFollowersController,
    createFollowUser,
    getAllUsersController
}