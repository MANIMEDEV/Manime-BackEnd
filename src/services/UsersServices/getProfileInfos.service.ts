
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import ProfileInfos from "../../entities/profileInfos";


import "express-async-errors";
export const getProfileInfosService = async (userAuthId: number) => {

    
    const profileRepo: Repository<ProfileInfos> = AppDataSource.getRepository(ProfileInfos);
    const response = await profileRepo.createQueryBuilder('profileInfo')
    .leftJoin('profileInfo.user', 'user')
    .where('user.id = :userId', { userId: userAuthId })
    .getOne();

    return response
}

export const getUserListFollowingService =async (userAuthId: number) => {
    const profileRepo: Repository<ProfileInfos> = AppDataSource.getRepository(ProfileInfos);
    const response = await profileRepo.createQueryBuilder('profileInfo')
    .leftJoin('profileInfo.user', 'user')
    .where('user.id = :userId', { userId: userAuthId })
    .getOne();

    return response
}