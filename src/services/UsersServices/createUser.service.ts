import { hash } from "bcrypt";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import ProfileInfos from "../../entities/profileInfos";
import User from "../../entities/user";
import { TUserRegister, TUserResponse } from "../../interfaces/users.interfaces";
import { userSchemaResponse } from "../../schemas/user.schemas";

export const createUserService = async (userPayload: TUserRegister): Promise<TUserResponse> => {

    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const profileInfosRepo: Repository<ProfileInfos> = AppDataSource.getRepository(ProfileInfos);
    if(userPayload.phone?.trim() == ''){
        userPayload.phone = null;
    }

    userPayload.password = await hash(userPayload.password,12);

    const userCreate = userRepo.create({ ...userPayload });
    const saveUser = await userRepo.save({ ...userCreate});
    const userProfileInfoCreate = profileInfosRepo.create({ user: saveUser });
    const userProfileInfoSave = await profileInfosRepo.save(userProfileInfoCreate);
    const updateUser = await userRepo.save({...saveUser,profileInfos:userProfileInfoSave});


    const user = userSchemaResponse.parse({...updateUser,profileInfos:userProfileInfoSave});

    return user;

}