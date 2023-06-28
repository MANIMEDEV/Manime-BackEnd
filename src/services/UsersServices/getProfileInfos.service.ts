
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import ProfileInfos from "../../entities/profileInfos";


import "express-async-errors";
import { IBaseUser } from "../../interfaces/users.interfaces";
import User from "../../entities/user";
export const getProfileInfosService = async (userAuthId: number) => {


    const profileRepo: Repository<ProfileInfos> = AppDataSource.getRepository(ProfileInfos);
    const response = await profileRepo.createQueryBuilder('profileInfo')
        .leftJoin('profileInfo.user', 'user')
        .where('user.id = :userId', { userId: userAuthId })
        .getOne();

    return response
}

export const getUserListFollowingService = async (userAuthId: number) => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const query = userRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect('user.followers', 'followers')
        .where('followers.id = :userId', { userId: userAuthId });

    const users = await query.getMany();

    const returnUsers: IBaseUser[] = users.map(user => {
        return {
            id: user.id,
            nickname: user.nickname,
            profileImg: user.profileImg,
        }
    })

    return returnUsers;

}