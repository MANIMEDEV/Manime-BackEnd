import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import User from "../../entities/user";

export const ensurePhoneIsUnicService = async (userPhone:string) => {

    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const exists = await userRepo.exist({ where: { phone: userPhone } });

    return !exists;
}