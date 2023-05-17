import { hash } from "bcrypt";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import User from "../../entities/user";
import {  TUserResponse, TUserUpdate } from "../../interfaces/users.interfaces";
import { userSchemaResponse } from "../../schemas/user.schemas";

export const updateUserService = async (userPayload: TUserUpdate, userId: number): Promise<TUserResponse> => {

    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    if(userPayload.password){
        userPayload.password = await hash(userPayload.password,12);
    }

    await userRepo.createQueryBuilder().update(User).set({
        ...userPayload,
    }).where('id = :id', { id: userId }).execute();

    const updatedUser = await userRepo.findOneBy({ id: userId });
    let response = userSchemaResponse.parse(updatedUser);

    return response;

}